/**
 * 目標スコア・試験日から学習プログラムを組み立てるロジック。
 * 日付は YYYY-MM-DD 文字列で受け渡す（srs.ts と同じ流儀）。
 */

export interface StudyPlan {
  targetScore: number;
  /** 現在の推定スコア（未受験なら目安でOK） */
  currentScore: number;
  /** 試験日 YYYY-MM-DD */
  examDate: string;
  /** プラン開始日 YYYY-MM-DD */
  startDate: string;
}

export type Intensity = 'light' | 'normal' | 'intense';

export type PhaseId = 'foundation' | 'practice' | 'final';

export interface Phase {
  id: PhaseId;
  name: string;
  focus: string;
  /** 開始日・終了日（両端含む） */
  from: string;
  to: string;
}

export interface DailyQuota {
  /** 単語カード（復習+新規）の枚数 */
  cards: number;
  /** クイズ問題数 */
  quiz: number;
  /** リスニング練習のセット数 */
  listening: number;
  /** Part 6/7 読解のセット数 */
  reading: number;
  /** 1日の目安時間（分） */
  estMinutes: number;
}

/**
 * 目標達成の現実的な見込みを表す。
 * 参考値：TOEICは継続的な学習で月20〜30点程度の向上が一般的。
 */
export interface FeasibilityResult {
  /** 必要な1日あたり向上速度（点/日） */
  ptsPerDay: number;
  /** true = 月30点ペース（1pt/day以下）で達成できる現実的な目標 */
  feasible: boolean;
  /** true = 可能だが1日1〜2時間の高い継続が必要（1〜2pt/day） */
  cautious: boolean;
  /** 現実的な1日の学習時間の目安（分）: feasible=60, cautious=90, else=120以上 */
  dailyMinutesNeeded: number;
  /** 月25点ペースで達成するのに必要な月数 */
  suggestedMonths: number;
  /** 試験日までに現実的に到達できるスコアの上限（1.5pt/dayベース、5点刻み、上限990） */
  suggestedScore: number;
}

/** TOEICスコアは5点刻みのため、提案値は必ず5の倍数に丸める */
const round5 = (n: number) => Math.round(n / 5) * 5;

export function daysBetween(from: string, to: string): number {
  const parse = (s: string) => {
    const [y, m, d] = s.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((parse(to) - parse(from)) / 86400000);
}

/** 試験日までの残り日数（試験当日は0） */
export function daysUntilExam(plan: StudyPlan, today: string): number {
  return daysBetween(today, plan.examDate);
}

/** プラン全体の必要向上速度から実現可能性を評価する */
export function feasibilityOf(plan: StudyPlan): FeasibilityResult {
  const gap = Math.max(0, plan.targetScore - plan.currentScore);
  const days = Math.max(1, daysBetween(plan.startDate, plan.examDate));
  const ptsPerDay = gap / days;
  const feasible = ptsPerDay <= 1.0;
  const cautious = ptsPerDay > 1.0 && ptsPerDay <= 2.0;
  const dailyMinutesNeeded = feasible ? 60 : cautious ? 90 : 120;
  const suggestedMonths = Math.max(1, Math.ceil(gap / 25));
  const suggestedScore = Math.min(990, round5(plan.currentScore + days * 1.5));
  return { ptsPerDay, feasible, cautious, dailyMinutesNeeded, suggestedMonths, suggestedScore };
}

/** 1日あたりに必要なスコア上げ幅から学習強度を決める */
export function intensityOf(plan: StudyPlan, today: string): Intensity {
  const gap = Math.max(0, plan.targetScore - plan.currentScore);
  const days = Math.max(1, daysUntilExam(plan, today));
  const ptsPerDay = gap / days;
  if (ptsPerDay < 0.5) return 'light';
  if (ptsPerDay <= 1.5) return 'normal';
  return 'intense';
}

/** 現在スコアから学習の重点を決める */
function scoreBand(currentScore: number): 'low' | 'mid' | 'high' {
  if (currentScore <= 500) return 'low';
  if (currentScore <= 700) return 'mid';
  return 'high';
}

const PHASE_FOCUS: Record<PhaseId, Record<'low' | 'mid' | 'high', string>> = {
  foundation: {
    low: '単語カードで語彙を積み上げ、Part 5「品詞・時制」の基礎文法を固める',
    mid: '苦手タグを絞ってクイズ集中練習。語彙カードも継続して語彙量を増やす',
    high: '間違いノートの SRS 復習を軸に、弱点の徹底洗い出しから始める',
  },
  practice: {
    low: 'Part 5 全タグを横断しながら Part 2/3/4 のリスニングに慣れていく',
    mid: 'Part 6/7 長文読解を毎日練習。速読力と文脈把握力を鍛える',
    high: 'Part 7 ダブル・トリプルパッセージの精度向上。ハーフ模試で時間管理を練習',
  },
  final: {
    low: '単語は復習中心に切り替え。苦手な文法タグを 1 日 1 テーマ集中攻略',
    mid: '模試で時間感覚を整える。音声変化・ディクテーションで聞き取り精度を上げる',
    high: '実力測定モードで本番シミュレーション。間違いノートを丁寧に消化する',
  },
};

/** 学習期間を 語彙固め40% → 演習40% → 直前総仕上げ20% の3フェーズに分割 */
export function buildPhases(plan: StudyPlan): Phase[] {
  const total = Math.max(3, daysBetween(plan.startDate, plan.examDate));
  const p1End = Math.max(1, Math.round(total * 0.4));
  const p2End = Math.max(p1End + 1, Math.round(total * 0.8));
  const band = scoreBand(plan.currentScore);

  const add = (n: number) => {
    const [y, m, d] = plan.startDate.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d + n, 12));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
      date.getUTCDate()
    ).padStart(2, '0')}`;
  };

  return [
    {
      id: 'foundation',
      name: '語彙・基礎固め期',
      focus: PHASE_FOCUS.foundation[band],
      from: plan.startDate,
      to: add(p1End - 1),
    },
    {
      id: 'practice',
      name: '演習・実践期',
      focus: PHASE_FOCUS.practice[band],
      from: add(p1End),
      to: add(p2End - 1),
    },
    {
      id: 'final',
      name: '直前総仕上げ期',
      focus: PHASE_FOCUS.final[band],
      from: add(p2End),
      to: plan.examDate,
    },
  ];
}

export function currentPhase(plan: StudyPlan, today: string): Phase {
  const phases = buildPhases(plan);
  if (today <= phases[0].to) return phases[0];
  if (today <= phases[1].to) return phases[1];
  return phases[2];
}

const QUOTA_TABLE: Record<PhaseId, Record<Intensity, Omit<DailyQuota, 'estMinutes'>>> = {
  foundation: {
    light:   { cards: 20, quiz: 10, listening: 1, reading: 1 },
    normal:  { cards: 35, quiz: 15, listening: 1, reading: 1 },
    intense: { cards: 50, quiz: 20, listening: 2, reading: 1 },
  },
  practice: {
    light:   { cards: 15, quiz: 15, listening: 1, reading: 1 },
    normal:  { cards: 25, quiz: 20, listening: 2, reading: 2 },
    intense: { cards: 35, quiz: 30, listening: 3, reading: 3 },
  },
  final: {
    light:   { cards: 10, quiz: 15, listening: 2, reading: 1 },
    normal:  { cards: 15, quiz: 20, listening: 2, reading: 2 },
    intense: { cards: 20, quiz: 25, listening: 3, reading: 2 },
  },
};

/** 今日の学習メニューを算出 */
export function dailyQuota(plan: StudyPlan, today: string): DailyQuota {
  const base = QUOTA_TABLE[currentPhase(plan, today).id][intensityOf(plan, today)];
  // カード0.5分 / クイズ1.5分（問題読解＋解説） / リスニング10分（Part3/4 1セット相当） / 読解8分（Part6/7 1セット相当）
  const estMinutes = Math.round(
    base.cards * 0.5 + base.quiz * 1.5 + base.listening * 10 + base.reading * 8
  );
  return { ...base, estMinutes };
}

export const TARGET_SCORES = [500, 600, 700, 800, 900, 990] as const;
export const CURRENT_SCORES = [300, 400, 500, 600, 700, 800, 900] as const;
