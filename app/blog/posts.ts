export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "dictation-app-without-subscription",
    title: "Dictation Without a Subscription: What Voice Typing Should Actually Cost (2026)",
    description:
      "Every good dictation app is a subscription. Here's the honest reason why, the one architecture that makes a one-time price possible, and the five things to check before you buy any lifetime license.",
    date: "2026-07-25",
    readTime: "7 min",
    tags: ["dictation", "pricing", "one-time-purchase", "privacy", "on-device"],
    content: `If you searched for a dictation app without a subscription, you already know the frustration. Every tool that actually works well wants ten to twenty dollars a month, forever, for something you use to type — the most basic thing a computer does.

![One key that stopped repeating.](/blog-images/pay-once-hero.png)

I want to explain why that happened, because the reason is real and not just greed. And then I want to explain the one architectural decision that makes a different price possible — because that decision is the entire reason IndianWhisper can charge once when most tools structurally cannot.

## Why voice tools became subscriptions

Almost every dictation app you can name sends your audio to a server. You speak, the audio is uploaded, a large model on someone's GPU turns it into text, and the text comes back.

That round trip costs the company money **every single time you speak**. Not once — every time. GPU minutes, bandwidth, storage, the engineering to keep it all up.

When your cost per customer never stops, your revenue per customer cannot stop either. A subscription is not a pricing trick in that model. It is the only honest way to run it. A one-time price for unlimited cloud transcription would mean losing money on every heavy user, forever.

So if a tool processes in the cloud, expect a subscription. That is not a company being difficult. That is arithmetic.

## The architecture that changes the math

Now flip it.

IndianWhisper runs the speech model **on your Mac**. The Whisper model downloads once and lives on your machine. When you speak, your audio goes to your own processor and the text comes back from your own processor. Nothing is uploaded. There is no server in the loop.

Which means my cost when you transcribe for eight hours straight is **zero**. Not low — actually zero. Your electricity, your silicon, your data.

When the marginal cost of usage is zero, a one-time price stops being a gimmick and starts being the obvious structure. I am not subsidising your usage out of a monthly fee, because your usage does not cost me anything.

That is the whole reason a lifetime licence exists here and cannot exist on a cloud-only tool. It is a consequence of the architecture, not a marketing decision.

## What a subscription actually costs over time

Run the numbers on any tool you are considering, over the horizon you will actually use it.

A $12/month tool is $144 a year. Over five years, **$720**. An annual plan at $99 is $495 over the same five years. If you dictate daily — and people who search this query usually do — five years is a conservative horizon, not an aggressive one.

Against that, IndianWhisper's lifetime licence is **$249, paid once**. It pays for itself against a monthly plan somewhere in year two, and everything after that is free.

I have kept a monthly and annual option too, at $12 and $99, because not everyone wants to commit up front and some people genuinely prefer to rent software. Both are real, both work, and there is a 30-day money-back guarantee on all of them.

But the lifetime tier is capped at the **first 100 buyers**, and I want to be straight about why rather than pretend it is artificial scarcity. Early buyers are taking a bet on a product that is still young. The permanent price is what I can offer in exchange for that bet. Once the product is established, that trade no longer makes sense for either side.

## Five things to check before buying any lifetime licence

This applies to any tool, not just mine. A one-time price is only a good deal if the thing behind it survives.

**1. Does it work offline?** If it needs a connection, you are not buying a tool — you are buying access to a server that can change its terms. Test it on aeroplane mode before you pay.

**2. Where does your audio actually go?** "Encrypted in transit" is not the same as "never leaves your device." For client work, legal drafts, medical notes, or anything under an NDA, this is the only question that matters.

**3. What does "lifetime" mean in the fine print?** Lifetime of the product, or lifetime of the current major version? Ask directly. A lifetime licence that expires at version 3 is a two-year subscription wearing a costume.

**4. Does it work if the company disappears?** On-device software keeps running. Cloud software stops the day the servers do. This is the strongest argument for local processing and almost nobody makes it out loud.

**5. Does it handle how you actually speak?** If your sentences move between Hindi and English without pausing — "client ko bol do the invoice is ready" — most engines will transcribe one language and mangle the other. Code-switching is the primary case IndianWhisper is tuned for, not a supported edge case. Test it with a real sentence from your own week, not a clean scripted one.

## The honest limitations

Fair is fair.

Running the model locally means the first download is large — the models range from 75MB to about 3GB depending on which accuracy you pick — and heavier models want a reasonably modern Mac. Cloud tools push that weight onto someone else's hardware, and for some people that genuinely is the better trade.

It is also Mac-first today. Windows and Chrome exist; the Mac app is where the depth is.

And a one-time price means I do not have recurring revenue smoothing out my months. That is my problem to solve, not yours — but it is the honest reason most founders pick subscriptions, and pretending otherwise would be dishonest.

## What I would tell a friend

If you dictate occasionally and always have good internet, a monthly cloud tool is fine and you should not overthink it.

If you dictate every day, work with anything confidential, or simply want the thing you type with to keep working regardless of anyone's server bill — buy the local one once and stop thinking about it.

That is the product I wanted for myself, which is why it exists.

[See the pricing and the lifetime tier →](/pricing)`,
  },
  {
    slug: "wispr-flow-alternative",
    title: "Looking for a Wispr Flow Alternative? Here's What to Check Before You Switch (2026)",
    description:
      "Wispr Flow is excellent \u2014 and $15/month, cloud-only, with no offline mode. If you're searching for a Wispr Flow alternative, here's an honest checklist and where IndianWhisper fits: on-device, one-time-price option, built for Indian English and Hinglish.",
    date: "2026-07-22",
    readTime: "6 min",
    tags: ["wispr-flow-alternative", "dictation", "hinglish", "privacy", "pricing"],
    content: `If you typed "Wispr Flow alternative" into Google, you already know what Wispr does well — the dictation itself is genuinely smooth. People go looking for an alternative for one of four reasons, and it's worth being precise about yours, because the right alternative depends on it.

![One voice, two paths — the cloud way and the on-device way.](/blog-images/wispr-flow-alternative-hero.jpg)

## The four reasons people leave Wispr Flow

**1. Price.** $15/month is roughly ₹1,250 — every month, forever. For students, indie developers, and anyone earning in rupees, a subscription priced in Silicon Valley dollars is the single most common dealbreaker. If you dictate daily, you're not questioning the value — you're questioning the currency.

**2. Cloud-only.** Every word you dictate into Wispr Flow travels to servers in the US for processing. Their own documentation is upfront about this. For everyday notes, fine. For client work, legal drafts, medical notes, anything under NDA — your dictation is your most sensitive data stream, and there is no offline mode. On a train, on a flight, on hotel Wi-Fi: no connection, no dictation.

**3. Network latency.** Because everything is a round trip, Wispr's famous speed is really your Wi-Fi's speed. Users on slower or spottier connections — which describes a lot of real life in India — report exactly the delays the product is supposed to eliminate.

**4. Language.** Wispr has improved its Hindi support, credit where due. But if your natural speech weaves Hindi and English mid-sentence — "meeting ko reschedule kar do to Thursday" — you want an engine where code-switching is the primary use case, not a supported edge case.

## The checklist for any Wispr Flow alternative

Before switching to anything (including ours), check:

- **Does it work offline?** If the engine is cloud-only, you've traded one dependency for another.
- **Where does your audio go?** On-device processing means your voice never leaves your machine — not "encrypted in transit," but *never leaves*.
- **What does it cost in YOUR currency, and is there a one-time option?** Subscription fatigue is real. A lifetime license is something subscription-only tools structurally cannot offer.
- **Does it handle how you actually speak?** Test with your real mixed-language sentences, not demo English.
- **Does text land cleanly?** The mark of a mature tool: text appears once, already formatted — no mid-typing corrections flickering in your document.

## Where IndianWhisper fits

Full disclosure: I build IndianWhisper, so weigh this section accordingly. It exists because I was a paying Wispr Flow user who needed the things above.

- **On-device by default.** Whisper models run locally on your Mac. Offline flights, hospital basements, NDA work — all fine. Cloud mode exists as an *option* (your API key, your choice), not a requirement.
- **Built for Hinglish and Indian English.** Code-switching is the primary engineering target: "mujhe kal office jaana hai" stays exactly that, in Roman script, not translated or mangled.
- **Insert-once smoothness.** Speak, release, and the finished text lands in one clean paste — same architecture philosophy as Wispr, without the cloud dependency.
- **India-first pricing.** The core is free — real dictation, real accuracy, no card required. Paid tiers are priced in rupees, with a one-time lifetime option.
- **Light.** Native Swift app, a few MB — not an 800MB-RAM Electron shell.

**What Wispr still does better, honestly:** an iPhone keyboard app (ours is coming), a longer track record, and more polish in the companion apps. If those are your priorities and the subscription doesn't bother you, staying is a rational choice.

## Try the two-minute test

[Download IndianWhisper free](/#download) — Mac, Windows, and Chrome. Turn off your Wi-Fi, hold the hotkey, and dictate the most natural mixed-language sentence you'd actually say at work. That one test — offline, in your real voice — tells you everything a comparison table can't.

— Dhruv`,
  },
  {
    slug: "superwhisper-alternative",
    title: "Superwhisper Alternative for Indian English & Hinglish (2026 Honest Guide)",
    description:
      "Superwhisper proved on-device dictation works on a Mac. But if you speak Indian English or Hinglish, accuracy is the real test. An honest look at when Superwhisper fits \u2014 and when IndianWhisper is the better pick.",
    date: "2026-07-22",
    readTime: "5 min",
    tags: ["superwhisper-alternative", "dictation", "hinglish", "on-device", "mac"],
    content: `Superwhisper deserves respect: it proved that on-device Whisper dictation on a Mac is viable, private, and fast. If you're searching for an alternative anyway, it's usually for one of three specific reasons.

![Speech processed on the chip in front of you — nowhere else.](/blog-images/superwhisper-alternative-hero.jpg)

## Why people look past Superwhisper

**1. Indian accents and mixed language.** Superwhisper runs generic Whisper models with generic settings. They're good at standard American/British English. Speak with an Indian accent, or slide between Hindi and English mid-sentence, and you'll spend more time correcting than you saved by dictating. The model isn't the whole story — *how* it's configured for code-switching (language detection, script handling, cleanup prompts that preserve rather than translate) is where the accuracy for Indian speech is actually won or lost.

**2. Pricing structure.** $8.49/month or a ~$250 lifetime — again, dollar pricing. Fine value for US salaries; a harder swallow in rupees, especially when the app hasn't proven itself on your accent yet.

**3. The cleanup gap.** Raw Whisper output needs polish — fillers removed, punctuation fixed, your "um basically" tidied away — without your meaning being rewritten. Tools differ wildly here, and this is exactly where a transcript in mixed Hindi-English gets silently "translated" into English by careless AI cleanup. (We learned that the hard way and built a specific rule against it.)

## What to check in any on-device dictation app

- **Your accent, your mix**: dictate one honest Hinglish sentence before judging anything.
- **Script fidelity**: Roman-script Hindi should stay Roman. Devanagari should be a choice, not a surprise.
- **Cleanup that respects your words**: fillers gone, language untouched.
- **One clean insert**: no flicker, no corrections crawling through your document after the fact.
- **Rupee pricing** if you earn in rupees.

## Where IndianWhisper fits

I build IndianWhisper — bias declared. It's the same on-device philosophy as Superwhisper, with the engineering aimed squarely at Indian speech:

- **Hinglish as the primary case** — code-switching preserved, Roman script by default, a dedicated Devanagari mode when you want pure Hindi.
- **AI cleanup with a language-preservation rule** — your Hindi words are never translated to English by the polish step.
- **Insert-once delivery** — text lands in one paste, already clean, safe even in WhatsApp (no accidental sends).
- **Free core, India-first paid tiers** — free tier with real accuracy, paid in ₹, lifetime option.
- **Mac, Windows, and Chrome** — Superwhisper is Mac-only; if you also work on a Windows machine, one tool covers both.

**Where Superwhisper is still ahead, honestly:** an iOS app, more model-tinkering options for power users, and years of Mac-community trust. If you dictate pure English and love tweaking model settings, it remains a fine tool.

## The honest test

[Download IndianWhisper free](/#download), switch off Wi-Fi, and speak the sentence you'd actually say to a colleague — accent, mixed language and all. Two minutes, no card, and your own ears are the benchmark.

— Dhruv`,
  },
  {
    slug: "why-hinglish-breaks-speech-to-text",
    title: "Why Hinglish Breaks Every Speech-to-Text App (I Measured It)",
    description:
      "I spent a night feeding Hinglish into Whisper and measuring what came back. The language setting is a translation switch in disguise, and the fix nobody documents is a decoder prior. Here are the actual results.",
    date: "2026-07-16",
    readTime: "6 min",
    tags: ["hinglish", "whisper", "code-switching", "engineering", "hindi", "transcription"],
    content: `I build voice products for a living, and this week one of them mangled its own name three different ways in a single evening. The same night, a Hinglish sentence I spoke came back written in Devanagari — with the English words transliterated INTO Devanagari. "Super cool" became "वपर पूल".

So I stopped shipping and started measuring. This post is what a night of controlled tests against Whisper (Groq's whisper-large-v3-turbo) actually showed about Hinglish — and why most transcription apps get it structurally wrong, not accidentally wrong.

![Two voices, one sentence — what code-switching actually asks of a speech engine.](/blog-images/hinglish-hero.png)

## The language setting is a translation switch in disguise

Every Whisper-family API has a \`language\` parameter, and every integration guide tells you to set it. Here is what it actually did in my tests:

| Setting | What you'd expect | What actually happened |
|---|---|---|
| \`language: "en"\` | English transcription | **Whisper TRANSLATED my Hindi into English.** A Hindi clip came back as "Today was very long. I worked hard…" — a paraphrase, silently replacing my words |
| \`language: "hi"\` | Hindi transcription | English words got pushed into Devanagari script |
| unset (auto-detect) | Chaos | The only setting that survived English, Hindi AND Hinglish |

Read that first row again. Setting \`language: "en"\` doesn't force English *transcription* — it forces English *output*. If the speaker used Hindi, the model quietly translates. For a journal, a meeting note, or a legal draft, that means the words on the page are not the words you said. No error, no warning.

For a code-switching speaker, both fixed settings are wrong by definition. "Meeting ko reschedule kar do to Thursday afternoon" is one sentence, spoken in one breath. It is not a Hindi sentence and it is not an English sentence, and an engine forced to pick one will damage it either way.

## Auto-detect alone doesn't save you

With \`language\` unset, the transcription stopped translating — but the decoder still had no idea what my product names were, and it invented homophones every single time. That's not a bug in Whisper; the default decoder has simply never heard of your product, your colleagues, or your city's street names. It reaches for the nearest word it knows.

The documented fix is the \`prompt\` parameter. What the docs don't tell you is how it actually behaves.

## The prompt is a decoder prior, not an instruction

Whisper doesn't *read* your prompt like an assistant. It conditions on it as if it were the transcript that came immediately before your audio. That one fact explains all four behaviors I measured:

- **Names must appear inside sentences, not in a comma-list.** A bare list of product names still produced mangled homophones. The same names used inside a natural example sentence came back spelled correctly every time.
- **The script of the prompt controls the script of the output.** A romanised prompt held my Hinglish in Latin script. Adding one Devanagari sentence to the prompt preserved pure-Hindi passages in Devanagari. You are not telling the model what to do — you are showing it what "the conversation so far" looks like.
- **Recency wins.** Whatever sits at the END of the prompt pulls hardest on the output. Put your most common speech pattern last.
- **A generic example can collide with real speech.** One of my exemplar sentences was too close to something I actually said — and it dragged my real Hindi sentence into Latin script. Your examples need to establish a pattern without impersonating the user.

I also tried plain instructions — "transcribe in the script spoken", that kind of thing. They did almost nothing. Examples did everything. If you take one line away from this post: **Whisper listens to what your prompt does, not what it says.**

## Why this is the whole product

None of the above is exotic knowledge. It's a night of tests anyone could run. But general-purpose transcription apps can't act on it, because their defaults are built for the average English speaker — one language per utterance, one script, dictionary words.

Hinglish is not an edge case in India. It is the default register of how a few hundred million people actually speak — Hindi and English woven mid-sentence, sometimes mid-phrase. An engine tuned for single-language speech treats half of every sentence as noise to be corrected.

That's the gap IndianWhisper is built around: code-switching as the primary case, not the exception. Indian English accents, Hinglish switching, and the script coming out the way you'd write it yourself — with the accuracy work concentrated exactly where general tools stumble.

If you dictate the way you actually talk — "kal ka standup move kar do, and send the summary to Rahul" — [download the Mac app](/download) and try one real sentence. That first minute is the entire pitch.

— Dhruv`,
  },
  {
    slug: "we-stopped-pressing-cmd-d",
    title: "We Stopped Pressing Cmd+D",
    description:
      "v2.4.0 added three small things — push-to-talk, in-stream voice commands, and a barely-audible recording sound. None of them belongs on a pricing page. Together they changed how the app feels to use. The honest write-up: what shipped, what broke, and what it changed.",
    date: "2026-07-15",
    readTime: "6 min",
    tags: ["voice-commands", "push-to-talk", "ux", "mac", "ergonomics"],
    content: `A note before we start: I wrote this when v2.4.0 shipped in mid-May and never hit publish — it sat in the drafts folder while we kept building. The Mac app is on v2.7.0 today, but everything below is still how the app works, and the thinking behind it hasn't changed. Publishing it now as part of clearing the build-log backlog.

Back in May I was tapping Cmd+D maybe two hundred times a day. Cmd+D to start dictating. Cmd+D to stop. Cmd+D when I forgot whether I had started. Cmd+D twice when the menu bar told me a second too late.

I am not anymore. Not because we changed the hotkey. Because we stopped relying on the hotkey at all.

v2.4.0 of IndianWhisper for Mac shipped three small things in the same release: push-to-talk on a modifier key, a handful of in-stream voice commands, and two very short sounds. None of them is a feature you would put on a pricing page. Together they reshape what the app feels like to use.

This is the write-up. What changed, why, and what broke.

## The change: hold to talk, release to paste

The old model was a toggle. Tap Cmd+D, the app starts listening. Tap it again, the app stops, transcribes, pastes. Simple enough on paper. In practice it has two failure modes that compound:

- You forget which state you are in. The menu bar icon is the only state indicator, and it lives in a corner you are not looking at. So you tap, look up at the icon, sometimes tap again to be safe, and now the recording is gone.
- You finish your sentence and there is a half-second gap before the auto-stop fires. That gap collects "um"s, ambient noise, and the click of you tapping the hotkey again.

The new model is push-to-talk. Hold the Left Option key. Speak. Release. The recording stops at the exact moment your thumb leaves the key. Auto-paste fires within the next two hundred milliseconds.

You stop thinking about state. There is no toggle to forget. The recording exists only as long as you are physically holding it open. The mental load drops to zero.

Why Left Option specifically: I already use Right Option for another tool, and the right-hand modifier is congested on every keyboard I own. Left Option is mostly idle in normal typing. If you want a different key, the Settings panel has a picker — Left Option, Right Option, Control, Command, or off entirely if you prefer the toggle.

The toggle still works. Both gestures coexist. But since push-to-talk landed, I have used the toggle a handful of times — almost always when one hand was busy and I needed to start dictation with the other. Otherwise: hold, speak, release. Two hundred Cmd+D presses a day collapsed to zero.

## The voice commands

The second change is a small set of phrases the app recognizes while you are speaking, and acts on instead of transcribing.

If you say "scratch that" or "delete word" the obvious thing happens — it deletes. We have had those for a while. v2.4.0 added a few more. "Copy that" and "cut that" act on the current text using the system clipboard. "Press enter" and "press return" send a newline so you can dictate the next paragraph without reaching for the keyboard. "Summarize this" runs the last transcript through the configured LLM and pastes a thirty-to-fifty-percent compression in place of the original.

The commands are deliberately limited. We did not add every imaginable phrase, because every phrase you add to the command set is a phrase you can no longer dictate as content. "Copy that report" used to be a valid sentence. Now the first two words are a command. The commands earn their place by being things you do *to* what you just said, not things you might *say*.

The summarize command is the one that surprised me. I expected it to be a novelty I would forget about. Instead I use it constantly — speak the long version, say "summarize this", let the model tighten it. The full version stays in the transcript history if I want to recover it. The pasted version is the tight one.

## The sound

The third change is two sounds. A short Tink on the moment the recording starts. A short Pop on the moment it stops. Both quiet enough that they do not interrupt a meeting; both clear enough that you know what just happened without looking.

I did not think this would matter. The recording indicator on the menu bar already exists. Adding a sound felt like skeuomorphism. I built it anyway because two early users had asked for it.

It matters more than I expected. The Tink confirms that the app heard your modifier press. The Pop confirms that the recording is closed and transcription has started. You stop second-guessing the state. You stop holding the key for an extra half second "just to be sure." Your right hand leaves the keyboard the instant the Pop fires, because you have an audible receipt that the work is done.

The sound is on by default and there is a toggle in Settings to turn it off. The default volume is low — about thirty percent of the system Tink — because the goal is acknowledgement, not announcement.

## The bug we shipped, and then fixed

The first build of push-to-talk fired the Tink twice on every press, and the Pop twice on every release. Two presses, four sounds. I caught it the first day, partly because I could not stop noticing it. The fix took one commit: a one-hundred-millisecond debounce on the modifier-key event monitor, and a log line so we could verify the fix from the trace.

I am writing this paragraph because it is the kind of thing a polished company would not mention. We do not have that luxury yet. The right thing for a product at this stage is to say: yes, the first build had a double-fire bug, here is what caused it, here is what fixed it. If you are somehow still on a v2.4.0 build from before the patch, update — current builds are long past it.

The same applies to the second thing I want to flag: every time we ship a new build, macOS regenerates the app's signature, and the system forgets you previously granted Accessibility permission. You have to re-grant it in System Settings → Privacy & Security → Accessibility before push-to-talk auto-paste will work. This is a structural Apple thing, not a bug, but it is annoying and the clean answer is proper notarized signing under a paid Apple Developer membership. When the app has the revenue to justify that spend, this re-grant dance ends.

## Where Windows and Chrome stand

The voice commands shipped on Windows first — copy, cut, summarize all work there. Hold-to-talk on Right Alt and the two sounds are in the Windows build that is going through testing now; it rolls out once it passes a proper smoke test rather than on a promised date, because shipping a keyboard hook that half-works is worse than shipping it a week later.

The Chrome extension has its own constraints — modifier-only push-to-talk in a browser context is genuinely harder than in a native app — so there, voice commands and an audible cue come first, and push-to-talk when it can be done right.

## What this changes about who should download

The product was useful before. People used it the way people use any dictation tool — for transcribing recordings, drafting emails, dictating documents. It worked, but the friction of starting and stopping kept the use cases short and intentional.

The change since v2.4.0 is that dictation can be ambient. You hold a key, you talk, you let go. The cost of a single dictation drops below the cost of typing for most things over twenty words. I now dictate Slack messages I would have typed before. I dictate commit messages. I dictate the first draft of LinkedIn posts and edit them with my hands. I dictated most of this blog post.

If you tried IndianWhisper months ago and thought "fine, but not enough to change my habits," try the current build. The hotkey is no longer the rate limiter. Your patience is.

You can [download the latest Mac build here](/download). If you find a bug, the most useful thing you can do is email aiwithdhruv@gmail.com with the steps to reproduce it. We read everything and we ship fixes the same week when we can.

— Dhruv`,
  },
  {
    slug: "wispr-flow-vs-indianwhisper",
    title: "Wispr Flow vs IndianWhisper (2026): An Honest Comparison",
    description: "Wispr Flow is the most polished dictation tool on the market. IndianWhisper is built for how India actually talks. Here's a builder's honest breakdown of where each one wins \u2014 pricing, privacy, Hinglish, and offline use.",
    date: "2026-07-09",
    readTime: "6 min",
    tags: ["wispr-flow", "comparison", "hinglish", "pricing", "privacy", "dictation"],
    content: `I build IndianWhisper, so read this knowing that. But I also believe comparison posts that pretend the competitor has no strengths are useless — you can smell the bias in the first paragraph. Wispr Flow is a genuinely excellent product with serious funding behind it. If it didn't have real weaknesses for users like me, I would not have built this app.

Here is the honest breakdown.

## What Wispr Flow gets right

Wispr Flow is probably the smoothest dictation experience money can buy right now. Text lands fast and already formatted. Their engineering bar is high — they run a custom speech pipeline tuned relentlessly for latency, and it shows. The product feels premium, the onboarding is polished, and they cover Mac, Windows, and iPhone.

If you dictate exclusively in American or British English and price is not a concern, Wispr Flow is a strong default. That is the fair version of the story.

## Where the two products split

The split comes down to four things: language, privacy, price, and ownership.

### 1. Hinglish and Indian languages

Wispr Flow supports many languages, and Hindi is among their larger non-English segments. But supporting Hindi and being built for how Indians actually speak are different things. Most of us do not speak pure Hindi or pure English — we switch mid-sentence, sometimes mid-phrase. "Meeting ko reschedule kar do to Thursday afternoon" is one sentence in one breath.

Code-switching is where general-purpose engines stumble, because they are trained to lock onto one language and treat the other as noise. IndianWhisper is built around this pattern as the primary case, not the edge case — Indian English accents, Hinglish switching, and 11 Indian languages, with the accuracy work concentrated exactly there.

If your dictation is mostly English with an Indian accent, both tools will serve you. If your natural speech weaves Hindi and English together, this is the difference you will feel in the first minute.

### 2. Where your voice goes

Wispr Flow is a cloud product. Your audio streams to their servers for processing — that is how their pipeline works, and they are upfront about it.

IndianWhisper is on-device by default. The Whisper models run locally on your machine; your audio never leaves it unless you explicitly turn on cloud mode or sign in for sync. For everyday notes this may not matter to you. For client work, legal drafts, patient notes, or anything under NDA, it is the whole decision. Voice is uniquely sensitive data — it carries your identity, not just your words.

### 3. Price, in rupees

Wispr Flow Pro runs $15/month, or $12/month billed annually — roughly ₹1,000–1,250/month at current rates. Their free tier caps you at 2,000 words per week, which a heavy dictation user burns through in a day or two.

IndianWhisper's core is free — on-device transcription, Hinglish accuracy, voice commands, no word caps on the free tier's daily time allowance. Paid tiers (in ₹, priced for India, with a one-time lifetime option) unlock the bigger models and unlimited use. A lifetime option is something subscription-only tools structurally cannot offer you.

### 4. Ownership and openness

Wispr Flow is a VC-backed company whose pipeline lives on their servers. IndianWhisper ships the models to your machine. If I disappear tomorrow, the app on your Mac keeps transcribing — nothing about its core needs my servers to exist.

## The honest verdict table

| | Wispr Flow | IndianWhisper |
|---|---|---|
| Polish & latency | Excellent | Fast (streaming mode types while you speak) |
| Hinglish / code-switching | Supported, not specialized | Built for it |
| Indian languages | Limited | 11 languages |
| Privacy | Cloud processing | On-device by default |
| Free tier | 2,000 words/week | Daily time allowance, full accuracy |
| Price | $15/mo (~₹1,250) | Free core · India-priced paid tiers · lifetime option |
| Platforms | Mac, Windows, iPhone | Mac, Windows, Chrome extension |
| iPhone app | Yes | Not yet |

## Who should pick which

Pick Wispr Flow if: you dictate in pure English, you want the most polished experience available, the subscription price is irrelevant to you, and cloud processing of your voice is acceptable.

Pick IndianWhisper if: you speak Hinglish or any Indian language, your dictation includes anything confidential, you want your money to buy something once, or you simply want to try serious dictation without a subscription.

You can [download IndianWhisper free](/#download) — Mac, Windows, and Chrome — and judge the Hinglish difference yourself in under two minutes. That first minute of speaking naturally, without translating yourself into "dictation English" first, is the entire pitch.

— Dhruv`,
  },
  {
    slug: "i-stopped-typing-prompts-to-my-ai-coding-agent",
    title: "I Stopped Typing Prompts to My AI Coding Agent. I Talk to It Now.",
    description: "The best prompts to Claude Code and Cursor are long, specific, and conversational \u2014 exactly the kind of text nobody wants to type. Dictation turns a 40-word prompt into a 10-second sentence. Here's my setup, fully offline.",
    date: "2026-07-09",
    readTime: "5 min",
    tags: ["claude-code", "cursor", "ai-coding", "dictation", "developer-workflow", "productivity"],
    content: `There's a quiet workflow shift happening among developers who use AI coding agents: they've stopped typing their prompts. They talk.

It sounds like a gimmick until you notice the mismatch that makes it work. The best prompts to Claude Code, Cursor, or any coding agent are long, specific, and conversational — "look at the auth middleware, the session refresh is firing twice on tab focus, I think the listener isn't being cleaned up, check the useEffect in SessionProvider and fix the teardown." That's a forty-word prompt. Forty words is a chore to type. It's a ten-second sentence to say.

Typing pressure pushes you toward short prompts. Short prompts get worse results. Dictation removes the pressure, so you naturally give the agent the context it actually needs. The prompt quality goes up because the input cost went down.

## Why this is suddenly everywhere

Agents got good enough that the bottleneck moved. A year ago the model was the constraint; now, for a lot of tasks, the constraint is how fast and how completely you can tell it what you want. Voice is simply a higher-bandwidth channel for intent. You think out loud at 150 words per minute; most developers type at 50-70.

There's a second, less obvious reason: prompts are not code. Code punishes imprecision — one wrong character breaks everything, which is why dictating code never took off. Prompts are the opposite. They reward the rambling specificity of natural speech. All the "and also," "wait, actually," "the thing I mean is" texture that would be terrible in a function body is exactly what makes a prompt rich.

## My setup

I use IndianWhisper (disclosure: I build it) with a push-to-talk key. The flow:

1. Cursor or terminal focused, Claude Code waiting for input
2. Hold the push-to-talk key, describe what I want — as long as it needs to be
3. Release. The text lands at the cursor, cleaned up — fillers stripped, punctuation fixed
4. Enter. Agent goes to work

The details that matter for this workflow specifically:

**It has to work offline and on-device.** Your prompts contain your architecture, your bugs, your client's business logic. Piping that audio through a third-party cloud on top of the agent you're already trusting is a second data exposure most client contracts never contemplated. On-device transcription means the audio never leaves the machine — the only thing that goes anywhere is the text you were going to send the agent anyway.

**It has to handle how you actually speak.** I think in Hinglish. Mid-prompt I'll say "iss function ko refactor karo but keep the return type same." A dictation engine that panics at code-switching turns that into soup. One built for it doesn't blink. The same applies to speaking technical vocabulary with an Indian accent — "kubernetes," "postgres," "middleware" should not come out mangled.

**Cleanup has to be automatic.** Raw speech is full of "um, so, basically." A dictation tool with an LLM cleanup pass hands the agent tight text without you thinking about it.

## Where it works beyond prompts

Once the habit forms, it spreads. Commit messages — spoken in five seconds while your hands leave the keyboard. PR descriptions. Slack updates explaining what you shipped. Code review comments, where tone matters and typing makes everyone terse. The rubber-duck effect is real too: describing a bug out loud to your agent is rubber-duck debugging where the duck can actually fix it.

## Try the workflow

Any dictation tool can technically do this. If you want the on-device, code-switching-friendly version: [IndianWhisper is free to download](/#download) for Mac and Windows, with a Chrome extension for browser work. Set the push-to-talk key, open your agent, and describe your next bug out loud instead of typing it.

The first time you watch a long, precise prompt appear from a ten-second sentence — and the agent nails it on the first pass because you finally gave it enough context — the keyboard starts feeling like the slow way to talk to a machine.

— Dhruv`,
  },
  {
    slug: "words-appear-while-you-speak",
    title: "Words Now Appear While You're Still Speaking. Here's What I Changed.",
    description: "v2.6.0 makes IndianWhisper feel instant — text streams to your cursor mid-sentence instead of arriving a second after you stop. The fix wasn't a new model or a new vendor. It was three self-inflicted bottlenecks in code I had already written.",
    date: "2026-07-05",
    readTime: "5 min",
    tags: ["speed", "latency", "v2.6.0", "wispr-flow", "engineering", "dictation"],
    content: `I use my own dictation app all day. Last week I finally admitted something: it felt slower than Wispr Flow, and I knew it every single time I finished a sentence and waited for the text to land.

The gap was about a second. That sounds small. It is not. A second of dead air after every phrase is the difference between a tool that keeps up with your thinking and a tool you keep checking on.

So I did what I should have done a month ago: I stopped guessing and researched how the fast dictation tools actually work. Then I opened my own code. What I found was uncomfortable and useful in equal measure — all three bottlenecks were self-inflicted, and none of them needed a new model, a new vendor, or a rewrite to fix.

v2.6.0 shipped yesterday. This is what changed.

[IMAGE: Hero — deep-dark BG, neon cyan waveform flowing directly into typed text mid-word, suggesting text appearing during speech. Brand palette only.]

## What the fast tools actually do

The benchmark for "fast" in this category is well known. The best dictation tools hold themselves to a total budget of roughly 700 milliseconds from the moment you stop speaking to the moment finished text is sitting at your cursor — transcription, cleanup, network, everything.

Two details of how they hit that number matter more than any model choice.

First: audio starts streaming to the transcription engine while you are still talking. By the time you finish a sentence, most of the transcription work is already done. The engine is not starting when you stop — it is finishing.

Second: nothing waits for anything it doesn't have to. Transcription and cleanup are pipelined so aggressively that the "polish" step costs almost no wall-clock time.

Neither of these is exotic. Which brings me to the uncomfortable part.

## Bottleneck one: I was streaming, then throwing the stream away

IndianWhisper's cloud mode already had a streaming connection — a live WebSocket that sends audio continuously and receives transcribed text back in fragments, while you speak. The right architecture. Built months ago.

And then my code collected every incoming fragment into a buffer and did nothing with it until the engine declared the sentence finished. Only then did it type the whole thing at once.

I had built streaming infrastructure and then serialized it back into a batch system. The single biggest advantage of a live connection — text can appear the moment it exists — was being thrown away in about five lines of buffering logic.

v2.6.0 types each fragment the moment it arrives. Say a long sentence and the first words hit your cursor while you are mid-thought. There is a small piece of reconciliation logic that patches the text in place if the final version differs from what was streamed — in practice you almost never see it fire.

## Bottleneck two: a second AI call standing in front of the keyboard

In local mode, the pipeline was: transcribe the audio, then send the raw text to a language model to clean it up — remove the "um"s, fix punctuation — and only type after the cleaned version came back.

That cleanup call is worth having. Standing between you and your text, it is not. It added half a second to a full second of pure waiting to every single phrase, for a polish step whose output is usually identical to what a good transcription already produces.

Now the raw transcription types instantly, and cleanup runs behind it. When the polished version lands a few hundred milliseconds later and actually differs, the typed text quietly replaces itself. If a newer phrase has already been typed, the patch stands down — your newest words are never stomped by an old correction.

You get the text at transcription speed and the polish at cleanup speed, instead of getting both at the sum of the two.

## Bottleneck three: waiting too long to believe you'd stopped talking

Every dictation engine has to decide when you have finished a sentence. That decision has a knob — how much silence counts as "done."

My batch pipeline had that knob tuned tight months ago. The streaming pipeline, the one that matters most, was still running on the engine's default — nearly a full second of silence before it would close a sentence and finalize the text.

One configuration block: end-of-speech sensitivity set high, silence window cut to half a second. Sentences now close roughly twice as fast after you stop speaking.

[IMAGE: In-body — hand-sketched three-panel diagram titled "where the second went": buffered stream / blocking cleanup / slow endpointing, each with a cyan strike through it. Notebook style, greyscale + cyan.]

## The lesson I keep re-learning

None of this required new technology. The streaming connection existed. The cleanup service existed. The tuning parameter existed. What was missing was the discipline to measure where the time actually went instead of assuming the pipeline I had built months ago was still the pipeline I thought it was.

v2.6.0 also ships latency instrumentation, so from now on "it feels slow" is a log line with a number in it, not a vibe.

If you tried IndianWhisper before and it felt a beat behind your voice — that beat is gone. [Download the latest build](/#download), turn on cloud transcription, and watch the words race you.

And if it still feels slow on your machine, email aiwithdhruv@gmail.com with what you saw. The instrumentation means I can now actually find it.

— Dhruv`,
  },
  {
    slug: "we-added-cloud-sync",
    title: "We Added Cloud Sync. Here's Exactly What We Store.",
    description: "As of v2.4.0, signed-in IndianWhisper transcripts sync across Mac, Windows, and Chrome. This post is the full list — every column, where it lives, who can read it, how to delete it. Written before the privacy policy update lands.",
    date: "2026-05-12",
    readTime: "5 min",
    tags: ["cloud-sync", "privacy", "transparency", "v2.4.0", "dpdp", "supabase"],
    content: `If you sign in to IndianWhisper as of v2.4.0, every transcription you make is saved to a database we run. This post is the exact list of what is saved, where it lives, who can read it, and how to remove it. Written before the privacy policy update lands this week so nobody has to find this out from fine print.

[IMAGE: Hero — deep-dark BG + neon cyan illustration of three devices (Mac, Windows laptop, Chrome browser) syncing to a cloud labeled "Mumbai." Brand palette only.]

## Why we built cloud sync

The most-requested feature since the Mac app shipped was: "If I dictate something on my MacBook in the morning, why can't I see it on my Windows laptop in the evening?"

The honest answer used to be: every transcript lived only on the device that produced it. Local-first was a privacy choice, but also a sync ceiling. Three apps, three separate libraries.

v2.4.0 lifts that ceiling. Sign in once, and the same transcript library is visible from the Mac app, the Windows app, and the Chrome extension. Search a thing on any device — find it on every device. That is the killer feature, and it does not work without cloud storage.

So we added cloud storage. And we are explaining it on day one.

## Who actually triggers a cloud save

Only signed-in users.

If you do not sign in, the app behaves the same as v1: transcripts live on your device, audio never leaves your machine, our servers know nothing about you. Same promise as the day we shipped.

If you do sign in — for cross-device sync, billing, or future team features — new transcriptions push to the cloud library. Old transcripts that lived locally before v2.4.0 are not retroactively uploaded. Only what you create after sign-in.

There is no separate "send my data to the cloud" toggle. Signing in is the toggle.

## What gets stored — column by column

Here is the actual \`transcripts\` table schema in our Supabase project. Every row is one dictation:

- **\`raw_text\`** — the original Whisper output, full transcript, no truncation
- **\`cleaned_text\`** — the LLM-polished version (only if you enabled cleanup)
- **\`language\`** — BCP-47 detected language code (\`hi-IN\`, \`en-IN\`, \`hi-Latn-IN\`, \`gu-IN\`, etc.)
- **\`model_used\`** — which engine produced the text (\`whisper-tiny\`, \`gemini-2.5-flash\`, etc.)
- **\`llm_cleanup_model\`** — which LLM you ran cleanup through, or \`null\`
- **\`duration_seconds\`**, **\`word_count\`**, **\`char_count\`** — basic metadata
- **\`source\`** — which app captured it (\`mac\`, \`chrome\`, \`windows\`, \`studio-upload\`, \`studio-live\`)
- **\`kind\`** — type of capture (\`dictation\`, \`meeting\`, \`note\`, \`upload\`)
- **\`app_context\`** — which app you were dictating into, e.g. \`{"app": "Xcode"}\` on Mac, \`{"host": "gmail.com"}\` in Chrome. Optional and easy to scrub.
- **\`audio_sha256\`** — a one-way hash of the audio, used so re-syncing the same recording does not create duplicates
- **\`voice_commands\`** — voice editing commands used in the session, e.g. \`["scratch_that", "delete_word"]\`
- **\`created_at\`**, **\`updated_at\`** — timestamps

**What is not stored:** the audio file itself. We never see the recording, never save it, never upload it. The \`audio_sha256\` field is a 256-bit fingerprint computed on your device — it lets us detect duplicates without seeing the bytes.

If a column above ever changes — added, renamed, or removed — the migration ships in our open repo before going live in production. Schema is the contract.

## Where the data lives

Supabase, region \`ap-south-1\`. That is the Mumbai data center.

Two reasons. First, latency — typically under 100ms for Indian users, fast enough for search results to feel instant. Second, data residency under the DPDP Act 2023. Personal data of Indian users stays in Indian infrastructure by default. Nothing routes through US data centers for storage or query.

If you are based outside India, your transcripts still live in Mumbai for now. A multi-region option may ship later if demand justifies the operational complexity, but India-first stays the default.

## Who can read your transcripts

Only you.

The database has row-level security on every user-content table. Every query, without exception, is scoped to your user ID by the JWT in your Supabase session. There is no admin escape hatch in the application layer.

Right now, I am the only person with database-admin access, and I have not read a user transcript. When the team grows, access will be logged, auditable, and require a stated reason — and the policy will be public before any new person gets keys.

For sensitive workflows — legal, medical, anything under NDA — the safest move stays the same as v1: do not sign in. Local-only mode is still the default for unauthenticated use, and nothing leaves the device.

## How to delete your data

Email **aiwithdhruv@gmail.com** with the subject "Delete my data." We soft-delete on request and hard-delete the row within 7 days. Hard-delete means the row is gone — not flagged, not anonymized, gone. Soft-deleted rows also auto-purge after 30 days even without an explicit request — the row is gone either way.

A user-facing "Delete my data" button in Settings is the next ship. Until then, email is the path.

Per-row delete from inside the app is on the roadmap; for now, full-account delete via the email above is the path.

[IMAGE: In-body — sketched three-panel diagram (Sign-in → Cloud sync flow → Delete flow). Deep-dark BG, neon cyan accents on the active arrows.]

## Why this post exists before the privacy policy update

The privacy policy is being rewritten this week to reflect cloud sync. We could have shipped it quietly and let people stumble on it.

We chose not to. The right move when you change what data you collect is to write a plain-English note to the people who trusted you with the previous version. That is this post.

If anything here surprises you or feels incomplete, reply on LinkedIn or email support directly. Corrections in the next 48 hours go straight into the policy before it ships.

## What is coming next

The schema includes a \`transcript_chunks\` table with \`pgvector\` embeddings — semantic search across your full library. You will be able to ask "find the transcript where I talked about the Nginx config" and get the right paragraph, not just a keyword match. On the roadmap; shipping in a future release.

After that: team workspaces (the \`org_id\` column is already in the schema, nullable, waiting), and native mobile to round out the surface area.

## Try it

Update to v2.4.0 at [indianwhisper.com/download](https://indianwhisper.com/download). Sign in once on any device, then on the others. Same library, everywhere.

If you have questions about anything in this post — what we store, where, why, or how to remove it — reply on LinkedIn or email **aiwithdhruv@gmail.com**. The whole point of this post is that the questions are welcome.`,
  },
  {
    slug: "macwhisper-vs-indianwhisper",
    title: "MacWhisper vs IndianWhisper: Privacy, Price, and the India Gap",
    description: "MacWhisper Pro is €59 lifetime. IndianWhisper is free. Real choice is not price — it is where your audio goes and how far past your Mac the tool reaches.",
    date: "2026-04-28",
    readTime: "8 min",
    tags: ["comparison", "macwhisper", "privacy", "voice-typing", "on-device", "hindi"],
    content: `[MacWhisper Pro](https://goodsnooze.gumroad.com/l/macwhisper) is €59 lifetime on Gumroad, or $6.99/month on the App Store. IndianWhisper is free. Forever. No subscription, no file caps.

If the comparison stopped at price, this would be a 200-word post. Both apps run OpenAI's Whisper models on your Mac. The real differences sit underneath: which accents the model handles, how far past your Mac the tool reaches, and which bytes ever leave your laptop.

I built IndianWhisper. This is the comparison I wish I had read before paying for a lifetime tier last year.

## Where MacWhisper genuinely wins

A comparison post that is not fair is just an ad. There are jobs MacWhisper does better today.

**File-based transcription.** Drop a folder of recordings on MacWhisper. It chews through them with batch processing, timestamped output, and SRT/VTT export. IndianWhisper does live dictation, not file batch. If you process recorded interviews or podcasts, MacWhisper Pro is the better tool for that job.

**YouTube URL ingest.** Paste a link, get a transcript. We do not have this.

**Speaker diarization.** Two-speaker conversations come out labelled in MacWhisper Pro. We do not diarize today. For doctor-patient consultations or two-host podcasts, that is a real edge.

**Maturity.** MacWhisper has shipped since 2022. The polish on file-import, the model picker, and the export menu reflects three years of iteration. IndianWhisper is one year old.

If your work is "transcribe these 20 hours of recordings," MacWhisper Pro is the right answer. The €59 one-time is fair pricing for that workflow.

The rest of this post is about every other workflow.

## Where IndianWhisper wins

**Indian accents and Hindi / Hinglish, first-class.** This is why the project exists. Whisper Large handles Indian English well; both apps benefit. IndianWhisper layers a punctuation + voice-command pass tuned on Hinglish code-switching. Say a sentence Hindi-English-Hindi mid-stride and IndianWhisper outputs clean text — Devanagari where you want it, English where you want it. MacWhisper produces Whisper's raw output, sometimes transliterated, sometimes oddly capitalised.

**Free, with no asterisk.** MacWhisper free runs only the small Whisper models (Tiny + Base) and is missing batch processing, speaker diarization, and SRT/VTT export. IndianWhisper free is unlimited dictation, [all five Whisper models](https://indianwhisper.com/blog/whisper-ai-models-explained-which-one-to-use) (Tiny 75 MB → Large 3 GB), the full cleanup layer, and the Chrome extension. No paywalled Pro mode. Payment infrastructure exists but is turned off until there is a paid feature worth charging for.

**Chrome extension reach.** MacWhisper is a Mac app. It dictates into the focused window via system input. The IndianWhisper Chrome extension is a different surface — a floating mic button that drops cleaned text into Gmail compose, Slack web, Google Docs, LinkedIn DMs, ChatGPT, and Notion, on any laptop where Chrome runs. If half your day is in web apps, the extension is the difference between "I dictate sometimes" and "I dictate everything."

**Optional LLM cleanup with your own keys.** A finished Whisper transcript still has filler words and half-formed sentences. IndianWhisper's optional cleanup routes the text (not the audio) through one of seven LLMs you choose — Groq, Claude, OpenAI, Gemini, Moonshot, DeepSeek, or OpenRouter — using a key you bring. MacWhisper has no comparable feature today.

**Voice editing commands.** "Scratch that" deletes the last sentence. "Delete word" deletes the previous word. "Clear all" wipes the buffer. Spoken inline while you dictate. MacWhisper relies on macOS dictation defaults, which are weaker.

## The privacy question (this is where most readers actually live)

Both apps load Whisper models locally and transcribe on your Mac's CPU/GPU. For audio, that is not marketing — it is what the code does. Apple Silicon runs Whisper Large at usable speed; Intel Macs are slower but still local.

What changes between the two apps is the optional layer above transcription.

**MacWhisper Pro (Gumroad, €59 lifetime):** Audio stays on your machine. Transcripts stay on your machine. There is no first-party cloud step. (The App Store version has its own caveats — review the listing if you go that route.)

**IndianWhisper (free):** Audio stays on your machine for Whisper transcription. If you turn on optional LLM cleanup, the *finished text transcript* (not audio) goes to whichever LLM provider's key you supplied. If you leave LLM cleanup off — the default — nothing leaves your laptop.

What this means in practice:

- **Doctors and lawyers handling protected content:** Leave LLM cleanup off. Audio and text stay on the Mac. Both apps clear this bar; pair with FileVault for hardware-disk encryption.
- **Journalists handling source recordings:** Both apps run the same way for audio. If you use cleanup, point it at a self-hosted LLM via OpenRouter or skip the layer.
- **Compliance reviews:** The bytes that leave the machine are auditable. If your review board wants "no third-party processors," turn off cleanup. If they accept named processors with DPAs, pick one of the seven and bring your own enterprise key.

A deeper write-up on what "on-device" actually means at the network layer is in our [on-device vs cloud privacy](https://indianwhisper.com/blog/on-device-vs-cloud-voice-recognition-privacy) post.

## The feature matrix

| Feature | MacWhisper Pro (Gumroad €59 lifetime) | IndianWhisper (free) |
|---|---|---|
| Price | €59 one-time (≈ $69 USD) | **₹0 / $0 — no subscription, no caps** |
| Free tier | Tiny + Base models only, no batch / no diarization / no SRT export | **Unlimited dictation, all 5 Whisper models** |
| On-device audio | Yes | **Yes** |
| Optional cloud LLM cleanup | No (text stays local) | **Yes — 7 providers, your key, off by default** |
| Indian English / Hindi tuning | Whisper default | **Tuned punctuation + Hinglish handling** |
| Chrome extension (Gmail / Slack / Docs / ChatGPT / Notion) | No | **Yes — live** |
| Real-time dictation | Yes | **Yes** |
| File / folder batch transcription | **Yes — strong** | Not yet |
| Speaker diarization | **Yes (Pro)** | Not yet |
| YouTube URL transcription | **Yes (Pro)** | Not yet |
| Voice editing commands (scratch that, delete word) | macOS dictation defaults | **Yes — built-in** |
| System-wide hotkey | Yes | **Yes — Cmd+D, configurable** |
| Whisper models bundled | Multiple (largest in Pro) | **All 5 (Tiny 75 MB → Large 3 GB)** |
| Last shipping update | Active | **Active — auto-update every 6 hours** |

A quick note: this is "MacWhisper Pro on Gumroad" vs. "IndianWhisper free." The Gumroad lifetime is the version most reviewers benchmark. The Mac App Store SKU is structured differently and is priced as a subscription — I would compare against that separately if you are considering it.

## A 10-minute dictation session, both apps

I ran the same 10-minute block on each app, same M5 Mac, Whisper Large on both sides:

**Email reply in Gmail (web).** MacWhisper triggers macOS dictation in Chrome's text field — works, but no inline editing. IndianWhisper's extension floats a mic over the field; smart punctuation, "Scratch that" rewinds the last sentence by voice.

**Slack message to a colleague (web Slack).** MacWhisper relies on system dictation — punctuation is a coin flip. IndianWhisper's extension drops cleaned text with the question mark and comma in the right places.

**Google Doc with a paragraph mixing English and Hindi.** MacWhisper handles the English; the Hindi comes through transliterated (Latin script of Devanagari) — usable but not what was wanted. IndianWhisper's Hinglish pass keeps the Hindi sentence in clean Devanagari and the English sentence in English, correctly separated.

**A 14-minute audio file of a recorded interview, into MacWhisper's batch import.** Drag, drop, transcript with timestamps and speaker labels, export to SRT. Smooth. IndianWhisper does not handle file batch today. Score one for MacWhisper.

If your week is 80% live web-app dictation and 20% file batch, IndianWhisper is the daily driver and you keep MacWhisper around for the file work. If the mix is inverted, flip the order. (More on the [voice-vs-keyboard speed math](https://indianwhisper.com/blog/voice-typing-vs-keyboard-typing-speed-comparison) in another post.)

## FAQ

**Is IndianWhisper as accurate as MacWhisper?**
For audio, yes — same Whisper models, same on-device runtime. IndianWhisper pulls ahead on Indian English, Hindi, and Hinglish because of the layers above Whisper. For pure American English on a clean mic, the apps are functionally tied.

**Why is IndianWhisper free?**
The Mac app is the front door. We will eventually charge for higher-volume or team features — the payment plumbing exists, turned off. Users first, revenue later.

**Does either app send my audio to the cloud?**
For Whisper transcription: no, both run locally. MacWhisper Pro on Gumroad has no first-party cloud step. IndianWhisper's optional LLM cleanup sends the *finished text* (not audio) to whichever provider key you supplied, only if you turn it on. Default off.

**Which is better for legal or medical work?**
Both clear the audio-stays-local bar. Pick MacWhisper Pro if you need diarization and file-batch workflows for depositions. Pick IndianWhisper if you dictate live notes into web apps and want the cleanup layer kept off.

**Can I run both?**
Yes. Different hotkeys, different surfaces, no conflict. Most heavy users we have talked to keep both — IndianWhisper for daily web-app dictation, MacWhisper for batch transcription.

**Chrome extension on Windows or Linux?**
The extension runs wherever Chrome runs. The Mac app is macOS 14+. Windows and Linux native apps are on the roadmap, not shipped today.

## The single move worth making this week

If you are about to pay €59 for MacWhisper Pro and your work is mostly live dictation in browsers and Hindi-English mix typing, install IndianWhisper free first. Run it for a week. If file batch + speaker diarization end up being the missing piece, then buy MacWhisper Pro and keep both. You are out nothing and you have ground truth.

[Download IndianWhisper free →](https://indianwhisper.com/download)`,
  },
  {
    slug: "voice-typing-vs-keyboard-typing-speed-comparison",
    title: "Voice Typing vs Keyboard: The Speed Gap Nobody Talks About",
    description: "The average person types 40 WPM but speaks at 150 WPM. That's 800+ hours wasted per year. Here's the data behind why voice is 3.75x faster.",
    date: "2026-03-16",
    readTime: "5 min",
    tags: ["productivity", "voice-typing", "data"],
    content: `## You're Wasting 800 Hours a Year Typing

Let's do the math.

The average professional types **40 words per minute**. That's the global average according to typing speed studies — and most people overestimate their own speed.

The average person speaks at **150 words per minute** in normal conversation. Not rushing. Not dictating. Just talking naturally.

That's a **3.75x speed difference**.

### What Does 3.75x Actually Mean?

If you spend 3 hours a day typing (emails, Slack, docs, code comments), here's what you're losing:

| Metric | Typing (40 WPM) | Speaking (150 WPM) | Time Saved |
|--------|-----------------|-------------------|------------|
| Per day | 3 hours | 48 minutes | **2.2 hours** |
| Per week | 15 hours | 4 hours | **11 hours** |
| Per month | 65 hours | 17 hours | **48 hours** |
| Per year | 780 hours | 208 hours | **572 hours** |

That's **572 hours per year**. At $25/hour, that's **$14,300 in lost productivity**.

### Why Don't More People Use Voice Typing?

Three reasons:

**1. Accuracy was terrible.** Until 2023, voice recognition made too many mistakes. You'd spend more time correcting errors than you saved. OpenAI's Whisper changed everything — it understands context, handles accents, and gets punctuation right.

**2. Privacy concerns.** Most voice tools send your audio to the cloud. Every word you speak goes to someone else's server. For developers working on proprietary code, that's a dealbreaker.

**3. It felt weird.** Speaking to your computer in an open office? Awkward. But remote work changed this. You're already on calls all day — why not talk to your editor too?

### The New Generation of Voice Tools

Modern voice-to-text tools like IndianWhisper solve all three problems:

- **Accuracy**: Whisper AI models achieve 95%+ accuracy on English, even with Indian accents
- **Privacy**: Audio stays on-device. Sign in for transcript sync; opt out by not signing in.
- **Natural**: Smart punctuation means you say "comma" and it types ",". Say "new line" and it moves down. No editing needed.

### The Real Advantage: Thinking Speed

Here's what nobody mentions — **voice typing matches your thinking speed**.

When you type, there's a bottleneck between your brain and the keyboard. Your thoughts are faster than your fingers. This creates a cognitive queue — ideas pile up waiting to be typed, and some get lost.

When you speak, the bottleneck disappears. Your mouth can keep up with your brain. Ideas flow directly into text. No queue. No lost thoughts.

This is why writers who switch to voice dictation report not just faster output, but **better quality** — they capture nuances they would have simplified for the keyboard.

### Try It Yourself

[IndianWhisper](https://indianwhisper.com) is free, runs entirely on your Mac, and takes 60 seconds to set up. Or try the [live demo](https://indianwhisper.com/#try-it) in your browser right now — no install needed.

The 3.75x speed gap is real. The question is whether you'll keep wasting 800 hours a year, or start speaking.`,
  },
  {
    slug: "future-of-voice-ai-2026-predictions",
    title: "The Future of Voice AI: 7 Predictions for 2026 and Beyond",
    description: "Voice interfaces are replacing keyboards faster than we expected. From coding by voice to AI agents that listen, here's where voice AI is heading.",
    date: "2026-03-16",
    readTime: "7 min",
    tags: ["voice-ai", "future", "predictions"],
    content: `## Voice Is Eating the Keyboard

In 2024, OpenAI released Whisper and voice recognition accuracy crossed the 95% threshold for the first time. In 2025, on-device models made it private. In 2026, we're seeing the first generation of tools that make voice the *default* input method.

Here are 7 predictions for where voice AI is heading:

### 1. Voice-First IDEs Will Emerge

Developers already use Copilot to write code with text prompts. The next step is obvious — **speak your intent, get code**.

"Create a function that takes a list of users and returns only those who signed up in the last 30 days."

That's not a prompt you'd type. That's a sentence you'd say. Voice-first coding tools will understand context from your codebase and generate code from natural speech.

IndianWhisper already does the transcription part — it types code at your cursor in VS Code. The next generation will add code intelligence to the voice pipeline.

### 2. On-Device Models Will Dominate

Cloud-based voice AI has a fundamental problem: **latency + privacy**.

Every word you speak goes to a server, gets processed, and comes back. That's 200-500ms of delay — enough to break your flow.

On-device models like WhisperKit run in under 50ms on Apple Silicon. That's **real-time**. No internet needed. No data sent anywhere.

By end of 2026, we predict 80% of consumer voice tools will run on-device. The cloud will be reserved for enterprise features and fine-tuning.

### 3. Voice Commands Will Replace Keyboard Shortcuts

Instead of memorizing Cmd+Shift+P → "Format Document" → Enter, you'll say:

"Format this file."

Voice commands are already appearing in tools like IndianWhisper ("scratch that" to undo, "new line" to move down). This will expand to:

- "Bold this paragraph"
- "Move this function above the class"
- "Run the tests"
- "Deploy to staging"

The mouse and keyboard won't disappear — but they'll become secondary inputs for precision tasks.

### 4. Multilingual Voice Will Break Language Barriers

Current voice tools work best in English. But Whisper supports 99 languages, and the models are getting better every quarter.

By 2027, a developer in Bangalore will be able to speak in Hindi and get clean English code comments. A PM in Tokyo will dictate in Japanese and get English Slack messages.

IndianWhisper already supports Hindi/Hinglish → English transcription. This is just the beginning.

### 5. Voice AI Agents Will Listen, Not Just Transcribe

Today's voice tools convert speech to text. Tomorrow's will **understand and act**.

Imagine a voice AI that:
- Listens to your standup meeting and creates Jira tickets
- Hears you describe a bug and finds the relevant code
- Takes your verbal design feedback and updates the Figma file

The transcription layer (Whisper) is solved. The action layer (agents) is next.

### 6. Privacy Will Become a Selling Point

As voice AI becomes ubiquitous, the privacy question will get louder:

"Every word I speak goes to Google/Apple/OpenAI?"

On-device tools that guarantee zero cloud processing will command a premium — or in IndianWhisper's case, earn loyalty by being free AND private.

The apps that win will be the ones that can say: **"Your audio never leaves your machine."** Not as marketing, but as an architectural guarantee.

### 7. Voice Will Be the Default Mobile Input by 2028

Typing on a phone keyboard is the worst input method ever invented. Small keys, autocorrect chaos, slow speeds.

Voice is the natural replacement. WhatsApp already shows voice messages are preferred in many cultures. The next step is voice-to-text that's good enough to replace the keyboard entirely.

### The Bottom Line

We're at an inflection point. Voice AI has crossed the accuracy, speed, and privacy thresholds that held it back for decades. The tools exist today — [IndianWhisper](https://indianwhisper.com) is one of them.

The question isn't whether voice will replace typing. It's when. And the people who switch early will have a 3.75x productivity advantage over everyone else.`,
  },
  {
    slug: "on-device-vs-cloud-voice-recognition-privacy",
    title: "On-Device vs Cloud Voice Recognition: The Privacy Truth",
    description: "When you speak to Siri, your voice goes to Apple's servers. When you use IndianWhisper, it stays on your Mac. Here's why that matters more than you think.",
    date: "2026-03-16",
    readTime: "6 min",
    tags: ["privacy", "on-device", "cloud", "security"],
    content: `## Where Does Your Voice Go?

Every time you use a voice assistant, your audio is being processed somewhere. The question is: **where?**

### Cloud Voice Recognition

When you use Siri, Google Assistant, or most voice-to-text tools, here's what happens:

1. Your microphone captures audio
2. Audio is **sent to a remote server** over the internet
3. The server processes it using large AI models
4. Text is sent back to your device

This means:
- **Your voice data is on someone else's server** — even if temporarily
- **An internet connection is required** — no WiFi, no transcription
- **Latency is added** — 200-500ms round trip
- **Your data could be stored** — for "improvement" or training

Google's privacy policy states they may retain voice data for up to 18 months. Apple says Siri recordings are stored for 6 months. Amazon's Alexa recordings are kept indefinitely unless you manually delete them.

### On-Device Voice Recognition

When you use an on-device tool like IndianWhisper, the flow is different:

1. Your microphone captures audio
2. Audio is processed **locally on your CPU/GPU**
3. Text appears instantly
4. **Nothing is sent anywhere. Ever.**

No server. No internet. No data retention. The audio exists only in your computer's RAM and is discarded after processing.

### Why This Matters for Developers

If you're a developer, you're speaking about:
- Proprietary code and architecture
- Client names and project details
- Internal tools and infrastructure
- Security vulnerabilities you're fixing
- Business logic and trade secrets

Sending all of that to a cloud server — even encrypted — is a risk. One data breach, one rogue employee, one government subpoena, and your spoken words are exposed.

### The Technical Difference

**Cloud models** like Google's USM or OpenAI's cloud Whisper API use massive server-side GPUs. They're powerful but require network access.

**On-device models** like WhisperKit (used by IndianWhisper) are optimized versions of OpenAI's Whisper, compiled for Apple's Neural Engine and Metal GPU. They run in real-time on an M1 chip using about 800MB of RAM.

The accuracy difference? Negligible for English. The Base model (140MB) handles daily use perfectly. The Large V3 model (3GB) matches cloud accuracy.

### Speed Comparison

| Metric | Cloud (Google/OpenAI) | On-Device (WhisperKit) |
|--------|----------------------|----------------------|
| Latency | 200-500ms | <50ms |
| Requires internet | Yes | No |
| Works on airplane | No | Yes |
| Data sent to server | Yes | Never |
| Processing speed | 1-2x real-time | 42x real-time |

On-device is faster, more reliable, and completely private.

### The Cost Difference

Cloud voice APIs charge per minute of audio:
- Google Speech-to-Text: $0.006/min
- OpenAI Whisper API: $0.006/min
- AWS Transcribe: $0.024/min
- Deepgram: $0.0043/min

At 3 hours of dictation per day, that's **$3-13 per day** or **$780-3,380 per year**.

On-device processing costs **$0**. You already own the hardware. The model downloads once (140MB for Base) and runs forever.

### Making the Switch

[IndianWhisper](https://indianwhisper.com) is built entirely on-device. No cloud fallback required. No API keys needed for basic use. Download the 2MB app, grant mic + accessibility permissions, and you're transcribing in 60 seconds.

Your voice stays on your Mac. That's not a marketing claim — it's an architectural fact. There is no server to send data to. The code is [open source](https://github.com/aiagentwithdhruv/indian-whisper) if you want to verify.

Privacy shouldn't be a premium feature. It should be the default.`,
  },
  {
    slug: "whisper-ai-models-explained-which-one-to-use",
    title: "Whisper AI Models Explained: Tiny vs Base vs Small vs Large",
    description: "OpenAI's Whisper comes in 5 sizes. Here's which one you should actually use — with real benchmarks on accuracy, speed, and RAM usage on Apple Silicon.",
    date: "2026-03-16",
    readTime: "4 min",
    tags: ["whisper", "ai-models", "tutorial"],
    content: `## Choosing the Right Whisper Model

OpenAI's Whisper is the engine behind most modern voice-to-text tools. But it comes in 5 sizes, and picking the wrong one means either slow performance or poor accuracy.

Here's the practical guide — no theory, just benchmarks.

### The 5 Models

| Model | Size | RAM Usage | Speed (M1) | English Accuracy |
|-------|------|-----------|------------|-----------------|
| **Tiny** | 75 MB | ~400 MB | 80x real-time | ~88% |
| **Base** | 140 MB | ~500 MB | 42x real-time | ~93% |
| **Small** | 460 MB | ~1 GB | 15x real-time | ~96% |
| **Large V3 Turbo** | 1.5 GB | ~2.5 GB | 5x real-time | ~98% |
| **Large V3** | 3 GB | ~4 GB | 2x real-time | ~99% |

*Benchmarks on Apple M1 Pro via WhisperKit. Real-time means 1 second of audio processed in X seconds.*

### Which One Should You Use?

**For daily typing/dictation: Base (140 MB)**

This is the sweet spot. 93% accuracy catches virtually everything in normal speech. At 42x real-time, transcription feels instant. 500MB RAM means it runs alongside your other apps without issues.

This is what IndianWhisper recommends by default.

**For noisy environments: Small (460 MB)**

If you're in a coffee shop, coworking space, or have background noise, Small handles it better. The 3% accuracy bump comes from better noise separation and context understanding.

**For professional/medical/legal: Large V3 Turbo (1.5 GB)**

When accuracy matters more than speed — recording meeting notes, transcribing interviews, or dictating legal documents — Large V3 Turbo gives you 98% accuracy at a reasonable 5x real-time speed.

**For maximum accuracy: Large V3 (3 GB)**

Academic research, subtitling, or any use case where every word must be perfect. This is the same model OpenAI uses in their API. The downside: it uses 4GB RAM and is relatively slow.

**For quick notes/commands: Tiny (75 MB)**

Short phrases, voice commands, quick searches. If you're just saying "open terminal" or "send message", Tiny is more than enough and uses almost no resources.

### Accuracy vs Speed: The Real Tradeoff

The jump from Tiny to Base is massive — 5% accuracy improvement for just 65MB more. That's the best value upgrade.

Base to Small gives you 3% more accuracy but triples the download size. Worth it only if accuracy matters a lot for your use case.

Small to Large is diminishing returns — 2-3% accuracy for 3-7x more resources. Most people will never notice the difference in daily use.

### Indian English and Accents

Whisper was trained on 680,000 hours of multilingual audio. It handles Indian English well, especially the Base model and above. For Hindi/Hinglish mixed speech, Small or higher is recommended.

IndianWhisper adds an optional AI cleanup layer on top of Whisper — 7 LLM providers (Groq, Claude, OpenAI, Gemini) that fix any remaining transcription errors and add proper formatting.

### Try Them All

[IndianWhisper](https://indianwhisper.com) gives you all 5 models for free. Switch between them in Settings → Models. The model downloads once and works offline forever.

Start with Base. If you need more accuracy, try Small. Most people never need to go higher.`,
  },
  {
    slug: "how-developers-use-voice-to-code-faster",
    title: "How Developers Use Voice to Code 3x Faster",
    description: "Voice isn't just for dictation. Developers are using voice-to-text to write comments, commit messages, documentation, and even code — here's how.",
    date: "2026-03-16",
    readTime: "5 min",
    tags: ["developer-tools", "productivity", "coding"],
    content: `## Voice Isn't Just for Writers

When people think "voice typing," they imagine dictating emails or documents. But developers are the ones who benefit most — and not in the way you'd expect.

### Where Developers Actually Type

A developer's day isn't just code. It's:

- **Commit messages** — "Fix user authentication timeout on mobile Safari"
- **PR descriptions** — explaining what changed and why
- **Code comments** — documenting complex logic
- **Slack/Teams messages** — discussing architecture decisions
- **Documentation** — README files, API docs, guides
- **Jira/Linear tickets** — describing bugs and features
- **Code reviews** — explaining what needs to change

All of this is natural language. All of it is faster spoken than typed.

### The Voice + Keyboard Workflow

The best developers don't replace their keyboard with voice — they **combine them**:

1. **Code with keyboard** — syntax, brackets, indentation still need precise input
2. **Comment with voice** — "This function handles the OAuth callback and exchanges the authorization code for an access token"
3. **Commit with voice** — "Fix race condition in WebSocket reconnection logic"
4. **Document with voice** — speak the README, let the tool type it

This hybrid approach is 2-3x faster than keyboard-only because you're using the right tool for each task.

### Real Examples

**Writing a commit message:**

Instead of typing:
\`\`\`
git commit -m "Refactor authentication middleware to support JWT refresh tokens with automatic rotation and add rate limiting for failed login attempts"
\`\`\`

You press Cmd+D and say: "Refactor authentication middleware to support JWT refresh tokens with automatic rotation and add rate limiting for failed login attempts."

Same result. 3x faster. No typos.

**Explaining code in a PR review:**

Instead of typing a 5-line comment, you speak:

"This approach won't scale because we're loading all users into memory. Consider using a cursor-based pagination with a limit of 100 per batch. Also, the error handling on line 45 swallows the exception — we should at least log it."

That comment would take 2 minutes to type carefully. Speaking it takes 20 seconds.

**Writing documentation:**

The reason most projects have bad docs is that writing them is slow and boring. Voice changes the equation:

- Speak your API documentation while looking at the code
- Dictate the README while the architecture is fresh in your mind
- Describe the deployment process as you do it

Documentation goes from "I'll do it later" to "done in 5 minutes."

### Tools That Work for Developers

Not all voice tools are developer-friendly. You need:

- **Auto-type at cursor** — text must appear in your editor, not a separate window
- **Works in terminal** — for commit messages, CLI tools
- **Smart punctuation** — say "comma" and get "," not the word "comma"
- **Fast switching** — hotkey to start/stop, no disruption to flow
- **Privacy** — you're speaking about proprietary code

[IndianWhisper](https://indianwhisper.com) was built specifically for this workflow. Cmd+D to start, speak, text appears at your cursor in any app. Works in VS Code, Terminal, Slack, Chrome — everywhere.

### The Productivity Stack

The modern developer productivity stack in 2026:

1. **AI code generation** (Copilot/Cursor) — for writing code
2. **Voice typing** (IndianWhisper) — for everything around code
3. **AI agents** — for automation and research

Together, these tools let you build at 5-10x the speed of keyboard-only development. The keyboard isn't going away — but it's no longer the only input device that matters.

Try [IndianWhisper](https://indianwhisper.com) free — the [live demo](https://indianwhisper.com/#try-it) works in your browser, no install needed.`,
  },
  {
    slug: "i-built-a-voice-ai-app-and-gave-it-away-free",
    title: "I Built a Voice AI App and Gave It Away Free — Here's Why",
    description: "I paid Rs.3,800 for a voice typing app. Then I built a better one in one night and made it free. This is the story of IndianWhisper and why free tools win.",
    date: "2026-03-18",
    readTime: "8 min",
    tags: ["founder-story", "build-in-public", "voice-ai", "open-source"],
    content: `## I Paid Rs.3,800 for Something I Could Build Myself

It started with frustration.

I was building AI products — full-stack apps with FastAPI, Next.js, Supabase, LangGraph. The kind of work where you write code for 2 hours and then spend another 3 hours typing Slack messages, commit messages, documentation, PR reviews, and emails.

I think at 150 WPM. I type at 45 WPM. There is a constant bottleneck between what I want to say and what my fingers can produce.

So I bought Wispr Flow. Rs.3,800 per year. A Mac app that lets you speak and it types for you. Everywhere. In VS Code, in Slack, in Chrome. It is genuinely good.

But then I looked at my students.

### The Rs.3,800 Problem

I teach AI engineering to 500+ students. Most of them are in India. For an Indian student or early-career developer, Rs.3,800 is not nothing — that is a month of internet, or two weeks of food.

When I told my class about voice typing, the first question was always: **"Is there a free version?"**

The answer was no. Wispr is $50/month internationally. BridgeVoice — another competitor — also $50/month. Apple's built-in dictation is decent but cannot auto-type into VS Code or Terminal.

There was no good free option. So I built one.

### One Night, One App

I am not going to pretend this was a heroic 6-month engineering effort. It was not.

The building blocks already exist:
- **WhisperKit** by Argmax — runs OpenAI's Whisper model on-device on Apple Silicon
- **Swift** — Apple's native language with full macOS access
- **CGEvent** — Apple's API for simulating keyboard events (auto-type)

The hard part was not the technology. It was the polish:

- Making the menu bar app feel native
- Getting accessibility permissions to work reliably
- Adding smart punctuation ("comma" types a comma)
- Voice commands ("scratch that" to undo)
- Supporting 5 different Whisper model sizes
- Building an LLM cleanup layer with 7 providers
- Making it work in EVERY app — VS Code, Terminal, Slack, Chrome, Notes

14 Swift files. 2MB download. One night.

### Why Free?

People ask me this a lot. "You could charge Rs.500/month and make good money."

Here is my thinking:

**1. Voice input should be infrastructure, not a product.**

Typing is free. Your keyboard does not charge you per keystroke. Voice-to-text is just another input method — it should be equally free.

**2. Free tools build distribution.**

I am not trying to build a voice AI company. I am an AI engineer who builds products for clients. Every student who uses IndianWhisper knows my name. Every LinkedIn post about it reaches 10,000+ people. That is marketing I could not buy.

**3. The real money is in what comes next.**

IndianWhisper is a tool. The skills I demonstrated building it — shipping production Swift apps, Next.js websites, Chrome extensions, auto-update systems — those skills are worth Rs.3 lakh/month to the right client.

**4. Open source compounds.**

When you give something away, people contribute. They find bugs. They suggest features. They share it with their network. One free tool creates more value than a hundred paid-but-unused products.

### What I Actually Shipped

In one session, here is what got built:

**Mac App (Swift):**
- 14 source files, WhisperKit 0.9.0+
- 5 Whisper models (75MB to 3GB)
- Auto-type via CGEvent — works in any app
- Smart punctuation and voice commands
- Hindi/Hinglish support
- 7-provider LLM text cleanup
- Auto-update system with version checking
- 2MB DMG, macOS 14+

**Website (Next.js 16):**
- Premium dark UI with animated light streaks
- Live voice demo (browser, no install)
- ROI calculator showing time and money saved
- SEO-optimized blog posts
- Feedback form with voice input
- Model comparison table
- Download with Gatekeeper bypass instructions

**Chrome Extension:**
- Floating mic button on every webpage
- Works on Gmail, Slack, Docs, LinkedIn — any text field
- Smart punctuation support
- Keyboard shortcut (Ctrl+Shift+S)
- Under 50KB, zero performance impact
- Submitted to Chrome Web Store

### The Response

I posted on LinkedIn: "I paid Rs. 3,800 for a voice typing app. Then I built a better one. For free."

Within 48 hours:
- People started downloading and testing
- Comments asking for Windows and Android versions
- Sales teams started using it
- Students in my bootcamp adopted it

The demand validated what I already knew: **people want voice input, they just do not want to pay $600/year for it.**

### What Is Next

The roadmap is clear:

1. **Chrome Extension** — submitted, launching this week. Works on every OS.
2. **Windows** — native app for developers on Windows
3. **Android** — APK download, no Play Store needed
4. **iOS** — PWA or App Store when it makes sense

The Mac app plus Chrome extension covers 90% of use cases. If you can open Chrome, you can use IndianWhisper. On any device. For free.

### The Lesson

**Do not compete on features. Compete on access.**

Wispr is a more polished product than IndianWhisper. They have a dedicated team, years of refinement, better error correction. I am not going to pretend otherwise.

But Wispr costs $600/year. IndianWhisper costs $0. For a student in Bangalore, for a freelancer in Lagos, for a developer in Jakarta — that difference is everything.

The best product is not always the most polished. Sometimes it is the one that is available.

### Try It

- **Website:** [indianwhisper.com](https://indianwhisper.com)
- **Mac Download:** [Direct DMG](https://indianwhisper.com/releases/IndianWhisper-v1.0.0.dmg)
- **Chrome Extension:** Coming this week
- **Live Demo:** [Try in browser](https://indianwhisper.com/#try-it) — no install needed
- **GitHub:** [Open source](https://github.com/aiagentwithdhruv/indian-whisper)

Your voice is faster than your fingers. Stop paying for that privilege.`,
  },
];
