/**
 * ホーム画面・学習分析（マイページ/単独ページ）で共通の
 * チャート用データ整形ロジック。
 */

import type { BarDatum } from '@/components/bar-chart';
import { addDays } from '@/lib/srs';
import type { DailyLogMap, MockResult } from '@/lib/storage';

/** 直近N日分の学習アクション合計（cards+quiz+listening+reading）を日毎に並べる */
export function buildDailyChart(logMap: DailyLogMap, today: string, days = 14): BarDatum[] {
  const result: BarDatum[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    const d = logMap[date];
    result.push({
      label: date.slice(5).replace('-', '/'),
      value: d ? d.cards + d.quiz + d.listening + (d.reading ?? 0) : 0,
    });
  }
  return result;
}

/** 推定スコアが記録されている模試結果を直近N件、日付ラベル付きで並べる */
export function buildScoreChart(mockHistory: MockResult[], limit = 10): BarDatum[] {
  return mockHistory
    .filter((h) => h.estimatedTotal !== undefined)
    .slice(-limit)
    .map((h) => ({ label: h.date.slice(5).replace('-', '/'), value: h.estimatedTotal! }));
}
