import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackLink } from '@/components/back-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { Spacing } from '@/constants/theme';
import { GUIDE_SECTIONS } from '@/data/guide';

export default function GuideScreen() {
  const router = useRouter();

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          <BackLink label="← 戻る" fallbackHref="/mypage" />
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
