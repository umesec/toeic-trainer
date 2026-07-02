import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const ACCENT = '#3c87f7';

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primary : styles.ghost,
        (pressed || disabled) && styles.dimmed,
        style,
      ]}>
      <ThemedText
        type="smallBold"
        style={variant === 'primary' ? styles.primaryLabel : styles.ghostLabel}>
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
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.dimmed}>
      <ThemedView
        type={selected ? 'backgroundSelected' : 'backgroundElement'}
        style={[styles.chip, selected && styles.chipSelected]}>
        <ThemedText type="small" themeColor={selected ? 'text' : 'textSecondary'}>
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <ThemedView type="backgroundElement" style={[styles.card, style]}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three - 4,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: ACCENT,
  },
  ghost: {
    borderWidth: 1.5,
    borderColor: ACCENT,
  },
  primaryLabel: {
    color: '#ffffff',
  },
  ghostLabel: {
    color: ACCENT,
  },
  dimmed: {
    opacity: 0.6,
  },
  chip: {
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.four,
  },
  chipSelected: {
    borderWidth: 1.5,
    borderColor: ACCENT,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
});
