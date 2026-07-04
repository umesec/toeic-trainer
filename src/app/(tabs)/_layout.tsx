import AppTabs from '@/components/app-tabs';

/** タブ配下のレイアウト。タブバー本体は AppTabs（native/web で実装が分かれる）に委譲する */
export default function TabsLayout() {
  return <AppTabs />;
}
