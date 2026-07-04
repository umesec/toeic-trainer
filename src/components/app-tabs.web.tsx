import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useFeatureColors, useShadows, useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild>
            <TabButton>ホーム</TabButton>
          </TabTrigger>
          <TabTrigger name="flashcards" href="/flashcards" asChild>
            <TabButton>単語</TabButton>
          </TabTrigger>
          <TabTrigger name="quiz" href="/quiz" asChild>
            <TabButton>クイズ</TabButton>
          </TabTrigger>
          <TabTrigger name="listening" href="/listening" asChild>
            <TabButton>リスニング</TabButton>
          </TabTrigger>
          <TabTrigger name="mypage" href="/mypage" asChild>
            <TabButton>マイページ</TabButton>
          </TabTrigger>
          {/*
            expo-router/ui の Tabs は TabList に登録されていないルートへは
            router.push() で遷移できない（TabSlot が現在のタブの中身を保持し続ける）ため、
            タブバーには出さないが遷移だけ可能にしたい画面は非表示の TabTrigger として登録する。
          */}
          <TabTrigger name="guide" href="/guide" style={styles.hidden} />
          <TabTrigger name="stats" href="/stats" style={styles.hidden} />
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const theme = useTheme();
  const features = useFeatureColors();
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type="backgroundElement"
        style={[styles.tabButtonView, isFocused && { backgroundColor: features.mock.tint }]}>
        <ThemedText
          type={isFocused ? 'smallBold' : 'small'}
          themeColor={isFocused ? undefined : 'textSecondary'}
          style={isFocused && { color: theme.accent }}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const shadows = useShadows();
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={[styles.innerContainer, shadows.card]}>
        <ThemedText type="smallBold" style={styles.brandText}>
          TOEIC トレーナー
        </ThemedText>
        {props.children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  hidden: {
    display: 'none',
  },
});
