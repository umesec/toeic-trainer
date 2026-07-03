import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useShadows, useTheme } from '@/hooks/use-theme';

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  color,
  disabled,
  style,
  size = 'md',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'tint';
  /** ボタンのメインカラー上書き（未指定時は theme.accent） */
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: 'md' | 'lg';
}) {
  const theme = useTheme();
  const shadows = useShadows();
  const main = color ?? theme.accent;

  const variantStyle: StyleProp<ViewStyle> =
    variant === 'primary'
      ? [{ backgroundColor: main }, shadows.button]
      : variant === 'ghost'
        ? { borderWidth: 1.5, borderColor: main }
        : { backgroundColor: theme.backgroundSelected };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        size === 'lg' && styles.buttonLg,
        variantStyle,
        pressed && styles.pressed,
        disabled && styles.dimmed,
        style,
      ]}>
      <ThemedText
        type="smallBold"
        style={{ color: variant === 'primary' ? theme.onAccent : main }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.dimmed}>
      <ThemedView
        type={selected ? undefined : 'backgroundElement'}
        style={[
          styles.chip,
          selected && {
            backgroundColor: theme.backgroundSelected,
            borderColor: theme.accent,
            borderWidth: 1.5,
          },
        ]}>
        <ThemedText
          type={selected ? 'smallBold' : 'small'}
          style={selected ? { color: theme.accent } : undefined}
          themeColor={selected ? undefined : 'textSecondary'}>
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function Card({
  children,
  style,
  shadow = true,
  tint,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** ソフトシャドウ（tint 指定時は自動でオフ） */
  shadow?: boolean;
  /** 背景色の上書き（FeatureColors[...].tint を渡す想定） */
  tint?: string;
}) {
  const shadows = useShadows();
  return (
    <ThemedView
      type={tint ? undefined : 'backgroundElement'}
      style={[
        styles.card,
        tint ? { backgroundColor: tint } : shadow && shadows.card,
        style,
      ]}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three - 4,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLg: {
    paddingVertical: Spacing.three,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  dimmed: {
    opacity: 0.6,
  },
  chip: {
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.full,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.two,
  },
});
