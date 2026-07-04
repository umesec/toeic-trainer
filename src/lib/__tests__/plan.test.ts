import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildPhases,
  currentPhase,
  dailyQuota,
  daysBetween,
  daysUntilExam,
  intensityOf,
  type StudyPlan,
} from '../plan.ts';

const plan = (over: Partial<StudyPlan> = {}): StudyPlan => ({
  targetScore: 700,
  currentScore: 500,
  examDate: '2026-10-10',
  startDate: '2026-07-02',
  ...over,
});

test('daysBetween / daysUntilExam', () => {
  assert.equal(daysBetween('2026-07-02', '2026-07-03'), 1);
  assert.equal(daysBetween('2026-07-02', '2026-07-02'), 0);
  assert.equal(daysUntilExam(plan(), '2026-10-09'), 1);
  assert.equal(daysUntilExam(plan(), '2026-10-11'), -1);
});

test('intensityOf: 必要スコア/日で強度が決まる', () => {
  // gap 200 / 100日 = 2.0/日 → intense（1.5超）
  assert.equal(intensityOf(plan(), '2026-07-02'), 'intense');
  // gap 100 / 100日 = 1.0/日 → normal（0.5〜1.5）
  assert.equal(intensityOf(plan({ targetScore: 600 }), '2026-07-02'), 'normal');
  // gap 40 / 100日 = 0.4/日 → light（0.5未満）
  assert.equal(intensityOf(plan({ targetScore: 540 }), '2026-07-02'), 'light');
});

test('buildPhases: 3フェーズが連続して期間全体を覆う', () => {
  const phases = buildPhases(plan());
  assert.equal(phases.length, 3);
  assert.equal(phases[0].from, '2026-07-02');
  assert.equal(phases[2].to, '2026-10-10');
  // 隙間なく連続している
  assert.ok(phases[0].to < phases[1].from);
  assert.ok(phases[1].to < phases[2].from);
  assert.equal(daysBetween(phases[0].to, phases[1].from), 1);
  assert.equal(daysBetween(phases[1].to, phases[2].from), 1);
});

test('currentPhase: 日付によってフェーズが切り替わる', () => {
  const p = plan();
  assert.equal(currentPhase(p, '2026-07-02').id, 'foundation');
  assert.equal(currentPhase(p, '2026-09-01').id, 'practice');
  assert.equal(currentPhase(p, '2026-10-09').id, 'final');
});

test('dailyQuota: 正のノルマと目安時間を返す', () => {
  const q = dailyQuota(plan(), '2026-07-02');
  assert.ok(q.cards > 0);
  assert.ok(q.quiz > 0);
  assert.ok(q.listening > 0);
  assert.ok(q.reading > 0);
  assert.equal(
    q.estMinutes,
    Math.round(q.cards * 0.5 + q.quiz * 1.5 + q.listening * 10 + q.reading * 8)
  );
});

test('短期プランでもフェーズ計算が壊れない', () => {
  const p = plan({ examDate: '2026-07-05' });
  const phases = buildPhases(p);
  assert.equal(phases.length, 3);
  assert.ok(phases[2].to === '2026-07-05');
  const q = dailyQuota(p, '2026-07-03');
  assert.ok(q.cards > 0);
});
