import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StudyPlan } from '@/lib/plan';
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

/** 学習アクションのたびに該当カウンタを加算する */
export async function bumpDaily(today: string, field: keyof DayLog, n = 1): Promise<DayLog> {
  const map = await getJSON<DailyLogMap>(KEYS.dailyLog, {});
  const day = { ...(map[today] ?? EMPTY_DAY) };
  day[field] += n;
  map[today] = day;
  await setJSON(KEYS.dailyLog, map);
  return day;
}
