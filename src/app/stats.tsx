import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackLink } from '@/components/back-link';
import { StatsContent } from '@/components/stats-content';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { screenStyles } from '@/constants/screen-styles';

/** 学習分析の単独ページ（ホームのタイルから遷移）。中身はマイページと共通の StatsContent */
export default function StatsScreen() {
  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          <BackLink label="← 戻る" fallbackHref="/" />
          <ThemedText type="subtitle">学習分析</ThemedText>
          <StatsContent />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
