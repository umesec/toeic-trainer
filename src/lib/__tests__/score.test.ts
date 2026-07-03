import assert from 'node:assert/strict';
import { test } from 'node:test';

import { estimateScore } from '../score.ts';

test('全問正解で満点、全問不正解で最低点', () => {
  const perfect = estimateScore(22, 22, 25, 25);
  assert.equal(perfect.listening, 495);
  assert.equal(perfect.reading, 495);
  assert.equal(perfect.total, 990);

  const zero = estimateScore(0, 22, 0, 25);
  assert.equal(zero.listening, 5);
  assert.equal(zero.reading, 5);
  assert.equal(zero.total, 10);
});

test('スコアは5〜495に収まり5点刻み', () => {
  for (let c = 0; c <= 22; c++) {
    const s = estimateScore(c, 22, c, 22);
    assert.ok(s.listening >= 5 && s.listening <= 495);
    assert.ok(s.reading >= 5 && s.reading <= 495);
    assert.equal(s.listening % 5, 0);
    assert.equal(s.reading % 5, 0);
  }
});

test('正答数が増えるとスコアは単調非減少', () => {
  let prev = 0;
  for (let c = 0; c <= 25; c++) {
    const s = estimateScore(c, 25, c, 25);
    assert.ok(s.total >= prev, `total decreased at c=${c}`);
    prev = s.total;
  }
});

test('同じ正答率ならリスニングの方が高い（中間帯）', () => {
  const s = estimateScore(15, 25, 15, 25);
  assert.ok(s.listening >= s.reading);
});

test('問題数が多いほどmarginが小さくなる', () => {
  const small = estimateScore(10, 15, 10, 15);
  const large = estimateScore(30, 45, 30, 45);
  assert.ok(large.margin < small.margin);
});

test('問題数0でも壊れない', () => {
  const s = estimateScore(0, 0, 0, 0);
  assert.equal(s.listening, 5);
  assert.equal(s.reading, 5);
  assert.ok(Number.isFinite(s.margin));
});
