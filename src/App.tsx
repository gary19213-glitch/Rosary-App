import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  prayers,
  mysteryGroups,
  getSuggestedMystery,
  generateRosarySteps,
  type RosaryStep,
  type Prayer,
  type MysteryGroup,
} from './data/prayers';
import { useAudio } from './hooks/useAudio';
import CustomizeModal from './components/CustomizeModal';

// ─── LocalStorage helpers ─────────────────────────────────────────────────────
function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Cross SVG Icon ───────────────────────────────────────────────────────────
function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} fill="currentColor">
      <rect x="9" y="0" width="6" height="32" rx="1" />
      <rect x="2" y="7" width="20" height="6" rx="1" />
    </svg>
  );
}

// ─── Bead Progress Component ──────────────────────────────────────────────────
function BeadProgress({
  steps,
  currentIndex,
}: {
  steps: RosaryStep[];
  currentIndex: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const activeChild = el.children[currentIndex] as HTMLElement;
      if (activeChild) {
        const scrollLeft =
          activeChild.offsetLeft - el.clientWidth / 2 + activeChild.clientWidth / 2;
        el.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  // Compress beads: show meaningful markers
  const beadMarkers = useMemo(() => {
    return steps.map((step, i) => {
      let size = 'small';
      if (step.beadType === 'crucifix') size = 'crucifix';
      else if (step.beadType === 'our-father') size = 'large';
      else if (step.beadType === 'hail-mary') size = 'small';
      else if (step.beadType === 'separator') size = 'separator';
      else size = 'dot';

      return { ...step, size, index: i };
    });
  }, [steps]);

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-1 overflow-x-auto scroll-hide py-3 px-4"
    >
      {beadMarkers.map((bead, i) => {
        const isPast = i < currentIndex;
        const isCurrent = i === currentIndex;
        const baseColor = isPast
          ? 'bg-gold-500'
          : isCurrent
          ? 'bg-gold-300'
          : 'bg-purple-700/50';

        if (bead.size === 'crucifix') {
          return (
            <div
              key={i}
              className={`flex-shrink-0 flex items-center justify-center w-5 h-7 ${
                isCurrent ? 'text-gold-300 cross-glow' : isPast ? 'text-gold-500' : 'text-purple-600'
              }`}
            >
              <CrossIcon className="w-4 h-6" />
            </div>
          );
        }

        if (bead.size === 'large') {
          return (
            <div
              key={i}
              className={`flex-shrink-0 w-4 h-4 rounded-full border-2 ${
                isCurrent
                  ? 'border-gold-300 bg-gold-300 bead-active'
                  : isPast
                  ? 'border-gold-500 bg-gold-500'
                  : 'border-purple-600 bg-purple-800/50'
              }`}
            />
          );
        }

        if (bead.size === 'separator') {
          return (
            <div
              key={i}
              className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                isCurrent ? 'bg-gold-300 bead-active' : baseColor
              }`}
            />
          );
        }

        if (bead.size === 'dot') {
          return (
            <div
              key={i}
              className={`flex-shrink-0 w-1 h-1 rounded-full ${
                isCurrent ? 'bg-gold-300 bead-active' : baseColor
              }`}
            />
          );
        }

        // hail-mary small bead
        return (
          <div
            key={i}
            className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${
              isCurrent
                ? 'bg-gold-300 bead-active ring-2 ring-gold-300/50'
                : baseColor
            }`}
          />
        );
      })}
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({
  onStart,
  onOpenCustomize,
  canInstall,
  isInstalled,
  onInstall,
}: {
  onStart: (mystery: string) => void;
  onOpenCustomize: () => void;
  canInstall: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}) {
  const suggested = getSuggestedMystery();
  const [selected, setSelected] = useState(suggested);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = dayNames[new Date().getDay()];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <CrossIcon className="w-6 h-10 text-gold-400 cross-glow" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">Holy Rosary</h1>
        <p className="text-purple-300 text-sm">
          {today} — {mysteryGroups[suggested].title} suggested
        </p>
      </div>

      {/* Mystery Selection */}
      <div className="w-full max-w-md space-y-3 mb-8">
        <h2 className="text-gold-400 text-xs font-semibold uppercase tracking-wider px-1">
          Choose Your Mysteries
        </h2>
        {Object.entries(mysteryGroups).map(([key, group]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selected === key
                ? 'border-gold-500/50 bg-gold-900/20 shadow-lg shadow-gold-500/10'
                : 'border-purple-500/20 glass-card hover:border-purple-400/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{group.emoji}</span>
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    selected === key ? 'text-gold-200' : 'text-white'
                  }`}
                >
                  {group.title}
                </h3>
                <p className="text-purple-400 text-xs mt-0.5 line-clamp-1">
                  {group.mysteries.join(' • ')}
                </p>
              </div>
              {key === suggested && (
                <span className="text-[10px] font-semibold bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full">
                  TODAY
                </span>
              )}
              {selected === key && (
                <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center text-black text-xs">
                  ✓
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="w-full max-w-md space-y-3">
        <button
          onClick={() => onStart(selected)}
          className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-bold rounded-xl text-lg shadow-lg shadow-gold-500/25 transition-all active:scale-[0.98]"
        >
          🙏 Begin Rosary
        </button>
        <button
          onClick={onOpenCustomize}
          className="w-full py-3 glass-card border border-purple-500/20 text-purple-200 hover:text-white font-medium rounded-xl transition hover:border-purple-400/30"
        >
          ⚙️ Customize Prayers
        </button>

        {/* Install PWA Button */}
        {canInstall && (
          <button
            onClick={onInstall}
            className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-medium rounded-xl transition active:scale-[0.98] shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2"
          >
            <span className="text-lg">📲</span> Install App (Works Offline)
          </button>
        )}

        {isInstalled && (
          <div className="w-full py-2 text-center text-emerald-400 text-xs flex items-center justify-center gap-1.5">
            <span>✓</span> Installed — works offline
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-purple-600 text-xs mt-8 text-center">
        "The Rosary is the most beautiful and the most rich in graces of all prayers." — Pope Pius X
      </p>
    </div>
  );
}

// ─── Prayer Screen ────────────────────────────────────────────────────────────
function PrayerScreen({
  steps,
  currentIndex,
  onBack,
  onIndexChange,
  customPrayers,
  mysteryKey,
}: {
  steps: RosaryStep[];
  currentIndex: number;
  onBack: () => void;
  onIndexChange: (index: number) => void;
  customPrayers: Prayer[];
  mysteryKey: string;
}) {
  const mysteryData: MysteryGroup | undefined = mysteryGroups[mysteryKey];
  const { isSpeaking, autoPlay, setAutoPlay, speak, stopSpeaking } = useAudio();
  const [showComplete, setShowComplete] = useState(false);
  const lastAutoAdvancedRef = useRef(-1);

  const step = steps[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;
  const progress = ((currentIndex + 1) / steps.length) * 100;

  // Get prayer text
  const getPrayerText = useCallback(
    (prayerId: string) => {
      if (prayerId === '__mystery__') return '';
      if (prayers[prayerId]) return prayers[prayerId].text;
      const custom = customPrayers.find((p) => p.id === prayerId);
      return custom?.text || '';
    },
    [customPrayers]
  );

  const goNext = useCallback(() => {
    if (isLast) {
      setShowComplete(true);
      stopSpeaking();
      return;
    }
    stopSpeaking();
    const nextIndex = currentIndex + 1;
    onIndexChange(nextIndex);
  }, [currentIndex, isLast, onIndexChange, stopSpeaking]);

  const goPrev = useCallback(() => {
    if (isFirst) return;
    stopSpeaking();
    onIndexChange(currentIndex - 1);
  }, [currentIndex, isFirst, onIndexChange, stopSpeaking]);

  // Auto-play: speak current prayer and advance when done
  useEffect(() => {
    if (autoPlay && !isSpeaking && step && lastAutoAdvancedRef.current !== currentIndex) {
      const text = step.prayerId === '__mystery__'
        ? `${step.title}. ${step.subtitle?.replace('\n', '. ') || ''}`
        : getPrayerText(step.prayerId);
      
      if (text) {
        lastAutoAdvancedRef.current = currentIndex;
        // Small delay before speaking
        const timer = setTimeout(() => {
          speak(text, () => {
            // After speaking, auto advance
            if (!isLast) {
              setTimeout(() => goNext(), 800);
            }
          });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [autoPlay, currentIndex, step, isSpeaking, speak, goNext, isLast, getPrayerText]);

  // Stop autoplay when we toggle it off
  useEffect(() => {
    if (!autoPlay) {
      stopSpeaking();
      lastAutoAdvancedRef.current = -1;
    }
  }, [autoPlay, stopSpeaking]);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const text = step.prayerId === '__mystery__'
      ? `${step.title}. ${step.subtitle?.replace('\n', '. ') || ''}`
      : getPrayerText(step.prayerId);
    if (text) speak(text);
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  if (showComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="text-center">
          <div className="text-6xl mb-6">🕊️</div>
          <h2 className="text-3xl font-bold text-gold-300 mb-3">Rosary Complete</h2>
          <p className="text-purple-300 text-lg mb-2">
            May God bless you for your prayer.
          </p>
          <p className="text-purple-400 text-sm mb-8 max-w-sm mx-auto">
            "The Rosary is a powerful weapon to put the demons to flight." — Saint Padre Pio
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-xl shadow-lg transition active:scale-[0.98]"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const prayerText = getPrayerText(step.prayerId);
  const isMystery = step.prayerId === '__mystery__';

  // Section label
  const getSectionLabel = () => {
    if (step.section === 'opening') return 'Opening Prayers';
    if (step.section === 'closing') return 'Closing Prayers';
    if (step.decade) return `Decade ${step.decade}`;
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              stopSpeaking();
              onBack();
            }}
            className="text-purple-400 hover:text-white transition flex items-center gap-1 text-sm"
          >
            <span className="text-lg">←</span> Exit
          </button>
          <div className="text-purple-400 text-xs">
            {currentIndex + 1} / {steps.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                autoPlay
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                  : 'bg-purple-800/30 text-purple-400 border border-purple-500/20'
              }`}
            >
              {autoPlay ? '⏸ Auto' : '▶ Auto'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-purple-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bead Progress */}
      <div className="flex-shrink-0 border-b border-purple-500/10">
        <BeadProgress steps={steps} currentIndex={currentIndex} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-lg animate-fade-in" key={step.id}>
          {/* Section Label */}
          <div className="text-center mb-2">
            <span className="text-purple-500 text-xs font-medium uppercase tracking-widest">
              {getSectionLabel()}
            </span>
          </div>

          {/* Prayer Title */}
          <h2 className="text-2xl font-bold text-gold-300 text-center mb-1">
            {step.title}
          </h2>

          {/* Subtitle */}
          {step.subtitle && (
            <div className="text-center mb-6">
              {step.subtitle.split('\n').map((line, i) => (
                <p
                  key={i}
                  className={`${
                    i === 0 ? 'text-purple-300 text-sm' : 'text-purple-400 text-xs mt-1 italic'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Hail Mary Counter */}
          {step.hailMaryNum && step.hailMaryTotal && (
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {Array.from({ length: step.hailMaryTotal }, (_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i < step.hailMaryNum!
                      ? 'bg-gold-400'
                      : 'bg-purple-700/50'
                  } ${i === step.hailMaryNum! - 1 ? 'ring-2 ring-gold-400/50 scale-125' : ''}`}
                />
              ))}
            </div>
          )}

          {/* Mystery Display */}
          {isMystery && (() => {
            const decadeIndex = step.decade ? step.decade - 1 : 0;
            const bibleVerse = mysteryData?.bibleVerses?.[decadeIndex];
            const bibleRef = mysteryData?.bibleRefs?.[decadeIndex];
            const reflection = mysteryData?.reflections?.[decadeIndex];
            return (
              <div className="glass-card rounded-2xl p-6 text-center mb-4 space-y-4">
                <div className="text-4xl mb-1">🔮</div>
                <p className="text-white text-lg font-medium">
                  {step.subtitle?.split('\n')[0]}
                </p>
                <p className="text-purple-300 text-sm italic">
                  {step.subtitle?.split('\n')[1]}
                </p>

                {/* Bible Verse */}
                {bibleVerse && (
                  <div className="border-t border-purple-500/20 pt-4 mt-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-gold-400 text-sm">📖</span>
                      <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Scripture</span>
                    </div>
                    <p className="text-purple-100 text-sm leading-relaxed italic">
                      {bibleVerse}
                    </p>
                    <p className="text-gold-500/70 text-xs mt-2 font-medium">
                      — {bibleRef}
                    </p>
                  </div>
                )}

                {/* Contemplative Reflection */}
                {reflection && (
                  <div className="border-t border-purple-500/20 pt-4">
                    <p className="text-purple-300/90 text-sm leading-relaxed">
                      {reflection}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Prayer Text */}
          {prayerText && (
            <div className="glass-card rounded-2xl p-6">
              <p className="prayer-text text-purple-100 text-center leading-relaxed">
                {prayerText}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex-shrink-0 px-4 pb-6 pt-2">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Previous */}
          <button
            onClick={goPrev}
            disabled={isFirst}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
              isFirst
                ? 'text-purple-700 cursor-not-allowed'
                : 'glass-card text-purple-300 hover:text-white active:scale-95'
            }`}
          >
            <span className="text-2xl">‹</span>
          </button>

          {/* Speak Button */}
          <button
            onClick={handleSpeak}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition active:scale-95 ${
              isSpeaking
                ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30 animate-pulse-glow'
                : 'glass-card text-purple-300 hover:text-white'
            }`}
            title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
          >
            <span className="text-xl">{isSpeaking ? '🔊' : '🔈'}</span>
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-black flex items-center justify-center shadow-lg shadow-gold-500/25 transition active:scale-95"
          >
            <span className="text-2xl font-bold">{isLast ? '✓' : '›'}</span>
          </button>
        </div>

        {/* Hint */}
        <p className="text-purple-600 text-[10px] text-center mt-3">
          Use arrow keys or tap to navigate • Space to advance
        </p>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  // State
  const [screen, setScreen] = useState<'home' | 'prayer'>('home');
  const [selectedMystery, setSelectedMystery] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showCustomize, setShowCustomize] = useState(false);

  // PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prompt = deferredPrompt as any;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Persistent settings
  const [decadePrayers, setDecadePrayers] = useState<string[]>(() =>
    loadJSON('rosary_decadePrayers', ['fatimaPrayer'])
  );
  const [closingPrayers, setClosingPrayers] = useState<string[]>(() =>
    loadJSON('rosary_closingPrayers', ['hailHolyQueen', 'rosaryPrayer'])
  );
  const [customPrayers, setCustomPrayers] = useState<Prayer[]>(() =>
    loadJSON('rosary_customPrayers', [])
  );

  // Save to localStorage
  useEffect(() => saveJSON('rosary_decadePrayers', decadePrayers), [decadePrayers]);
  useEffect(() => saveJSON('rosary_closingPrayers', closingPrayers), [closingPrayers]);
  useEffect(() => saveJSON('rosary_customPrayers', customPrayers), [customPrayers]);

  // Register custom prayers in the prayers object so they're accessible
  useEffect(() => {
    customPrayers.forEach((cp) => {
      if (!prayers[cp.id]) {
        prayers[cp.id] = cp;
      }
    });
  }, [customPrayers]);

  // Generate steps
  const steps = useMemo(() => {
    if (!selectedMystery) return [];
    return generateRosarySteps(selectedMystery, decadePrayers, closingPrayers);
  }, [selectedMystery, decadePrayers, closingPrayers]);

  const handleStart = (mystery: string) => {
    setSelectedMystery(mystery);
    setCurrentStepIndex(0);
    setScreen('prayer');
  };

  const handleBack = () => {
    setScreen('home');
    setCurrentStepIndex(0);
  };

  const handleAddCustomPrayer = (prayer: Prayer) => {
    setCustomPrayers((prev) => [...prev, prayer]);
    // Also register in global prayers object
    prayers[prayer.id] = prayer;
  };

  const handleRemoveCustomPrayer = (id: string) => {
    setCustomPrayers((prev) => prev.filter((p) => p.id !== id));
    delete prayers[id];
  };

  return (
    <div className="min-h-screen text-white">
      {screen === 'home' && (
        <HomeScreen
          onStart={handleStart}
          onOpenCustomize={() => setShowCustomize(true)}
          canInstall={!!deferredPrompt && !isInstalled}
          isInstalled={isInstalled}
          onInstall={handleInstall}
        />
      )}

      {screen === 'prayer' && steps.length > 0 && (
        <PrayerScreen
          steps={steps}
          currentIndex={currentStepIndex}
          onBack={handleBack}
          onIndexChange={setCurrentStepIndex}
          customPrayers={customPrayers}
          mysteryKey={selectedMystery}
        />
      )}

      <CustomizeModal
        isOpen={showCustomize}
        onClose={() => setShowCustomize(false)}
        decadePrayers={decadePrayers}
        closingPrayers={closingPrayers}
        customPrayers={customPrayers}
        onUpdateDecadePrayers={setDecadePrayers}
        onUpdateClosingPrayers={setClosingPrayers}
        onAddCustomPrayer={handleAddCustomPrayer}
        onRemoveCustomPrayer={handleRemoveCustomPrayer}
      />
    </div>
  );
}
