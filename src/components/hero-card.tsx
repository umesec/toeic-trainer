import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useGradients, useShadows } from '@/hooks/use-theme';

/**
 * ホームの学習プラン用グラデーションカード。中身は白文字前提。
 * expo-linear-gradient はネイティブ再ビルドが必要になるため、
 * RN 0.86 新アーキが対応する CSS 風グラデーション（experimental_backgroundImage）を使う。
 */
export function HeroCard({
  children,
  style,
  colors,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: readonly [string, string];
}) {
  const gradients = useGradients();
  const shadows = useShadows();
  const [from, to] = colors ?? gradients.hero;

  return (
    <View
      style={[
        styles.card,
        { experimental_backgroundImage: `linear-gradient(135deg, ${from}, ${to})` },
        shadows.card,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.four,
    gap: Spacing.two,
  },
});
