import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useGradients, useShadows } from '@/hooks/use-theme';

/** ホームの学習プラン用グラデーションカード。中身は白文字前提 */
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

  return (
    <LinearGradient
      colors={colors ?? gradients.hero}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, shadows.card, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.four,
    gap: Spacing.two,
  },
});
