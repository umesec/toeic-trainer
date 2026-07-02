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
  /** 音声変化の学習ルール数（詳細画面を開く/ディクテーション） */
  listening: number;
  /** 1日の目安時間（分） */
  estMinutes: number;
}

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

/** 1日あたりに必要なスコア上げ幅から学習強度を決める */
export function intensityOf(plan: StudyPlan, today: string): Intensity {
  const gap = Math.max(0, plan.targetScore - plan.currentScore);
  const days = Math.max(1, daysUntilExam(plan, today));
  const pointsPerDay = gap / days;
  if (pointsPerDay < 2) return 'light';
  if (pointsPerDay <= 5) return 'normal';
  return 'intense';
}

/** 学習期間を 語彙固め40% → 演習40% → 直前総仕上げ20% の3フェーズに分割 */
export function buildPhases(plan: StudyPlan): Phase[] {
  const total = Math.max(3, daysBetween(plan.startDate, plan.examDate));
  const p1End = Math.max(1, Math.round(total * 0.4));
  const p2End = Math.max(p1End + 1, Math.round(total * 0.8));

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
      name: '語彙固め期',
      focus: '新規単語を中心にインプット。毎日の単語カードを最優先',
      from: plan.startDate,
      to: add(p1End - 1),
    },
    {
      id: 'practice',
      name: '演習期',
      focus: 'Part 5形式のクイズで文法・語彙をアウトプット練習',
      from: add(p1End),
      to: add(p2End - 1),
    },
    {
      id: 'final',
      name: '直前総仕上げ期',
      focus: '単語は復習中心に切り替え、音声変化とディクテーションで耳を仕上げる',
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
    light: { cards: 20, quiz: 5, listening: 1 },
    normal: { cards: 30, quiz: 10, listening: 1 },
    intense: { cards: 40, quiz: 10, listening: 1 },
  },
  practice: {
    light: { cards: 15, quiz: 10, listening: 1 },
    normal: { cards: 20, quiz: 15, listening: 1 },
    intense: { cards: 25, quiz: 20, listening: 2 },
  },
  final: {
    light: { cards: 10, quiz: 10, listening: 2 },
    normal: { cards: 15, quiz: 15, listening: 2 },
    intense: { cards: 20, quiz: 20, listening: 2 },
  },
};

/** 今日の学習メニューを算出 */
export function dailyQuota(plan: StudyPlan, today: string): DailyQuota {
  const base = QUOTA_TABLE[currentPhase(plan, today).id][intensityOf(plan, today)];
  const estMinutes = Math.round(base.cards * 0.5 + base.quiz * 1 + base.listening * 5);
  return { ...base, estMinutes };
}

export const TARGET_SCORES = [500, 600, 700, 800, 900] as const;
export const CURRENT_SCORES = [300, 400, 500, 600, 700, 800] as const;
