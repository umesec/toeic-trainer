import { PART1_ITEMS } from '@/data/part1';
import { PART2_ITEMS } from '@/data/part2';
import { LISTENING_SETS } from '@/data/part34';
import { PART6_SETS } from '@/data/part6';
import { PART7_SETS } from '@/data/part7';
import { QUIZZES } from '@/data/quizzes';
import type { MistakeEntry } from '@/lib/storage';

/**
 * 間違いノートのエントリ（kind + id）から、解き直しに必要な問題内容を
 * バンドル済みデータから復元する。
 */
export interface ResolvedMistake {
  header: string;
  /** 設問文。Part 2 は音声再生が前提のため空にし speakText を使う */
  prompt: string;
  promptJa?: string;
  /** 長文問題の本文（Part 6/7 のみ） */
  passage?: string;
  choices: readonly string[];
  answer: number;
  explanation: string;
  /** リスニング問題の再生用テキスト */
  speakText?: string;
}

/** セット問題のIDを `${setId}:${index}` に組み立てる */
export const setQuestionId = (setId: string, index: number) => `${setId}:${index}`;

export function resolveMistake(entry: MistakeEntry): ResolvedMistake | null {
  switch (entry.kind) {
    case 'part1': {
      const item = PART1_ITEMS.find((p) => p.id === entry.id);
      if (!item) return null;
      return {
        header: 'Part 1 写真描写',
        prompt: `${item.scene}\n${item.sceneJa}`,
        choices: item.statements,
        answer: item.answer,
        explanation: item.explanation,
        speakText: `A. ${item.statements[0]} ... B. ${item.statements[1]} ... C. ${item.statements[2]} ... D. ${item.statements[3]}`,
      };
    }
    case 'part2': {
      const item = PART2_ITEMS.find((p) => p.id === entry.id);
      if (!item) return null;
      return {
        header: 'Part 2 応答問題',
        prompt: `Q: ${item.question}`,
        promptJa: item.questionJa,
        choices: item.choices,
        answer: item.answer,
        explanation: item.explanation,
        speakText: `${item.question} ... A. ${item.choices[0]} ... B. ${item.choices[1]} ... C. ${item.choices[2]}`,
      };
    }
    case 'part34': {
      const [setId, qi] = splitSetId(entry.id);
      const set = LISTENING_SETS.find((s) => s.id === setId);
      const q = set?.questions[qi];
      if (!set || !q) return null;
      return {
        header: `Part ${set.part}「${set.title}」`,
        prompt: q.q,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
        speakText: set.script.map((l) => l.text).join(' ... '),
      };
    }
    case 'part5': {
      const q = QUIZZES.find((x) => x.id === entry.id);
      if (!q) return null;
      return {
        header: `Part 5［${q.tag}］`,
        prompt: q.sentence,
        promptJa: q.sentenceJa,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
      };
    }
    case 'part6': {
      const [setId, bi] = splitSetId(entry.id);
      const set = PART6_SETS.find((s) => s.id === setId);
      const blank = set?.blanks[bi];
      if (!set || !blank) return null;
      return {
        header: `Part 6【${set.docType}】`,
        prompt: `空所 [${blank.no}] に入るものは？`,
        passage: set.passage,
        choices: blank.choices,
        answer: blank.answer,
        explanation: blank.explanation,
      };
    }
    case 'part7': {
      const [setId, qi] = splitSetId(entry.id);
      const set = PART7_SETS.find((s) => s.id === setId);
      const q = set?.questions[qi];
      if (!set || !q) return null;
      return {
        header: `Part 7【${set.docType}】`,
        prompt: q.q,
        passage: set.passage,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
      };
    }
  }
}

function splitSetId(id: string): [string, number] {
  const sep = id.lastIndexOf(':');
  return [id.slice(0, sep), Number(id.slice(sep + 1))];
}
