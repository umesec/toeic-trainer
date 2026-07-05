import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StudyPlan } from '@/lib/plan';
// 注: reminders.ts からの storage 参照は型のみなのでランタイム循環はない
import { syncReminders } from '@/lib/reminders';
import { addDays, isDue, newCardState, review, type CardState } from '@/lib/srs';

const KEYS = {
  progress: 'srs.progress.v1',
  quizStats: 'quiz.stats.v1',
  quizWrong: 'quiz.wrong.v1',
  customWords: 'words.custom.v1',
  streak: 'streak.v1',
  plan: 'plan.v1',
  dailyLog: 'daily.log.v1',
  tagStats: 'quiz.tagStats.v1',
  mockHistory: 'mock.history.v1',
  mistakes: 'mistakes.v1',
  settings: 'settings.v1',
  paceStats: 'pace.stats.v1',
  partStats: 'part.stats.v1',
  mistakeSrs: 'mistake.srs.v1',
  diagnosisResult: 'diagnosis.result.v1',
  onboardingDone: 'onboarding.done.v1',
  achievements: 'achievements.v1',
  achievementsPending: 'achievements.pending.v1',
  menuCelebrated: 'celebration.menu.v1',
} as const;

async function getJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function setJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 保存失敗は致命的でないため握りつぶす（次回保存で回復）
  }
}

/* ---------- 単語の学習進捗 ---------- */

export type ProgressMap = Record<string, CardState>;

export const loadProgress = () => getJSON<ProgressMap>(KEYS.progress, {});
export const saveProgress = (p: ProgressMap) => setJSON(KEYS.progress, p);

/* ---------- クイズ成績 ---------- */

export interface QuizStats {
  answered: number;
  correct: number;
}

export const loadQuizStats = () => getJSON<QuizStats>(KEYS.quizStats, { answered: 0, correct: 0 });
export const saveQuizStats = (s: QuizStats) => setJSON(KEYS.quizStats, s);

/** 間違えた問題ID（優先的に再出題する） */
export const loadWrongIds = () => getJSON<string[]>(KEYS.quizWrong, []);
export const saveWrongIds = (ids: string[]) => setJSON(KEYS.quizWrong, ids);

/* ---------- 分野別成績（弱点分析） ---------- */

export type TagStatsMap = Record<string, { answered: number; correct: number }>;

export const loadTagStats = () => getJSON<TagStatsMap>(KEYS.tagStats, {});

export async function recordTagAnswer(tag: string, correct: boolean): Promise<TagStatsMap> {
  const map = await loadTagStats();
  const entry = map[tag] ?? { answered: 0, correct: 0 };
  entry.answered += 1;
  if (correct) entry.correct += 1;
  map[tag] = entry;
  await setJSON(KEYS.tagStats, map);
  return map;
}

/* ---------- ミニ模試の履歴 ---------- */

export interface MockResult {
  date: string;
  listening: number;
  listeningTotal: number;
  reading: number;
  readingTotal: number;
  /** 実力測定モードの推定スコア合計（ミニ模試では undefined） */
  estimatedTotal?: number;
}

export const loadMockHistory = () => getJSON<MockResult[]>(KEYS.mockHistory, []);

export async function addMockResult(result: MockResult): Promise<void> {
  const history = await loadMockHistory();
  history.push(result);
  await setJSON(KEYS.mockHistory, history.slice(-20));
}

/* ---------- ユーザー追加単語 ---------- */

export interface CustomWord {
  id: string;
  word: string;
  meaning: string;
  example?: string;
  exampleJa?: string;
}

export const loadCustomWords = () => getJSON<CustomWord[]>(KEYS.customWords, []);
export const saveCustomWords = (words: CustomWord[]) => setJSON(KEYS.customWords, words);

/* ---------- 連続学習日数 ---------- */

export interface Streak {
  lastDay: string;
  count: number;
}

export const loadStreak = () => getJSON<Streak>(KEYS.streak, { lastDay: '', count: 0 });

/** 学習アクション時に呼ぶ。昨日から継続なら+1、途切れていたら1にリセット */
export async function recordStudy(today: string): Promise<Streak> {
  const s = await loadStreak();
  if (s.lastDay === today) return s;
  const next: Streak = {
    lastDay: today,
    count: s.lastDay === addDays(today, -1) ? s.count + 1 : 1,
  };
  await setJSON(KEYS.streak, next);
  return next;
}

/* ---------- 学習プラン ---------- */

export const loadPlan = () => getJSON<StudyPlan | null>(KEYS.plan, null);
export const savePlan = (p: StudyPlan) => setJSON(KEYS.plan, p);

export async function clearPlan(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEYS.plan);
  } catch {
    // 失敗しても致命的でない
  }
}

/* ---------- 日次学習ログ（今日のメニュー消化状況） ---------- */

export interface DayLog {
  cards: number;
  quiz: number;
  listening: number;
  /** Part 6/7 の読解セット数 */
  reading: number;
}

export type DailyLogMap = Record<string, DayLog>;

const EMPTY_DAY: DayLog = { cards: 0, quiz: 0, listening: 0, reading: 0 };

export async function loadDayLog(today: string): Promise<DayLog> {
  const map = await getJSON<DailyLogMap>(KEYS.dailyLog, {});
  // 保存済みJSONに新フィールド(reading)が無い場合に備えて EMPTY_DAY とマージする
  return { ...EMPTY_DAY, ...map[today] };
}

let reminderTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * 学習記録のたびに呼び、リマインド通知を最新の消化状況へ同期する。
 * クイズ連答などの連続呼び出しをデバウンスでまとめる。
 * どのタブで学習してもホームに戻らずに通知が更新されるよう、bumpDaily に組み込む。
 */
function scheduleReminderSync(today: string) {
  if (reminderTimer) clearTimeout(reminderTimer);
  reminderTimer = setTimeout(async () => {
    const [plan, settings, log] = await Promise.all([loadPlan(), loadSettings(), loadDayLog(today)]);
    syncReminders(settings.remindEnabled, plan, log).catch(() => {});
  }, 2500);
}

/** 学習アクションのたびに該当カウンタを加算する */
export async function bumpDaily(today: string, field: keyof DayLog, n = 1): Promise<DayLog> {
  const map = await getJSON<DailyLogMap>(KEYS.dailyLog, {});
  // EMPTY_DAY を先に展開し、旧フォーマットの保存データに無いフィールドを 0 で補う
  const day = { ...EMPTY_DAY, ...map[today] };
  day[field] += n;
  map[today] = day;
  await setJSON(KEYS.dailyLog, map);
  scheduleReminderSync(today);
  return day;
}

/**
 * 学習アクション記録の定型セット（日次ログ加算 + 連続学習日数の更新）。
 * ほぼ全ての学習画面で `bumpDaily` と `recordStudy` はこの2点セットで呼ばれるため、
 * 呼び出し側の重複を避けるためにまとめたショートハンド。
 */
export async function bumpStudy(field: keyof DayLog, today: string, n = 1): Promise<void> {
  await bumpDaily(today, field, n);
  await recordStudy(today);
}

/** 統計グラフ用に全日分のログを返す */
export const loadDailyLogMap = () => getJSON<DailyLogMap>(KEYS.dailyLog, {});

/* ---------- 間違いノート ---------- */

export type MistakeKind = 'part1' | 'part2' | 'part34' | 'part5' | 'part6' | 'part7';

export interface MistakeEntry {
  /** 問題の一意ID。セット問題は `${setId}:${questionIndex}` 形式 */
  id: string;
  kind: MistakeKind;
  addedAt: string;
  wrongCount: number;
}

export const loadMistakes = () => getJSON<MistakeEntry[]>(KEYS.mistakes, []);

export async function recordMistake(kind: MistakeKind, id: string, today: string): Promise<void> {
  const list = await loadMistakes();
  const existing = list.find((m) => m.id === id && m.kind === kind);
  if (existing) {
    existing.wrongCount += 1;
  } else {
    list.push({ id, kind, addedAt: today, wrongCount: 1 });
  }
  await setJSON(KEYS.mistakes, list);
}

export async function removeMistake(kind: MistakeKind, id: string): Promise<MistakeEntry[]> {
  const list = (await loadMistakes()).filter((m) => !(m.id === id && m.kind === kind));
  await setJSON(KEYS.mistakes, list);
  return list;
}

/* ---------- 間違いノート SRS（SM-2 ベース） ---------- */

export type MistakeSrsMap = Record<string, CardState>;

const mistakeSrsKey = (kind: MistakeKind, id: string) => `${kind}:${id}`;

export const loadMistakeSrs = () => getJSON<MistakeSrsMap>(KEYS.mistakeSrs, {});

export async function isMistakeDue(kind: MistakeKind, id: string, today: string): Promise<boolean> {
  const map = await loadMistakeSrs();
  const key = mistakeSrsKey(kind, id);
  return isDue(map[key], today);
}

export async function reviewMistakeCard(
  kind: MistakeKind,
  id: string,
  correct: boolean,
  today: string
): Promise<void> {
  const map = await loadMistakeSrs();
  const key = mistakeSrsKey(kind, id);
  const prev = map[key] ?? newCardState(today);
  map[key] = review(prev, correct ? 'good' : 'again', today);
  await setJSON(KEYS.mistakeSrs, map);
}

export async function clearMistakes(): Promise<void> {
  await setJSON(KEYS.mistakes, []);
}

/* ---------- 解答ペース統計（平均解答時間） ---------- */

export interface PaceEntry { totalMs: number; count: number }
export type PaceStatsMap = Record<string, PaceEntry>;

export const loadPaceStats = () => getJSON<PaceStatsMap>(KEYS.paceStats, {});

export async function recordPaceAnswer(kind: string, ms: number): Promise<void> {
  const map = await loadPaceStats();
  const e = map[kind] ?? { totalMs: 0, count: 0 };
  map[kind] = { totalMs: e.totalMs + ms, count: e.count + 1 };
  await setJSON(KEYS.paceStats, map);
}

/* ---------- Part別正答率統計 ---------- */

export type PartStatsMap = Record<string, { answered: number; correct: number }>;

export const loadPartStats = () => getJSON<PartStatsMap>(KEYS.partStats, {});

export async function recordPartAnswer(kind: string, correct: boolean): Promise<void> {
  const map = await loadPartStats();
  const e = map[kind] ?? { answered: 0, correct: 0 };
  e.answered += 1;
  if (correct) e.correct += 1;
  map[kind] = e;
  await setJSON(KEYS.partStats, map);
}

/* ---------- 設定 ---------- */

export interface AppSettings {
  /** 読み上げ速度の倍率（0.8 / 1.0 / 1.2） */
  speechRateScale: number;
  /** 今日のメニュー未消化時の19時リマインド通知 */
  remindEnabled: boolean;
  /** リスニング音声のアクセントMIX（米/英/豪をランダムに使い分け。本番と同じ耳を作る） */
  accentMix: boolean;
}

const DEFAULT_SETTINGS: AppSettings = { speechRateScale: 1.0, remindEnabled: true, accentMix: true };

export const loadSettings = async (): Promise<AppSettings> => ({
  ...DEFAULT_SETTINGS,
  ...(await getJSON<Partial<AppSettings>>(KEYS.settings, {})),
});

export const saveSettings = (s: AppSettings) => setJSON(KEYS.settings, s);

/* ---------- バックアップ（エクスポート/インポート/リセット） ---------- */

const ALL_KEYS = Object.values(KEYS);

export async function exportAll(): Promise<string> {
  const data: Record<string, string> = {};
  for (const key of ALL_KEYS) {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw !== null) data[key] = raw;
    } catch {
      // 読めないキーはスキップ
    }
  }
  return JSON.stringify({ app: 'toeic-trainer', version: 1, data });
}

/** エクスポートJSONを取り込む。形式が不正なら false */
export async function importAll(json: string): Promise<boolean> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return false;
  }
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    (parsed as { app?: string }).app !== 'toeic-trainer' ||
    typeof (parsed as { data?: unknown }).data !== 'object'
  ) {
    return false;
  }
  const data = (parsed as { data: Record<string, string> }).data;
  for (const key of ALL_KEYS) {
    if (typeof data[key] === 'string') {
      try {
        await AsyncStorage.setItem(key, data[key]);
      } catch {
        return false;
      }
    }
  }
  return true;
}

export async function resetAll(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(ALL_KEYS);
  } catch {
    // 失敗しても致命的でない
  }
}

/* ---------- 診断テスト結果 ---------- */

export interface DiagnosisResult {
  estimatedTotal: number;
  listening: number;
  reading: number;
  date: string;
}

export const loadDiagnosisResult = () => getJSON<DiagnosisResult | null>(KEYS.diagnosisResult, null);
export const saveDiagnosisResult = (r: DiagnosisResult) => setJSON(KEYS.diagnosisResult, r);

/* ---------- オンボーディング ---------- */

export const loadOnboardingDone = () => getJSON<boolean>(KEYS.onboardingDone, false);
export const saveOnboardingDone = () => setJSON(KEYS.onboardingDone, true);

/* ---------- 実績・お祝い演出 ---------- */

/** 解除済み実績: 実績ID → 解除日(YYYY-MM-DD) */
export type AchievementMap = Record<string, string>;

export const loadAchievementMap = () => getJSON<AchievementMap>(KEYS.achievements, {});
export const saveAchievementMap = (m: AchievementMap) => setJSON(KEYS.achievements, m);

/**
 * まだお祝い演出を表示していない解除済み実績ID。
 * 表示時ではなく「ユーザーが閉じた時」にクリアすることで、
 * 開発モードの二重マウントや画面遷移をまたいでも取りこぼさない。
 */
export const loadPendingAchievements = () => getJSON<string[]>(KEYS.achievementsPending, []);
export const savePendingAchievements = (ids: string[]) => setJSON(KEYS.achievementsPending, ids);

/** 今日のメニュー完遂のお祝いを表示済みの日付（1日1回だけ祝う） */
export const loadMenuCelebratedDay = () => getJSON<string>(KEYS.menuCelebrated, '');
export const saveMenuCelebratedDay = (day: string) => setJSON(KEYS.menuCelebrated, day);
