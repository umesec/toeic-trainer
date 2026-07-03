export interface Word {
  id: string;
  word: string;
  /** 品詞（名/動/形/副 など） */
  pos: string;
  meaning: string;
  example: string;
  exampleJa: string;
}

export type QuizTag = '品詞' | '時制' | '前置詞' | '語彙';

export interface QuizQuestion {
  id: string;
  /** 空所は ___ で表す */
  sentence: string;
  sentenceJa: string;
  choices: [string, string, string, string];
  /** 正解の choices インデックス */
  answer: number;
  explanation: string;
  tag: QuizTag;
}

export interface SoundChangeExample {
  /** 例文・フレーズ全体 */
  phrase: string;
  /** phrase 内で音声変化が起きる部分文字列（ハイライト表示に使う） */
  focus: string;
  /** 文字通りに読んだ場合のカナ */
  literal: string;
  /** 実際の発音に近いカナ */
  actual: string;
  note?: string;
  /** 将来ネイティブ録音音声に差し替えるためのフィールド（現状はTTS再生） */
  audioUrl?: string;
}

export interface SoundChangeRule {
  id: string;
  name: string;
  nameEn: string;
  /** 一覧カードに出す1行説明 */
  summary: string;
  /** 詳細画面の解説 */
  description: string;
  examples: SoundChangeExample[];
}

/**
 * TOEIC Part 1 形式の写真描写問題。
 * 写真素材の代わりに絵文字シーン + 日本語の場面説明を表示する。
 */
export interface Part1Item {
  id: string;
  /** 写真代わりの絵文字シーン（例: '👩‍💼💻📄'） */
  scene: string;
  /** 場面の日本語説明（写真代わり） */
  sceneJa: string;
  /** 将来実写真に差し替えるためのフィールド（現状は未使用） */
  imageUrl?: string;
  /** 音声で流す4つの描写文 (A)〜(D) */
  statements: [string, string, string, string];
  statementsJa: [string, string, string, string];
  /** 正解の statements インデックス */
  answer: number;
  explanation: string;
}

/** TOEIC Part 2 形式の応答問題 */
export interface Part2Item {
  id: string;
  /** 音声で流す質問・発言 */
  question: string;
  questionJa: string;
  /** 応答の選択肢（音声で流す） */
  choices: [string, string, string];
  /** 正解の choices インデックス */
  answer: number;
  explanation: string;
}

/** 4択の設問（Part 3/4/6/7 共通） */
export interface SetQuestion {
  q: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
}

/** TOEIC Part 3（会話）/ Part 4（トーク）の1セット */
export interface ListeningSet {
  id: string;
  part: 3 | 4;
  title: string;
  /** 読み上げる本文。会話は話者ラベル（M/W等）付きで交互に */
  script: { speaker?: string; text: string }[];
  scriptJa: string;
  questions: SetQuestion[];
}

/** TOEIC Part 6（長文穴埋め）の1文書。空所は [1]〜[4] のマーカー */
export interface Part6Set {
  id: string;
  docType: string;
  passage: string;
  passageJa: string;
  blanks: { no: number; choices: [string, string, string, string]; answer: number; explanation: string }[];
}

/** TOEIC Part 7（長文読解）の1文書 */
export interface Part7Set {
  id: string;
  docType: string;
  passage: string;
  passageJa: string;
  questions: SetQuestion[];
}

export interface DictationItem {
  id: string;
  sentence: string;
  sentenceJa: string;
  /** 音声変化が起きる部分文字列 */
  focus: string;
  ruleId: string;
  explanation: string;
}
