import assert from 'node:assert/strict';
import { test } from 'node:test';

import { ACHIEVEMENTS, evaluateAchievements, type AchievementInput } from '../achievements.ts';

const base = (over: Partial<AchievementInput> = {}): AchievementInput => ({
  streakCount: 0,
  masteredWords: 0,
  quizAnswered: 0,
  totalActions: 0,
  readingSets: 0,
  listeningCount: 0,
  mockCount: 0,
  bestScore: null,
  examTaken: false,
  diagnosisDone: false,
  ...over,
});

test('初期状態では何も解除されない', () => {
  assert.deepEqual(evaluateAchievements(base()), []);
});

test('学習アクションがあれば first-step が解除される', () => {
  assert.ok(evaluateAchievements(base({ totalActions: 1 })).includes('first-step'));
});

test('ストリーク系は閾値ちょうどで解除される', () => {
  const r = evaluateAchievements(base({ streakCount: 7 }));
  assert.ok(r.includes('streak-3'));
  assert.ok(r.includes('streak-7'));
  assert.ok(!r.includes('streak-30'));
});

test('スコア系は最高スコアで段階的に解除される', () => {
  const r850 = evaluateAchievements(base({ bestScore: 850 }));
  assert.ok(r850.includes('score-700'));
  assert.ok(r850.includes('score-800'));
  assert.ok(!r850.includes('score-900'));
  const r900 = evaluateAchievements(base({ bestScore: 900 }));
  assert.ok(r900.includes('score-900'));
});

test('evaluateAchievements が返すIDはすべて定義済み', () => {
  const all = evaluateAchievements(
    base({
      streakCount: 100,
      masteredWords: 1000,
      quizAnswered: 500,
      totalActions: 1000,
      readingSets: 30,
      listeningCount: 50,
      mockCount: 1,
      bestScore: 990,
      examTaken: true,
      diagnosisDone: true,
    })
  );
  const defined = new Set(ACHIEVEMENTS.map((a) => a.id));
  for (const id of all) assert.ok(defined.has(id), `undefined id: ${id}`);
  // 全条件を満たすと全実績が解除される
  assert.equal(all.length, ACHIEVEMENTS.length);
});
