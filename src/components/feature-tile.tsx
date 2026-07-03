import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing, type FeatureKey } from '@/constants/theme';
import { useFeatureColors, useShadows } from '@/hooks/use-theme';

/** ホームのクイックスタート用: 色分けアイコンバッジ付きタイル */
export function FeatureTile({
  emoji,
  title,
  subtitle,
  feature,
  onPress,
  badge,
  style,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  feature: FeatureKey;
  onPress: () => void;
  /** 右上の件数ピル（間違いノートなど） */
  badge?: string | number;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = useFeatureColors()[feature];
  const shadows = useShadows();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.cell, style]}>
      <ThemedView type="backgroundElement" style={[styles.tile, shadows.card]}>
        <View style={styles.topRow}>
          <View style={[styles.iconBadge, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.emoji}>{emoji}</ThemedText>
          </View>
          {badge !== undefined && badge !== 0 && (
            <View style={[styles.badge, { backgroundColor: colors.main }]}>
              <ThemedText type="smallBold" style={styles.badgeText}>
                {badge}
              </ThemedText>
            </View>
          )}
        </View>
        <ThemedText type="smallBold">{title}</ThemedText>
        {!!subtitle && (
          <ThemedText type="small" style={[styles.subtitle, { color: colors.onTint }]}>
            {subtitle}
          </ThemedText>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flexBasis: '48%',
    flexGrow: 1,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  tile: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.one + 2,
    minHeight: 104,
    flexGrow: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.md - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
    lineHeight: 28,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.one + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
});
