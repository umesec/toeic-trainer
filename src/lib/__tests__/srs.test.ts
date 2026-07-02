import assert from 'node:assert/strict';
import { test } from 'node:test';

import { addDays, isDue, newCardState, review } from '../srs.ts';

const TODAY = '2026-07-02';

test('新規カードは当日dueで始まる', () => {
  const s = newCardState(TODAY);
  assert.equal(s.due, TODAY);
  assert.equal(s.reps, 0);
  assert.equal(s.interval, 0);
  assert.equal(s.ease, 2.5);
});

test('初回「普通」で翌日due', () => {
  const s = review(newCardState(TODAY), 'good', TODAY);
  assert.equal(s.interval, 1);
  assert.equal(s.due, addDays(TODAY, 1));
  assert.equal(s.reps, 1);
});

test('初回「簡単」で4日後due・ease上昇', () => {
  const s = review(newCardState(TODAY), 'easy', TODAY);
  assert.equal(s.interval, 4);
  assert.equal(s.due, addDays(TODAY, 4));
  assert.equal(s.ease, 2.65);
});

test('「もう一度」でrepsリセット・当日再出題・ease低下', () => {
  const learned = review(review(newCardState(TODAY), 'good', TODAY), 'good', addDays(TODAY, 1));
  const s = review(learned, 'again', addDays(TODAY, 7));
  assert.equal(s.reps, 0);
  assert.equal(s.interval, 0);
  assert.equal(s.due, addDays(TODAY, 7));
  assert.ok(s.ease < learned.ease);
});

test('2回目「普通」で6日間隔、3回目以降はease倍で伸びる', () => {
  let s = review(newCardState(TODAY), 'good', TODAY); // interval 1
  s = review(s, 'good', s.due); // interval 6
  assert.equal(s.interval, 6);
  const before = s.interval;
  s = review(s, 'good', s.due);
  assert.equal(s.interval, Math.max(before + 1, Math.round(before * s.ease)));
});

test('easeは1.3未満に下がらない', () => {
  let s = newCardState(TODAY);
  for (let i = 0; i < 20; i++) s = review(s, 'again', TODAY);
  assert.equal(s.ease, 1.3);
});

test('isDue: 未学習は常にdue・未来dueはfalse', () => {
  assert.equal(isDue(undefined, TODAY), true);
  const s = review(newCardState(TODAY), 'easy', TODAY);
  assert.equal(isDue(s, TODAY), false);
  assert.equal(isDue(s, addDays(TODAY, 4)), true);
});

test('addDays: 月またぎ・年またぎ', () => {
  assert.equal(addDays('2026-01-31', 1), '2026-02-01');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2026-07-02', -1), '2026-07-01');
});
