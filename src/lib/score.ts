/**
 * 正答率からTOEICスコア（L/R各5〜495）を推定するロジック。
 * 公式の換算表を近似した区分線形マッピング。あくまで目安であり公式スコアの保証ではない。
 */

export interface ScoreEstimate {
  listening: number;
  reading: number;
  total: number;
  /** 推定の不確かさ（±この点数程度のブレがある目安） */
  margin: number;
}

/** 区分線形補間: 正答率(0〜1) → スケールスコア */
function interpolate(points: [number, number][], rate: number): number {
  const r = Math.min(1, Math.max(0, rate));
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (r <= x1) {
      return y0 + ((r - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return points[points.length - 1][1];
}

// 同じ正答率でもリスニングの方がやや高得点になる実態を反映
const LISTENING_CURVE: [number, number][] = [
  [0, 5],
  [0.25, 110],
  [0.5, 250],
  [0.75, 390],
  [0.9, 465],
  [1, 495],
];

const READING_CURVE: [number, number][] = [
  [0, 5],
  [0.25, 90],
  [0.5, 220],
  [0.75, 360],
  [0.9, 445],
  [1, 495],
];

const round5 = (n: number) => Math.round(n / 5) * 5;
const clampScore = (n: number) => Math.min(495, Math.max(5, n));

/**
 * 二項分布の標準誤差をスコアスケール（幅490点）に射影した不確かさ。
 * 問題数 n が多いほど margin は小さくなる。
 */
function sectionMargin(rate: number, n: number): number {
  if (n <= 0) return 245;
  const p = Math.min(0.95, Math.max(0.05, rate));
  return 490 * Math.sqrt((p * (1 - p)) / n);
}

export function estimateScore(
  lCorrect: number,
  lTotal: number,
  rCorrect: number,
  rTotal: number
): ScoreEstimate {
  const lRate = lTotal > 0 ? lCorrect / lTotal : 0;
  const rRate = rTotal > 0 ? rCorrect / rTotal : 0;

  const listening = clampScore(round5(interpolate(LISTENING_CURVE, lRate)));
  const reading = clampScore(round5(interpolate(READING_CURVE, rRate)));

  // L/R の不確かさを合成（独立とみなし二乗和平方根）し、5点刻みに丸める
  const margin = round5(
    Math.sqrt(sectionMargin(lRate, lTotal) ** 2 + sectionMargin(rRate, rTotal) ** 2)
  );

  return { listening, reading, total: listening + reading, margin: Math.max(5, margin) };
}
