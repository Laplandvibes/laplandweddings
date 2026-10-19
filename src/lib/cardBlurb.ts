/**
 * Card blurb: whole sentences from the start of a longer text, never a cut word.
 *
 * Vesa 19.10.2026, looking at the front page: texts that stop at "…" with no way
 * to read on look broken. A card shows the first sentence(s) that fit `max`
 * characters (CJK counts double), and at least one sentence even if it is longer.
 *
 * A boundary is a full stop / ! / ? followed by a space and an upper-case letter
 * (or, in Korean, any letter), or a CJK full stop. That skips Finnish ordinals
 * ("joka 15. joulukuuta"), decimals and lower-case abbreviations ("n. 15 km").
 */
const CJK = /[぀-ヿ㐀-鿿가-힯]/;

function weight(s: string): number {
  let n = 0;
  for (const ch of s) n += CJK.test(ch) ? 2 : 1;
  return n;
}

export function splitSentences(text: string): string[] {
  const t = text.trim();
  const out: string[] = [];
  let start = 0;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (ch === '。' || ch === '！' || ch === '？') {
      out.push(t.slice(start, i + 1).trim());
      start = i + 1;
      continue;
    }
    if ((ch === '.' || ch === '!' || ch === '?') && t[i + 1] === ' ') {
      const next = t[i + 2] ?? '';
      const prev = t[i - 1] ?? '';
      if (/\d/.test(prev)) continue;
      const upper = /\p{Lu}/u.test(next);
      const hangul = /[가-힯]/.test(next);
      if (!upper && !hangul) continue;
      out.push(t.slice(start, i + 1).trim());
      start = i + 2;
    }
  }
  const rest = t.slice(start).trim();
  if (rest) out.push(rest);
  return out;
}

export function cardBlurb(text: string, max = 150): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return '';
  let blurb = sentences[0];
  for (let i = 1; i < sentences.length; i++) {
    const joiner = /[。！？]$/.test(blurb) ? '' : ' ';
    const next = blurb + joiner + sentences[i];
    // A one-line opener ("Finnlands berühmtestes Glasiglu-Resort.") says too little
    // on its own, so a short blurb may take one more sentence up to 1.25 × max.
    const limit = weight(blurb) < max * 0.45 ? max * 1.25 : max;
    if (weight(next) > limit) break;
    blurb = next;
  }
  return blurb;
}
