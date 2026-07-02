import { Stack } from 'expo-router';

export default function ListeningLayout() {
  // ヘッダーはWebのタブバーと干渉するため使わず、各画面が独自に戻るボタンを持つ
  return <Stack screenOptions={{ headerShown: false }} />;
}
