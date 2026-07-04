import { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useShadows } from '@/hooks/use-theme';

const PARTICLES = ['🎉', '🎊', '✨', '⭐', '🎈', '🥳'];
const PARTICLE_COUNT = 14;
const DURATION_MS = 2600;

/**
 * 紙吹雪＋メッセージカードのお祝い演出。
 * 今日のメニュー完遂や実績解除のタイミングで表示する。
 */
export function CelebrationOverlay({
  visible,
  title,
  message,
  onClose,
}: {
  visible: boolean;
  title: string;
  message?: string;
  onClose: () => void;
}) {
  if (!visible) return null;
  return <CelebrationInner title={title} message={message} onClose={onClose} />;
}

function CelebrationInner({
  title,
  message,
  onClose,
}: {
  title: string;
  message?: string;
  onClose: () => void;
}) {
  const shadows = useShadows();
  const { width, height } = useWindowDimensions();

  // 粒の配置はインデックス由来の決定的擬似乱数で決める（レンダー純度を保つ）
  const particles = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      emoji: PARTICLES[i % PARTICLES.length],
      x: rand(i * 4 + 1) * width,
      delay: rand(i * 4 + 2) * 500,
      size: 18 + rand(i * 4 + 3) * 14,
      drift: (rand(i * 4 + 4) - 0.5) * 120,
    }));
  }, [width]);

  return (
    <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="お祝いを閉じる">
      {particles.map((p, i) => (
        <Particle key={i} {...p} fallHeight={height} />
      ))}
      <View style={styles.center} pointerEvents="none">
        <ThemedView type="backgroundElement" style={[styles.card, shadows.card]}>
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
          {!!message && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.message}>
              {message}
            </ThemedText>
          )}
          <ThemedText type="small" themeColor="textSecondary">
            タップで閉じる
          </ThemedText>
        </ThemedView>
      </View>
    </Pressable>
  );
}

function Particle({
  emoji,
  x,
  delay,
  size,
  drift,
  fallHeight,
}: {
  emoji: string;
  x: number;
  delay: number;
  size: number;
  drift: number;
  fallHeight: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: DURATION_MS, easing: Easing.in(Easing.quad) })
    );
  }, [progress, delay]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: -40 + progress.value * (fallHeight + 80) },
      { translateX: progress.value * drift },
      { rotate: `${progress.value * 360}deg` },
    ],
    opacity: progress.value < 0.85 ? 1 : (1 - progress.value) / 0.15,
  }));

  return (
    <Animated.View style={[styles.particle, { left: x }, style]} pointerEvents="none">
      <ThemedText style={{ fontSize: size, lineHeight: size + 6 }}>{emoji}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 100,
  },
  particle: {
    position: 'absolute',
    top: 0,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
    maxWidth: 420,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
