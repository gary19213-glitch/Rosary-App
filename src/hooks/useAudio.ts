import { useRef, useState, useCallback, useEffect } from 'react';

export function useAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const onEndCallbackRef = useRef<(() => void) | null>(null);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  // Play a gentle bell/chime sound
  const playChime = useCallback((frequency = 800, duration = 0.4) => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.8, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio might not be available
    }
  }, [getAudioCtx]);

  // Play a deeper bell for transitions
  const playBell = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;

      // Create a richer bell sound with harmonics
      const fundamentalFreq = 440;
      const harmonics = [1, 2, 3, 4.5];
      const amplitudes = [0.12, 0.06, 0.03, 0.015];
      const duration = 1.5;

      harmonics.forEach((harmonic, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamentalFreq * harmonic, now);

        gain.gain.setValueAtTime(amplitudes[i], now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {
      // Audio might not be available
    }
  }, [getAudioCtx]);

  // Speak prayer text using SpeechSynthesis
  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      onEndCallbackRef.current = onEnd || null;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Try to pick a nice voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google'))
      );
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEndCallbackRef.current) {
          onEndCallbackRef.current();
        }
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    onEndCallbackRef.current = null;
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking,
    autoPlay,
    setAutoPlay,
    speak,
    stopSpeaking,
    playChime,
    playBell,
  };
}
