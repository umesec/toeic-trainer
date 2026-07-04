import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { GUIDE_SECTIONS } from '@/data/guide';

export default function GuideScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => router.push('/mypage' as never)}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">← マイページに戻る</ThemedText>
          </Pressable>
          <ThemedText type="subtitle">TOEIC ガイド</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            はじめてTOEICを受ける人向けに、試験の全体像と各Partの形式・攻略ポイントをまとめました。
          </ThemedText>

          {GUIDE_SECTIONS.map((section) =>
            section.isHeader ? (
              <ThemedText key={section.id} type="smallBold" style={styles.header}>
                {section.title}
                {'\n'}
                <ThemedText type="small" themeColor="textSecondary">
                  {section.body}
                </ThemedText>
              </ThemedText>
            ) : (
              <Card key={section.id}>
                <ThemedText type="smallBold">{section.title}</ThemedText>
                <ThemedText type="small" style={styles.body}>
                  {section.body}
                </ThemedText>
                {section.points?.map((point) => (
                  <ThemedText key={point} type="small" themeColor="textSecondary" style={styles.point}>
                    ・{point}
                  </ThemedText>
                ))}
                {section.link && (
                  <AppButton
                    label={section.link.label}
                    variant="ghost"
                    onPress={() => router.push(section.link!.href as never)}
                  />
                )}
              </Card>
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  header: {
    marginTop: Spacing.two,
    lineHeight: 22,
  },
  body: {
    lineHeight: 22,
  },
  point: {
    lineHeight: 20,
  },
});
