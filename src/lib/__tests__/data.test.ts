import assert from 'node:assert/strict';
import { test } from 'node:test';

import { PART1_ITEMS } from '../../data/part1.ts';
import { PART2_ITEMS } from '../../data/part2.ts';
import { LISTENING_SETS } from '../../data/part34.ts';
import { PART6_SETS } from '../../data/part6.ts';
import { PART7_SETS } from '../../data/part7.ts';
import { QUIZZES } from '../../data/quizzes.ts';
import { WORDS } from '../../data/words.ts';

const TAGS = ['品詞', '時制', '前置詞', '語彙', '関係詞', '接続詞'] as const;
const CORE_TAGS = ['品詞', '時制', '前置詞', '語彙'] as const;

test('全データのIDが横断的に一意', () => {
  const ids = [
    ...PART1_ITEMS.map((x) => x.id),
    ...PART2_ITEMS.map((x) => x.id),
    ...LISTENING_SETS.map((x) => x.id),
    ...PART6_SETS.map((x) => x.id),
    ...PART7_SETS.map((x) => x.id),
    ...QUIZZES.map((x) => x.id),
    ...WORDS.map((x) => x.id),
  ];
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert.deepEqual(dup, [], `重複ID: ${dup.join(', ')}`);
});

test('Part 1: 件数・形式・answer範囲', () => {
  assert.ok(PART1_ITEMS.length >= 100, `Part1は100問以上（現在 ${PART1_ITEMS.length}）`);
  for (const it of PART1_ITEMS) {
    assert.equal(it.statements.length, 4, `${it.id}: statements は4つ`);
    assert.equal(it.statementsJa.length, 4, `${it.id}: statementsJa は4つ`);
    assert.ok(it.answer >= 0 && it.answer < 4, `${it.id}: answer範囲`);
    assert.ok(it.scene.length > 0 && it.sceneJa.length > 0, `${it.id}: scene必須`);
    assert.ok(it.explanation.length > 0, `${it.id}: explanation必須`);
    for (const s of [...it.statements, ...it.statementsJa]) {
      assert.ok(s.length > 0, `${it.id}: 空の選択肢`);
    }
  }
});

test('Part 2: 件数・形式・answer範囲', () => {
  assert.ok(PART2_ITEMS.length >= 134, `Part2は134問以上（現在 ${PART2_ITEMS.length}）`);
  for (const it of PART2_ITEMS) {
    assert.equal(it.choices.length, 3, `${it.id}: choices は3つ`);
    assert.ok(it.answer >= 0 && it.answer < 3, `${it.id}: answer範囲`);
    assert.ok(it.question.length > 0 && it.questionJa.length > 0, `${it.id}: question必須`);
  }
});

test('Part 3/4: セット数・設問形式', () => {
  assert.ok(LISTENING_SETS.length >= 87, `P3/4は87セット以上（現在 ${LISTENING_SETS.length}）`);
  const p3 = LISTENING_SETS.filter((s) => s.part === 3);
  const p4 = LISTENING_SETS.filter((s) => s.part === 4);
  assert.ok(p3.length >= 44, `Part3は44セット以上（現在 ${p3.length}）`);
  assert.ok(p4.length >= 43, `Part4は43セット以上（現在 ${p4.length}）`);
  for (const set of LISTENING_SETS) {
    assert.ok(set.script.length > 0, `${set.id}: script必須`);
    assert.ok(set.scriptJa.length > 0, `${set.id}: scriptJa必須`);
    assert.ok(set.questions.length >= 1, `${set.id}: 設問1件以上`);
    for (const q of set.questions) {
      assert.equal(q.choices.length, 4, `${set.id}: choices は4つ`);
      assert.ok(q.answer >= 0 && q.answer < 4, `${set.id}: answer範囲`);
    }
  }
});

test('Part 5: 件数・タグ配分・answer範囲', () => {
  assert.ok(QUIZZES.length >= 230, `Part5は230問以上（現在 ${QUIZZES.length}）`);
  for (const q of QUIZZES) {
    assert.ok((TAGS as readonly string[]).includes(q.tag), `${q.id}: 不正なタグ ${q.tag}`);
    assert.equal(q.choices.length, 4, `${q.id}: choices は4つ`);
    assert.ok(q.answer >= 0 && q.answer < 4, `${q.id}: answer範囲`);
    assert.ok(q.sentence.includes('___'), `${q.id}: 空所マーカー ___ がない`);
  }
  for (const tag of CORE_TAGS) {
    const n = QUIZZES.filter((q) => q.tag === tag).length;
    assert.ok(n >= 25, `タグ「${tag}」は25問以上（現在 ${n}）`);
  }
});

test('Part 6: セット数・空所マーカー整合', () => {
  assert.ok(PART6_SETS.length >= 30, `Part6は30セット以上（現在 ${PART6_SETS.length}）`);
  for (const set of PART6_SETS) {
    assert.equal(set.blanks.length, 4, `${set.id}: blanks は4つ`);
    for (const b of set.blanks) {
      assert.ok(
        set.passage.includes(`[${b.no}]`),
        `${set.id}: passage に [${b.no}] マーカーがない`
      );
      assert.equal(b.choices.length, 4, `${set.id}: choices は4つ`);
      assert.ok(b.answer >= 0 && b.answer < 4, `${set.id}: answer範囲`);
    }
  }
});

test('Part 7: 件数・形式', () => {
  assert.ok(PART7_SETS.length >= 45, `Part7は45セット以上（現在 ${PART7_SETS.length}）`);
  const single = PART7_SETS.filter((s) => s.passages.length === 1);
  const multi = PART7_SETS.filter((s) => s.passages.length >= 2);
  assert.ok(single.length >= 29, `シングルパッセージは29セット以上（現在 ${single.length}）`);
  assert.ok(multi.length >= 15, `マルチパッセージは15セット以上（現在 ${multi.length}）`);
  for (const set of PART7_SETS) {
    assert.ok(set.passages.length >= 1 && set.passages.length <= 3, `${set.id}: passages は1〜3`);
    for (const p of set.passages) {
      assert.ok(p.text.length > 0 && p.textJa.length > 0, `${set.id}: passage text必須`);
    }
    assert.ok(set.questions.length >= 1, `${set.id}: 設問1件以上`);
    for (const q of set.questions) {
      assert.equal(q.choices.length, 4, `${set.id}: choices は4つ`);
      assert.ok(q.answer >= 0 && q.answer < 4, `${set.id}: answer範囲`);
    }
  }
});
