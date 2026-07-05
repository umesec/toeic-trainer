import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { screenStyles } from '@/constants/screen-styles';

/**
 * 画面冒頭の「← 戻る」リンク。
 * 直接URLアクセス等でスタックが空の場合は router.back() が無反応になるため、
 * canGoBack() を確認して駄目なら fallbackHref へ replace する。
 */
export function BackLink({
  label = '← 戻る',
  fallbackHref = '/',
}: {
  label?: string;
  fallbackHref?: string;
}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => (router.canGoBack() ? router.back() : router.replace(fallbackHref as never))}
      style={({ pressed }) => pressed && screenStyles.pressed}>
      <ThemedText type="linkPrimary">{label}</ThemedText>
    </Pressable>
  );
}
