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

export function speak(text: string, opts: { slow?: boolean } = {}) {
  Speech.stop();
  Speech.speak(text, {
    language: 'en-US',
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
export function speakLines(lines: SpeechLine[], opts: { slow?: boolean } = {}) {
  Speech.stop();
  const rate = (opts.slow ? 0.5 : 1.0) * rateScale;
  const next = (i: number) => {
    if (i >= lines.length) return;
    Speech.speak(lines[i].text, {
      language: 'en-US',
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
