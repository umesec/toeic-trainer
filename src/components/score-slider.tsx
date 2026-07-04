import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const THUMB_SIZE = 26;
const TRACK_HEIGHT = 8;

/**
 * TOEICスコア選択用のドラッグスライダー（5点刻み）。
 * トラックのドラッグ/タップで大まかに動かし、両端の −/＋ ボタンで1ステップずつ微調整する。
 */
export function ScoreSlider({
  label,
  value,
  min,
  max,
  step = 5,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const theme = useTheme();
  const [trackWidth, setTrackWidth] = useState(0);

  // 同じ値での onChange は useState のバイパスに任せるため、現在値との比較は不要
  const setFromX = useCallback(
    (x: number) => {
      if (trackWidth <= 0) return;
      const ratio = Math.max(0, Math.min(1, x / trackWidth));
      const snapped = Math.round((min + ratio * (max - min)) / step) * step;
      onChange(Math.max(min, Math.min(max, snapped)));
    },
    [trackWidth, min, max, step, onChange]
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onBegin((e) => {
          runOnJS(setFromX)(e.x);
        })
        .onUpdate((e) => {
          runOnJS(setFromX)(e.x);
        }),
    [setFromX]
  );

  const nudge = (dir: -1 | 1) => {
    onChange(Math.max(min, Math.min(max, value + dir * step)));
  };

  const ratio = max > min ? (value - min) / (max - min) : 0;
  const filledWidth = trackWidth * ratio;

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <ThemedText type="small" themeColor="textSecondary">
          {label}
        </ThemedText>
        <ThemedText type="smallBold" style={{ color: theme.accent, fontSize: 17 }}>
          {value} 点
        </ThemedText>
      </View>

      <View style={styles.controlRow}>
        <Pressable
          onPress={() => nudge(-1)}
          disabled={value <= min}
          accessibilityLabel={`${label}を${step}点下げる`}
          style={({ pressed }) => [pressed && styles.pressed, value <= min && styles.disabled]}>
          <ThemedView type="backgroundSelected" style={styles.nudgeButton}>
            <ThemedText type="smallBold">−</ThemedText>
          </ThemedView>
        </Pressable>

        <GestureDetector gesture={pan}>
          <View
            style={styles.trackHit}
            onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}>
            <View style={[styles.track, { backgroundColor: theme.backgroundSelected }]} />
            <View
              style={[styles.trackFill, { width: filledWidth, backgroundColor: theme.accent }]}
              pointerEvents="none"
            />
            <View
              style={[
                styles.thumb,
                {
                  left: Math.max(0, Math.min(trackWidth - THUMB_SIZE, filledWidth - THUMB_SIZE / 2)),
                  backgroundColor: theme.accent,
                },
              ]}
              pointerEvents="none"
            />
          </View>
        </GestureDetector>

        <Pressable
          onPress={() => nudge(1)}
          disabled={value >= max}
          accessibilityLabel={`${label}を${step}点上げる`}
          style={({ pressed }) => [pressed && styles.pressed, value >= max && styles.disabled]}>
          <ThemedView type="backgroundSelected" style={styles.nudgeButton}>
            <ThemedText type="smallBold">＋</ThemedText>
          </ThemedView>
        </Pressable>
      </View>

      <View style={styles.rangeRow}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.rangeText}>
          {min}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.rangeText}>
          {max}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  nudgeButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackHit: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  trackFill: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 36 + Spacing.two,
  },
  rangeText: {
    fontSize: 11,
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.35,
  },
});
