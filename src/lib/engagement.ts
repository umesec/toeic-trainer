/**
 * 継続モチベーション系のロジック（実績チェック・応援メッセージ）。
 */

import {
  ACHIEVEMENTS,
  evaluateAchievements,
  type AchievementDef,
  type AchievementInput,
} from '@/lib/achievements';
import { classifyWordCounts } from '@/lib/srs';
import { WORDS } from '@/data/words';
import {
  loadAchievementMap,
  loadCustomWords,
  loadDailyLogMap,
  loadDiagnosisResult,
  loadMockHistory,
  loadPendingAchievements,
  loadProgress,
  loadQuizStats,
  loadStreak,
  saveAchievementMap,
  savePendingAchievements,
} from '@/lib/storage';

/**
 * 現在の学習データから実績を評価し、新規解除分を保存して返す。
 * ホーム/マイページのフォーカス時に呼ぶ。
 */
export async function syncAchievements(today: string): Promise<AchievementDef[]> {
  const [streak, progress, customWords, quizStats, logMap, mockHistory, diagnosis, unlockedMap] =
    await Promise.all([
      loadStreak(),
      loadProgress(),
      loadCustomWords(),
      loadQuizStats(),
      loadDailyLogMap(),
      loadMockHistory(),
      loadDiagnosisResult(),
      loadAchievementMap(),
    ]);

  const ids = [...WORDS.map((w) => w.id), ...customWords.map((c) => c.id)];
  const counts = classifyWordCounts(ids, progress, today);

  let totalActions = 0;
  let readingSets = 0;
  let listeningCount = 0;
  for (const d of Object.values(logMap)) {
    totalActions += d.cards + d.quiz + d.listening + (d.reading ?? 0);
    readingSets += d.reading ?? 0;
    listeningCount += d.listening;
  }

  const scores = mockHistory
    .map((h) => h.estimatedTotal)
    .filter((s): s is number => s !== undefined);

  const input: AchievementInput = {
    streakCount: streak.count,
    masteredWords: counts.mastered,
    quizAnswered: quizStats.answered,
    totalActions,
    readingSets,
    listeningCount,
    mockCount: mockHistory.length,
    bestScore: scores.length > 0 ? Math.max(...scores) : null,
    // 200問形式（本番フル模試）の完走判定。多少の欠落を許容して195問以上とする
    examTaken: mockHistory.some((h) => h.listeningTotal + h.readingTotal >= 195),
    diagnosisDone: diagnosis !== null,
  };

  const satisfied = evaluateAchievements(input);
  const fresh = satisfied.filter((id) => !unlockedMap[id]);
  if (fresh.length > 0) {
    const next = { ...unlockedMap };
    for (const id of fresh) next[id] = today;
    await saveAchievementMap(next);
    // お祝い待ちキューへ追加（表示側がユーザーの操作で消すまで残す）
    const pending = await loadPendingAchievements();
    await savePendingAchievements([...new Set([...pending, ...fresh])]);
  }
  return ACHIEVEMENTS.filter((a) => fresh.includes(a.id));
}

const CHEER_MESSAGES = [
  '今日の一歩が、試験当日の自信になる 💪',
  '単語ひとつ覚えるたび、リスニングが少し楽になる 🎧',
  '継続は才能を超える。今日も積み上げよう 🔥',
  '5分でもいい。ゼロの日を作らないことが最強の戦略 🚀',
  '昨日の自分より1問多く正解しよう ✅',
  'スコアは裏切らない努力の記録 📈',
  '休むのも実力のうち。でも単語カード10枚だけどう？ 😉',
  '間違えた問題こそ、スコアが伸びる場所 📓',
  'リーディングは筋トレ。毎日の1セットが速読を作る 📰',
  '耳は毎日鍛えると忘れない。1本だけ聞いてみよう 🎙️',
];

/** 日付から決定的に応援メッセージを選ぶ（同じ日は同じメッセージ） */
export function cheerOfTheDay(today: string): string {
  let hash = 0;
  for (let i = 0; i < today.length; i++) hash = (hash * 31 + today.charCodeAt(i)) | 0;
  return CHEER_MESSAGES[Math.abs(hash) % CHEER_MESSAGES.length];
}

/** 時間帯に応じた挨拶 */
export function greetingForHour(hour: number): string {
  if (hour >= 5 && hour < 11) return 'おはようございます ☀️';
  if (hour >= 11 && hour < 18) return 'こんにちは 👋';
  return 'こんばんは 🌙';
}
