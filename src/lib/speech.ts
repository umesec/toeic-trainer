import * as Speech from 'expo-speech';

/**
 * 英語TTSの薄いラッパー。Web は Web Speech API、iOS は AVSpeechSynthesizer が使われる。
 * 音声変化（フラップT等）の再現度はOSの音声品質に依存する。
 */

/** 設定画面で変更できる読み上げ速度の倍率（起動時に設定から反映） */
let rateScale = 1.0;

export function setSpeechRateScale(scale: number) {
  rateScale = scale;
}

/** 本番同様に米/英/豪のアクセントを混ぜるか（設定から反映） */
let accentMixEnabled = true;

export function setAccentMixEnabled(enabled: boolean) {
  accentMixEnabled = enabled;
}

export type Accent = 'US' | 'UK' | 'AU';

const ACCENT_LANG: Record<Accent, string> = {
  US: 'en-US',
  UK: 'en-GB',
  AU: 'en-AU',
};

const ACCENTS: Accent[] = ['US', 'UK', 'AU'];

/**
 * 問題IDから決定的にアクセントを割り当てる（同じ問題は常に同じアクセント）。
 * アクセントMIXがOFFのときは常に米音声。
 * 端末に該当ボイスが無い場合はOS側が近いボイスへ自動フォールバックする。
 */
export function accentForId(id: string): Accent {
  if (!accentMixEnabled) return 'US';
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return ACCENTS[Math.abs(hash) % ACCENTS.length];
}

export function speak(text: string, opts: { slow?: boolean; accent?: Accent } = {}) {
  Speech.stop();
  Speech.speak(text, {
    language: ACCENT_LANG[opts.accent ?? 'US'],
    rate: (opts.slow ? 0.5 : 1.0) * rateScale,
    pitch: 1.0,
  });
}

export function stopSpeech() {
  Speech.stop();
}

export interface SpeechLine {
  text: string;
  /** 話者の声の高さ（男性役 0.85 / 女性役 1.15 など） */
  pitch?: number;
}

/**
 * 複数行を順番に読み上げる（Part 3の会話など）。
 * onDone で次の行をチェーンし、行ごとに pitch を変えられる。
 */
export function speakLines(lines: SpeechLine[], opts: { slow?: boolean; accent?: Accent } = {}) {
  Speech.stop();
  const rate = (opts.slow ? 0.5 : 1.0) * rateScale;
  const language = ACCENT_LANG[opts.accent ?? 'US'];
  const next = (i: number) => {
    if (i >= lines.length) return;
    Speech.speak(lines[i].text, {
      language,
      rate,
      pitch: lines[i].pitch ?? 1.0,
      onDone: () => next(i + 1),
    });
  };
  next(0);
}

/** 話者ラベル（M/W）からTTSのpitchを決める */
export function pitchForSpeaker(speaker?: string): number {
  if (speaker === 'W') return 1.2;
  if (speaker === 'M') return 0.85;
  return 1.0;
}
