import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** 丸み付きのシンプルな進捗バー */
export function ProgressBar({
  value,
  max,
  color,
  trackColor,
  height = 10,
}: {
  value: number;
  max: number;
  color?: string;
  trackColor?: string;
  height?: number;
}) {
  const theme = useTheme();
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor ?? theme.backgroundSelected },
      ]}>
      <View
        style={[
          styles.fill,
          { width: `${pct}%`, backgroundColor: color ?? theme.accent },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: Radius.full,
    overflow: 'hidden',
    flexGrow: 1,
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
