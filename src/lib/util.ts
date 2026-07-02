/** Fisher-Yates シャッフル（元配列は変更しない） */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * text を focus の前後で3分割する（ハイライト表示用）。
 * focus が見つからない場合は [text, '', ''] を返す。
 */
export function splitByFocus(text: string, focus: string): [string, string, string] {
  const idx = text.toLowerCase().indexOf(focus.toLowerCase());
  if (idx < 0) return [text, '', ''];
  return [text.slice(0, idx), text.slice(idx, idx + focus.length), text.slice(idx + focus.length)];
}

/** ディクテーション比較用の正規化（小文字化・記号除去・空白圧縮） */
export function normalizeSentence(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
