import { StyleSheet } from 'react-native';

import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';

/**
 * ほぼ全画面で繰り返されている定型スタイル
 * （中央寄せコンテナ + SafeAreaView + タブバー分の余白を確保したScrollView）。
 * 画面固有のスタイルは各ファイルの StyleSheet.create に別途定義し、
 * JSXの style 配列で screenStyles.xxx と一緒に渡す。
 */
export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  scroll: {
    paddingTop: TopContentInset,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  pressed: {
    opacity: 0.6,
  },
});
