-- IW-A20 — free-tier metering for the /api/iw/* proxy.
--
-- NOT APPLIED. Written by Atlas, reviewed and run by Dhruv/Angelina against the
-- IndianWhisper Supabase project before the proxy can serve free-tier traffic.
-- Until it exists, /api/iw/* answers UPSTREAM (503) for every request without a
-- valid licence — it fails closed on purpose, so a missing migration cannot hand
-- out unmetered Groq credit.
--
-- One row per device per UTC day. Devices are anonymous ids from the client
-- (X-IW-Device); no email, no account, no PII lands here.

create table if not exists public.iw_usage (
  device_id   text        not null,
  usage_date  date        not null default (now() at time zone 'utc')::date,
  cleanups    integer     not null default 0,
  seconds     integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (device_id, usage_date)
);

comment on table public.iw_usage is
  'IW-A20: per-device daily free-tier counters for the /api/iw proxy. Anonymous device ids only.';

-- Yesterday's rows are dead weight; this index keeps the cleanup job cheap.
create index if not exists iw_usage_date_idx on public.iw_usage (usage_date);

-- Only the service role (the Next.js route) touches this table. RLS on with no
-- policy = the anon key, which is public in the web bundle, can neither read
-- another device's counters nor reset its own.
alter table public.iw_usage enable row level security;

-- Charge usage and report the remaining allowance in ONE statement.
--
-- Read-then-write from the route would let two concurrent dictations from the
-- same device both observe "2 cleanups used" and both be allowed. The insert ..
-- on conflict do update below takes a row lock, so the Nth caller is the one that
-- sees the limit.
--
-- Returns allowed=false WITHOUT charging when the request would exceed the cap,
-- so a blocked call doesn't burn tomorrow's budget either.
--
-- A NEGATIVE p_amount is a refund: the route charges before it calls Groq, so
-- when Groq fails it gives the allowance back rather than billing a free user
-- for output they never received. Refunds skip the cap check and clamp at zero.
create or replace function public.iw_usage_consume(
  p_device        text,
  p_kind          text,
  p_amount        integer,
  p_max_cleanups  integer,
  p_max_seconds   integer
)
returns table (allowed boolean, cleanups_left integer, seconds_left integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today      date := (now() at time zone 'utc')::date;
  v_cleanups   integer;
  v_seconds    integer;
  v_add_clean  integer := 0;
  v_add_secs   integer := 0;
begin
  if p_device is null or length(p_device) = 0 then
    raise exception 'p_device is required';
  end if;
  if p_kind not in ('cleanup', 'seconds') then
    raise exception 'p_kind must be cleanup or seconds, got %', p_kind;
  end if;

  if p_kind = 'cleanup' then
    v_add_clean := coalesce(p_amount, 0);
  else
    v_add_secs := coalesce(p_amount, 0);
  end if;

  insert into public.iw_usage as u (device_id, usage_date, cleanups, seconds)
  values (p_device, v_today, 0, 0)
  on conflict (device_id, usage_date)
    -- A no-op update is what takes the row lock; without it concurrent callers
    -- would skip straight past on conflict and race on the select below.
    do update set updated_at = now()
  returning u.cleanups, u.seconds into v_cleanups, v_seconds;

  if coalesce(p_amount, 0) < 0 then
    allowed := true;                                   -- refund
  elsif p_kind = 'cleanup' then
    allowed := (v_cleanups + v_add_clean) <= p_max_cleanups;
  else
    allowed := (v_seconds + v_add_secs) <= p_max_seconds;
  end if;

  if allowed then
    update public.iw_usage
       set cleanups   = greatest(cleanups + v_add_clean, 0),
           seconds    = greatest(seconds  + v_add_secs, 0),
           updated_at = now()
     where device_id = p_device and usage_date = v_today
     returning cleanups, seconds into v_cleanups, v_seconds;
  end if;

  cleanups_left := greatest(p_max_cleanups - v_cleanups, 0);
  seconds_left  := greatest(p_max_seconds - v_seconds, 0);
  return next;
end;
$$;

comment on function public.iw_usage_consume is
  'IW-A20: atomically charge free-tier usage for one device/day and return the remaining allowance.';

-- The route authenticates as the service role, which bypasses RLS. Nothing else
-- gets to call this. Postgres grants EXECUTE to PUBLIC on new functions by
-- default, so without this revoke the anon key — which ships inside the web
-- bundle — could reset any device's counters.
--
-- anon/authenticated are Supabase roles and don't exist on a vanilla Postgres,
-- so the loop skips what isn't there and the file stays runnable anywhere.
revoke all on function public.iw_usage_consume(text, text, integer, integer, integer) from public;

do $$
declare r text;
begin
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      execute format(
        'revoke all on function public.iw_usage_consume(text, text, integer, integer, integer) from %I', r
      );
    end if;
  end loop;
end $$;

-- Optional housekeeping — rows older than 7 days are of no use to anyone.
-- Run from a scheduled job (pg_cron) or by hand:
--   delete from public.iw_usage where usage_date < (now() at time zone 'utc')::date - 7;
