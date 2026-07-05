import { Pressable, StyleSheet } from 'react-native';

import { Icon } from '@/components/icon';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { speak } from '@/lib/speech';

/**
 * 発音ボタン。誤タップ防止のため 44×44 のタッチターゲット + hitSlop を確保する。
 */
export function SpeakButton({ text, size = 44 }: { text: string; size?: number }) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => speak(text)}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size, backgroundColor: theme.backgroundSelected },
        pressed && styles.pressed,
      ]}>
      <Icon name="speaker-wave" size={Math.round(size * 0.45)} color={theme.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
