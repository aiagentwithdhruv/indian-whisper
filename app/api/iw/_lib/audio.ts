// Duration of an uploaded clip, so the 60 s abuse cap is enforced on real seconds
// rather than on bytes (bytes vary 10x between WAV and a compressed container).

/// Fallback assumption when we can't read a header: the format both clients
/// actually send — 16 kHz mono 16-bit PCM (GroqTranscriptionService.createWAV).
const FALLBACK_BYTES_PER_SECOND = 16000 * 2;

/// Reads `fmt ` + `data` from a RIFF/WAVE header. Returns null for anything that
/// isn't a WAV, so the caller can fall back instead of rejecting a valid upload.
export function wavDurationSeconds(bytes: Uint8Array): number | null {
  if (bytes.length < 44) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tag = (o: number) => String.fromCharCode(...bytes.subarray(o, o + 4));
  if (tag(0) !== "RIFF" || tag(8) !== "WAVE") return null;

  let byteRate = 0;
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const id = tag(offset);
    const size = view.getUint32(offset + 4, true);
    const body = offset + 8;

    if (id === "fmt " && size >= 16 && body + 16 <= bytes.length) {
      byteRate = view.getUint32(body + 8, true);
    } else if (id === "data") {
      if (byteRate <= 0) return null;
      // A streamed WAV can carry size 0 or 0xFFFFFFFF; trust the real remainder.
      const actual = Math.min(size || Infinity, bytes.length - body);
      return actual / byteRate;
    }

    offset = body + size + (size % 2); // RIFF chunks are word-aligned
  }
  return null;
}

/// 🔴 BEFORE SWITCHING THE CLIENT TO COMPRESSED AUDIO (IW-A20b), FIX THIS.
/// The byte-rate assumption below is for 16 kHz mono 16-bit PCM (~32 kB/s). Opus/WebM is
/// roughly 6 kB/s, so a 45 s Opus segment would meter as ~8 s: the free tier would
/// under-charge ~6x and MAX_AUDIO_SECONDS would stop protecting anything. Found in the
/// 20 Sep 2026 architecture audit. Either read the real duration from the container
/// header, or branch the rate on the declared mime type — do not ship A20b without one.
export function estimateSeconds(bytes: Uint8Array): number {
  return wavDurationSeconds(bytes) ?? bytes.length / FALLBACK_BYTES_PER_SECOND;
}
