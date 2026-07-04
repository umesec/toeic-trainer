/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1D23',
    background: '#F6F7FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E8EAF0',
    textSecondary: '#60646C',
    accent: '#3C87F7',
    onAccent: '#FFFFFF',
    success: '#22A06B',
    successBg: '#E5F6EE',
    danger: '#E5484D',
    dangerBg: '#FDEBEC',
    warning: '#E08B1E',
    warningBg: '#FCF2E2',
  },
  dark: {
    text: '#F2F3F5',
    background: '#0D0E11',
    backgroundElement: '#1C1E24',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    accent: '#5C9DFF',
    onAccent: '#FFFFFF',
    success: '#3DD68C',
    successBg: '#132D22',
    danger: '#FF6369',
    dangerBg: '#3B1D1F',
    warning: '#F5A623',
    warningBg: '#33270F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** 機能ごとのブランドカラー（強色 main / 薄い背景 tint / tint上の文字色 onTint） */
export type FeatureKey =
  | 'words'
  | 'quiz'
  | 'listening'
  | 'reading'
  | 'mock'
  | 'mistakes'
  | 'guide'
  | 'settings';

export interface FeatureColor {
  main: string;
  tint: string;
  onTint: string;
}

export const FeatureColors: Record<'light' | 'dark', Record<FeatureKey, FeatureColor>> = {
  light: {
    words: { main: '#8B5CF6', tint: '#F1EBFF', onTint: '#6D3FE0' },
    quiz: { main: '#F97316', tint: '#FFF0E4', onTint: '#D35400' },
    listening: { main: '#14B8A6', tint: '#E0F6F2', onTint: '#0E8577' },
    reading: { main: '#22A06B', tint: '#E5F6EE', onTint: '#1B7A52' },
    mock: { main: '#3C87F7', tint: '#E9F1FF', onTint: '#2568D0' },
    mistakes: { main: '#F43F5E', tint: '#FFEBEF', onTint: '#D02648' },
    guide: { main: '#6366F1', tint: '#ECEDFF', onTint: '#4649D6' },
    settings: { main: '#64748B', tint: '#EEF1F4', onTint: '#475569' },
  },
  dark: {
    words: { main: '#A78BFA', tint: '#291F42', onTint: '#C4B0FF' },
    quiz: { main: '#FB923C', tint: '#3A2413', onTint: '#FFB273' },
    listening: { main: '#2DD4BF', tint: '#11312C', onTint: '#6EE7D8' },
    reading: { main: '#3DD68C', tint: '#132D22', onTint: '#7CE7B4' },
    mock: { main: '#5C9DFF', tint: '#152841', onTint: '#8FBCFF' },
    mistakes: { main: '#FB7185', tint: '#3B1B22', onTint: '#FF9EAC' },
    guide: { main: '#818CF8', tint: '#202247', onTint: '#AEB5FF' },
    settings: { main: '#94A3B8', tint: '#1E2530', onTint: '#CBD5E1' },
  },
};

export const Radius = {
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

/**
 * ソフトシャドウ。RN 0.86 の新アーキは boxShadow 文字列を iOS/Android/Web で
 * サポートする。実機で描画されない場合は shadowColor 系 + elevation にフォールバックする。
 */
export const Shadows = {
  light: {
    card: { boxShadow: '0px 6px 16px rgba(23, 26, 31, 0.08)' },
    button: { boxShadow: '0px 4px 12px rgba(60, 135, 247, 0.30)' },
  },
  dark: {
    card: { boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.40)' },
    button: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.45)' },
  },
} as const;

export const Gradients = {
  light: { hero: ['#4C8DF8', '#8B5CF6'] as const },
  dark: { hero: ['#2E5FBF', '#6D4AD1'] as const },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
/** Webではタブバーが画面上部に浮くため、その分のコンテンツ上余白 */
export const TopContentInset = Platform.select({ web: 84, default: 8 }) ?? 8;
export const MaxContentWidth = 800;
