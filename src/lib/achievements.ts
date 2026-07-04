/**
 * 実績（バッジ）システムの定義と判定ロジック。
 * 判定は純関数にして、学習データのスナップショットから解除済みIDを返す。
 */

export interface AchievementDef {
  id: string;
  emoji: string;
  title: string;
  /** 解除条件の説明（ロック中にも表示する） */
  desc: string;
}

/** 判定に使う学習データのスナップショット */
export interface AchievementInput {
  /** 連続学習日数 */
  streakCount: number;
  /** 定着(interval>=21)した単語数 */
  masteredWords: number;
  /** クイズ累計回答数 */
  quizAnswered: number;
  /** 日次ログ全期間の学習アクション合計（cards+quiz+listening+reading） */
  totalActions: number;
  /** 読解セット累計 */
  readingSets: number;
  /** リスニング累計回数 */
  listeningCount: number;
  /** 模試受験回数 */
  mockCount: number;
  /** 模試の推定スコア最高値（なければ null） */
  bestScore: number | null;
  /** 200問の本番フル模試を完走したか */
  examTaken: boolean;
  /** 診断テストを受けたか */
  diagnosisDone: boolean;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first-step', emoji: '🌱', title: 'はじめの一歩', desc: '初めて学習する' },
  { id: 'streak-3', emoji: '🔥', title: '3日坊主卒業', desc: '3日連続で学習する' },
  { id: 'streak-7', emoji: '🚀', title: '1週間継続', desc: '7日連続で学習する' },
  { id: 'streak-30', emoji: '🌟', title: '習慣の完成', desc: '30日連続で学習する' },
  { id: 'streak-100', emoji: '👑', title: '百日の道', desc: '100日連続で学習する' },
  { id: 'words-50', emoji: '📖', title: '単語コレクター', desc: '単語を50語定着させる' },
  { id: 'words-300', emoji: '📚', title: '語彙の壁を越えろ', desc: '単語を300語定着させる' },
  { id: 'words-1000', emoji: '🧠', title: '歩く辞書', desc: '単語を1000語定着させる' },
  { id: 'quiz-100', emoji: '✏️', title: 'クイズ百戦', desc: 'クイズに累計100問回答する' },
  { id: 'quiz-500', emoji: '⚔️', title: 'クイズ五百戦', desc: 'クイズに累計500問回答する' },
  { id: 'listening-50', emoji: '🎧', title: 'イヤートレーナー', desc: 'リスニング練習を累計50回行う' },
  { id: 'reading-30', emoji: '📰', title: '速読ランナー', desc: '読解を累計30セット解く' },
  { id: 'actions-1000', emoji: '💪', title: '千本ノック', desc: '累計1000回学習アクションを行う' },
  { id: 'diagnosis', emoji: '🩺', title: '自分を知る', desc: '診断テストを受ける' },
  { id: 'first-mock', emoji: '📈', title: '腕試し', desc: '模試を初めて受ける' },
  { id: 'exam-full', emoji: '🏃', title: 'フルマラソン完走', desc: '200問の本番フル模試を完走する' },
  { id: 'score-700', emoji: '🥉', title: '700点の景色', desc: '模試で推定700点以上を出す' },
  { id: 'score-800', emoji: '🥈', title: '800点の高み', desc: '模試で推定800点以上を出す' },
  { id: 'score-900', emoji: '🥇', title: '900点クラブ', desc: '模試で推定900点以上を出す' },
];

/** スナップショットから解除条件を満たしている実績IDの一覧を返す */
export function evaluateAchievements(input: AchievementInput): string[] {
  const unlocked: string[] = [];
  const add = (id: string, cond: boolean) => {
    if (cond) unlocked.push(id);
  };
  add('first-step', input.totalActions > 0 || input.streakCount > 0);
  add('streak-3', input.streakCount >= 3);
  add('streak-7', input.streakCount >= 7);
  add('streak-30', input.streakCount >= 30);
  add('streak-100', input.streakCount >= 100);
  add('words-50', input.masteredWords >= 50);
  add('words-300', input.masteredWords >= 300);
  add('words-1000', input.masteredWords >= 1000);
  add('quiz-100', input.quizAnswered >= 100);
  add('quiz-500', input.quizAnswered >= 500);
  add('listening-50', input.listeningCount >= 50);
  add('reading-30', input.readingSets >= 30);
  add('actions-1000', input.totalActions >= 1000);
  add('diagnosis', input.diagnosisDone);
  add('first-mock', input.mockCount >= 1);
  add('exam-full', input.examTaken);
  add('score-700', input.bestScore !== null && input.bestScore >= 700);
  add('score-800', input.bestScore !== null && input.bestScore >= 800);
  add('score-900', input.bestScore !== null && input.bestScore >= 900);
  return unlocked;
}
