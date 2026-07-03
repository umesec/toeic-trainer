import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export interface BarDatum {
  label: string;
  value: number;
}

/**
 * ライブラリなしのViewベース棒グラフ。
 * ラベルは詰まりすぎないよう自動で間引いて表示する。
 */
export function BarChart({
  data,
  color = '#3c87f7',
  height = 96,
  maxValue,
}: {
  data: BarDatum[];
  color?: string;
  height?: number;
  maxValue?: number;
}) {
  const max = Math.max(1, maxValue ?? Math.max(...data.map((d) => d.value)));
  // ラベルは最大7個程度に間引く
  const labelStep = Math.max(1, Math.ceil(data.length / 7));

  return (
    <View>
      <View style={[styles.bars, { height }]}>
        {data.map((d, i) => (
          <View key={`${d.label}-${i}`} style={styles.barColumn}>
            {d.value > 0 && (
              <View
                style={[
                  styles.bar,
                  { height: Math.max(3, (d.value / max) * height), backgroundColor: color },
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <View style={styles.labels}>
        {data.map((d, i) => (
          <View key={`l-${d.label}-${i}`} style={styles.barColumn}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.labelText}>
              {i % labelStep === 0 ? d.label : ''}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.half,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '70%',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  labels: {
    flexDirection: 'row',
    gap: Spacing.half,
    marginTop: Spacing.one,
  },
  labelText: {
    fontSize: 9,
    lineHeight: 12,
  },
});
