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

export interface DictationItem {
  id: string;
  sentence: string;
  sentenceJa: string;
  /** 音声変化が起きる部分文字列 */
  focus: string;
  ruleId: string;
  explanation: string;
}
