import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StudyPlan } from '@/lib/plan';
// 注: reminders.ts からの storage 参照は型のみなのでランタイム循環はない
import { syncReminders } from '@/lib/reminders';
import { addDays, type CardState } from '@/lib/srs';

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
}

export type DailyLogMap = Record<string, DayLog>;

const EMPTY_DAY: DayLog = { cards: 0, quiz: 0, listening: 0 };

export async function loadDayLog(today: string): Promise<DayLog> {
  const map = await getJSON<DailyLogMap>(KEYS.dailyLog, {});
  return map[today] ?? { ...EMPTY_DAY };
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
  const day = { ...(map[today] ?? EMPTY_DAY) };
  day[field] += n;
  map[today] = day;
  await setJSON(KEYS.dailyLog, map);
  scheduleReminderSync(today);
  return day;
}

/** 統計グラフ用に全日分のログを返す */
export const loadDailyLogMap = () => getJSON<DailyLogMap>(KEYS.dailyLog, {});

/* ---------- 間違いノート ---------- */

export type MistakeKind = 'part2' | 'part34' | 'part5' | 'part6' | 'part7';

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

export async function clearMistakes(): Promise<void> {
  await setJSON(KEYS.mistakes, []);
}

/* ---------- 設定 ---------- */

export interface AppSettings {
  /** 読み上げ速度の倍率（0.8 / 1.0 / 1.2） */
  speechRateScale: number;
  /** 今日のメニュー未消化時の19時リマインド通知 */
  remindEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = { speechRateScale: 1.0, remindEnabled: true };

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
