import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { dailyQuota, daysUntilExam, type StudyPlan } from '@/lib/plan';
import { todayStr } from '@/lib/srs';
import type { DayLog } from '@/lib/storage';

/** リマインド通知の時刻（19時） */
const REMIND_HOUR = 19;
/** 先読みでスケジュールする日数（アプリを開かない日が続いても通知が届く範囲） */
const SCHEDULE_DAYS = 7;

// フォアグラウンドでも通知バナーを表示する
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

function menuComplete(quota: { cards: number; quiz: number; listening: number }, log: DayLog) {
  return (
    log.cards >= quota.cards && log.quiz >= quota.quiz && log.listening >= quota.listening
  );
}

/**
 * リマインド通知を現在の状態に同期する。
 * iOSのローカル通知は発火時に達成状況を判定できないため、
 * アプリを開くたびに全キャンセル→今後7日分（試験日まで）を再スケジュールする。
 * 今日の分は、メニュー消化済み or 19時を過ぎている場合はスキップ。
 */
export async function syncReminders(
  enabled: boolean,
  plan: StudyPlan | null,
  todayLog: DayLog
): Promise<void> {
  if (Platform.OS === 'web') return;

  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!enabled || !plan) return;

  const today = todayStr();
  const remainDays = daysUntilExam(plan, today);
  if (remainDays < 0) return; // 試験日を過ぎたプランには通知しない

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  const quota = dailyQuota(plan, today);
  const now = new Date();

  for (let i = 0; i < Math.min(SCHEDULE_DAYS, remainDays + 1); i++) {
    // 今日の分: 消化済みなら送らない
    if (i === 0 && menuComplete(quota, todayLog)) continue;

    const fireDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, REMIND_HOUR, 0, 0);
    if (fireDate <= now) continue; // 今日19時を過ぎていたらスキップ

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '今日のメニューが残っています📚',
        body: `目標 ${plan.targetScore}点まであと${remainDays - i}日。単語カード・クイズ・リスニングを進めましょう！`,
        sound: false,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: fireDate,
      },
    });
  }
}
