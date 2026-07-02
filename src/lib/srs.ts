/**
 * SM-2 簡易版の間隔反復（SRS）アルゴリズム。
 * 日付は YYYY-MM-DD の文字列で受け渡しし、Date への依存を境界に閉じ込める（テスト容易性のため）。
 */

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface CardState {
  /** 連続正解数（again でリセット） */
  reps: number;
  /** 難易度係数 1.3〜3.0 */
  ease: number;
  /** 現在の出題間隔（日） */
  interval: number;
  /** 次回出題日 YYYY-MM-DD */
  due: string;
}

const EASE_MIN = 1.3;
const EASE_MAX = 3.0;

const clampEase = (e: number) => Math.min(EASE_MAX, Math.max(EASE_MIN, e));

export function newCardState(today: string): CardState {
  return { reps: 0, ease: 2.5, interval: 0, due: today };
}

export function review(prev: CardState, grade: Grade, today: string): CardState {
  if (grade === 'again') {
    // 同日中に再出題
    return { reps: 0, ease: clampEase(prev.ease - 0.2), interval: 0, due: today };
  }

  const ease = clampEase(prev.ease + (grade === 'hard' ? -0.15 : grade === 'easy' ? 0.15 : 0));

  let interval: number;
  if (prev.reps === 0) {
    interval = grade === 'easy' ? 4 : 1;
  } else if (prev.reps === 1) {
    interval = grade === 'hard' ? 4 : 6;
  } else {
    const factor = (grade === 'hard' ? 1.2 : ease) * (grade === 'easy' ? 1.3 : 1);
    interval = Math.max(prev.interval + 1, Math.round(prev.interval * factor));
  }

  return { reps: prev.reps + 1, ease, interval, due: addDays(today, interval) };
}

/** 未学習カード（state なし）は常に due 扱い */
export function isDue(state: CardState | undefined, today: string): boolean {
  return !state || state.due <= today;
}

/** ローカルタイムゾーンでの今日を YYYY-MM-DD で返す */
export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number);
  // タイムゾーンずれを避けるため UTC 正午で計算
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  date.setUTCDate(date.getUTCDate() + n);
  const yy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}
