import { Image, type StyleProp, type ImageStyle } from 'react-native';

/**
 * アプリ共通のラインアイコンセット。
 * すべて単色PNG（黒地・透過背景）を tintColor で着色して使う
 * （src/components/app-tabs.tsx の renderingMode="template" と同じ考え方）。
 */
export const ICONS = {
  stethoscope: require('@/assets/images/icons/stethoscope.png'),
  'book-closed': require('@/assets/images/icons/book-closed.png'),
  'book-open': require('@/assets/images/icons/book-open.png'),
  abc: require('@/assets/images/icons/abc.png'),
  headphones: require('@/assets/images/icons/headphones.png'),
  'pencil-write': require('@/assets/images/icons/pencil-write.png'),
  photo: require('@/assets/images/icons/photo.png'),
  mic: require('@/assets/images/icons/mic.png'),
  'chat-bubbles': require('@/assets/images/icons/chat-bubbles.png'),
  'pencil-check': require('@/assets/images/icons/pencil-check.png'),
  newspaper: require('@/assets/images/icons/newspaper.png'),
  'chart-up': require('@/assets/images/icons/chart-up.png'),
  'notebook-flag': require('@/assets/images/icons/notebook-flag.png'),
  'bar-chart': require('@/assets/images/icons/bar-chart.png'),
  flame: require('@/assets/images/icons/flame.png'),
  'check-circle': require('@/assets/images/icons/check-circle.png'),
  clock: require('@/assets/images/icons/clock.png'),
  'square-outline': require('@/assets/images/icons/square-outline.png'),
  gear: require('@/assets/images/icons/gear.png'),
  'speaker-wave': require('@/assets/images/icons/speaker-wave.png'),
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconName;
  size?: number;
  /** tintColor。未指定時は黒のまま（暗い背景では見えないので基本は指定する） */
  color?: string;
  style?: StyleProp<ImageStyle>;
}) {
  return (
    <Image
      source={ICONS[name]}
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
    />
  );
}
