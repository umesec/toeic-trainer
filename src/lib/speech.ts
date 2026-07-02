import * as Speech from 'expo-speech';

/**
 * 英語TTSの薄いラッパー。Web は Web Speech API、iOS は AVSpeechSynthesizer が使われる。
 * 音声変化（フラップT等）の再現度はOSの音声品質に依存する。
 */
export function speak(text: string, opts: { slow?: boolean } = {}) {
  Speech.stop();
  Speech.speak(text, {
    language: 'en-US',
    rate: opts.slow ? 0.5 : 1.0,
    pitch: 1.0,
  });
}

export function stopSpeech() {
  Speech.stop();
}
