import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Chip } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { setAccentMixEnabled, setSpeechRateScale, speak } from '@/lib/speech';
import {
  exportAll,
  importAll,
  loadSettings,
  resetAll,
  saveSettings,
} from '@/lib/storage';

const RATE_OPTIONS = [
  { label: 'ゆっくり', value: 0.8 },
  { label: '標準', value: 1.0 },
  { label: '1.1x', value: 1.1 },
  { label: '1.2x', value: 1.2 },
  { label: '1.25x', value: 1.25 },
] as const;

export function SettingsModal({
  visible,
  onClose,
  onDataChanged,
}: {
  visible: boolean;
  onClose: () => void;
  /** インポート・リセットで進捗データが変わったときに呼ぶ（ホームの再読込用） */
  onDataChanged: () => void;
}) {
  const theme = useTheme();
  const [rate, setRate] = useState(1.0);
  const [remind, setRemind] = useState(true);
  const [accentMix, setAccentMix] = useState(true);
  const [exported, setExported] = useState('');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importState, setImportState] = useState<'idle' | 'confirm' | 'done' | 'error'>('idle');
  const [resetState, setResetState] = useState<'idle' | 'confirm' | 'done'>('idle');

  useEffect(() => {
    if (!visible) return;
    loadSettings().then((s) => {
      setRate(s.speechRateScale);
      setRemind(s.remindEnabled);
      setAccentMix(s.accentMix);
    });
    setExported('');
    setCopied(false);
    setImportText('');
    setImportState('idle');
    setResetState('idle');
  }, [visible]);

  const changeRate = (value: number) => {
    setRate(value);
    setSpeechRateScale(value);
    saveSettings({ speechRateScale: value, remindEnabled: remind, accentMix });
    speak('This is a sample sentence.');
  };

  const changeRemind = (value: boolean) => {
    setRemind(value);
    saveSettings({ speechRateScale: rate, remindEnabled: value, accentMix });
    // 通知スケジュールの同期はホームの reload（onDataChanged）に任せる
    onDataChanged();
  };

  const changeAccentMix = (value: boolean) => {
    setAccentMix(value);
    setAccentMixEnabled(value);
    saveSettings({ speechRateScale: rate, remindEnabled: remind, accentMix: value });
    // ON にしたらサンプルとして英アクセントを一言再生
    if (value) speak('This is a sample sentence.', { accent: 'UK' });
  };

  const doExport = async () => {
    setExported(await exportAll());
    setCopied(false);
  };

  const copyExport = async () => {
    await Clipboard.setStringAsync(exported);
    setCopied(true);
  };

  const doImport = async () => {
    if (importState !== 'confirm') {
      setImportState('confirm');
      return;
    }
    const ok = await importAll(importText.trim());
    setImportState(ok ? 'done' : 'error');
    if (ok) onDataChanged();
  };

  const doReset = async () => {
    if (resetState !== 'confirm') {
      setResetState('confirm');
      return;
    }
    await resetAll();
    setResetState('done');
    onDataChanged();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <ThemedView style={styles.body}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <ThemedText type="subtitle">⚙️ 設定</ThemedText>

            <ThemedText type="smallBold">読み上げ速度</ThemedText>
            <View style={styles.chipRow}>
              {RATE_OPTIONS.map((o) => (
                <Chip
                  key={o.label}
                  label={o.label}
                  selected={rate === o.value}
                  onPress={() => changeRate(o.value)}
                />
              ))}
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              選ぶとサンプル音声が流れます。すべての再生（🐢ゆっくりを含む）に適用されます。
            </ThemedText>

            <ThemedText type="smallBold" style={styles.sectionTitle}>
              アクセントMIX（米・英・豪）
            </ThemedText>
            <View style={styles.chipRow}>
              <Chip label="ON" selected={accentMix} onPress={() => changeAccentMix(true)} />
              <Chip label="OFF" selected={!accentMix} onPress={() => changeAccentMix(false)} />
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              本番同様、問題ごとに米・英・豪のアクセントを使い分けます。OFFにするとすべて米音声になります。
            </ThemedText>

            <ThemedText type="smallBold" style={styles.sectionTitle}>
              リマインド通知
            </ThemedText>
            <View style={styles.chipRow}>
              <Chip label="ON" selected={remind} onPress={() => changeRemind(true)} />
              <Chip label="OFF" selected={!remind} onPress={() => changeRemind(false)} />
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              学習プラン設定中、「今日のメニュー」が未消化のまま19時になると通知でお知らせします。
            </ThemedText>

            <ThemedText type="smallBold" style={styles.sectionTitle}>
              バックアップ（エクスポート）
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              学習進捗・カスタム単語・設定をJSONとして書き出します。機種変更やiOS版への移行時に使えます。
            </ThemedText>
            <AppButton label="エクスポートを作成" variant="ghost" onPress={doExport} />
            {!!exported && (
              <>
                <ThemedView type="backgroundElement" style={styles.jsonBox}>
                  <TextInput
                    value={exported}
                    editable={false}
                    multiline
                    style={[styles.jsonText, { color: theme.textSecondary }]}
                    numberOfLines={4}
                  />
                </ThemedView>
                <AppButton label={copied ? '✔ コピーしました' : 'クリップボードにコピー'} onPress={copyExport} />
              </>
            )}

            <ThemedText type="smallBold" style={styles.sectionTitle}>
              復元（インポート）
            </ThemedText>
            <ThemedView type="backgroundElement" style={styles.jsonBox}>
              <TextInput
                value={importText}
                onChangeText={(t) => {
                  setImportText(t);
                  setImportState('idle');
                }}
                placeholder="エクスポートしたJSONを貼り付け..."
                placeholderTextColor={theme.textSecondary}
                multiline
                style={[styles.jsonText, { color: theme.text }]}
              />
            </ThemedView>
            {importState === 'error' && (
              <ThemedText type="small" style={{ color: theme.danger }}>
                JSONの形式が正しくありません。エクスポートした内容をそのまま貼り付けてください。
              </ThemedText>
            )}
            {importState === 'done' ? (
              <ThemedText type="small" style={{ color: theme.success }}>
                ✔ 復元しました
              </ThemedText>
            ) : (
              <AppButton
                label={importState === 'confirm' ? '現在のデータを上書きして復元する' : 'インポート'}
                variant="ghost"
                onPress={doImport}
                disabled={!importText.trim()}
              />
            )}

            <ThemedText type="smallBold" style={styles.sectionTitle}>
              データリセット
            </ThemedText>
            {resetState === 'done' ? (
              <ThemedText type="small" style={{ color: theme.success }}>
                ✔ すべてのデータを削除しました
              </ThemedText>
            ) : (
              <AppButton
                label={resetState === 'confirm' ? '本当に全データを削除する（取り消せません）' : '全データを削除'}
                variant="ghost"
                onPress={doReset}
              />
            )}

            <AppButton label="閉じる" onPress={onClose} />
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  body: {
    borderRadius: Radius.lg,
    width: '100%',
    maxWidth: 480,
    maxHeight: '88%',
  },
  scroll: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  sectionTitle: {
    marginTop: Spacing.three,
  },
  jsonBox: {
    borderRadius: Radius.sm,
    maxHeight: 110,
  },
  jsonText: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 11,
  },
});
