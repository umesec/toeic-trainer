/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, FeatureColors, Gradients, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/** 解決済みのカラースキーム（'light' | 'dark'） */
export function useScheme(): 'light' | 'dark' {
  const scheme = useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  return Colors[useScheme()];
}

export function useFeatureColors() {
  return FeatureColors[useScheme()];
}

export function useShadows() {
  return Shadows[useScheme()];
}

export function useGradients() {
  return Gradients[useScheme()];
}
