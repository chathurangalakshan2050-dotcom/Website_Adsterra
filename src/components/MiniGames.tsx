import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  MousePointerClick, 
  RotateCcw, 
  Trophy, 
  Share2, 
  Check, 
  Volume2, 
  VolumeX,
  Gauge
} from 'lucide-react';
import { calculateReactionGrade, calculateCpsGrade } from '../utils/toolsLogic';

type GameTab = 'reaction' | 'clicker';
type ReactionState = 'idle' | 'waiting' | 'ready' | 'tooEarly' | 'result';

export const MiniGames: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GameTab>('reaction');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Reaction Test States
  const [reactionState, setReactionState] = useState<ReactionState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestReaction, setBestReaction] = useState<number | null>(() => {
    const saved = localStorage.getItem('pulsehub_best_reaction');
    return saved ? Number(saved) : null;
  });
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // CPS Clicker States
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [cpsResult, setCpsResult] = useState<{ total: number; cps: number } | null>(null);
  const [bestCps, setBestCps] = useState<number | null>(() => {
    const saved = localStorage.getItem('pulsehub_best_cps');
    return saved ? Number(saved) : null;
  });
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [copiedGameScore, setCopiedGameScore] = useState<boolean>(false);

  // Synthesize Web Audio sound effects without any external files
  const playTone = (frequency: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext may require user gesture on some strict browsers
    }
  };

  // ---------------- Reaction Test Handlers ----------------
  const startReactionTest = () => {
    setReactionState('waiting');
    setReactionTime(null);
    playTone(400, 'sine', 0.08);

    const randomDelay = Math.floor(Math.random() * 2500) + 1500; // 1.5s - 4.0s
    timeoutRef.current = setTimeout(() => {
      setReactionState('ready');
      startTimeRef.current = performance.now();
      playTone(880, 'triangle', 0.12);
    }, randomDelay);
  };

  const handleReactionAreaClick = () => {
    if (reactionState === 'idle') {
      startReactionTest();
    } else if (reactionState === 'waiting') {
      // Clicked too early!
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setReactionState('tooEarly');
      playTone(220, 'sawtooth', 0.2);
    } else if (reactionState === 'ready') {
      // Successful click!
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setReactionState('result');
      playTone(1050, 'sine', 0.15);

      if (!bestReaction || elapsed < bestReaction) {
        setBestReaction(elapsed);
        localStorage.setItem('pulsehub_best_reaction', String(elapsed));
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } else if (reactionState === 'tooEarly' || reactionState === 'result') {
      startReactionTest();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // ---------------- CPS Clicker Handlers ----------------
  const handleCpsClick = () => {
    if (!isClicking && timeLeft === 10 && !cpsResult) {
      // Start session on first click
      setIsClicking(true);
      setClicks(1);
      playTone(600, 'sine', 0.04);

      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setIsClicking(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isClicking && timeLeft > 0) {
      setClicks(prev => prev + 1);
      playTone(500 + Math.min(600, clicks * 15), 'sine', 0.03);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && clicks > 0 && !cpsResult) {
      const finalCps = Number((clicks / 10).toFixed(1));
      setCpsResult({ total: clicks, cps: finalCps });
      if (!bestCps || finalCps > bestCps) {
        setBestCps(finalCps);
        localStorage.setItem('pulsehub_best_cps', String(finalCps));
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }
  }, [timeLeft, clicks, cpsResult, bestCps]);

  const handleResetCps = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsClicking(false);
    setClicks(0);
    setTimeLeft(10);
    setCpsResult(null);
  };

  const handleShareGame = () => {
    let text = '';
    if (activeTab === 'reaction' && reactionTime) {
      const grade = calculateReactionGrade(reactionTime);
      text = `⚡ My Reaction Speed: ${reactionTime}ms (${grade.rank} - ${grade.percentile})!\nCan you beat my reflexes? Test yourself on PulseHub: ${window.location.href}`;
    } else if (activeTab === 'clicker' && cpsResult) {
      const grade = calculateCpsGrade(cpsResult.cps);
      text = `🔥 I hit ${cpsResult.cps} CPS (${cpsResult.total} clicks in 10s) on the PulseHub Cyber Clicker! (${grade.title})\nBeat my score: ${window.location.href}`;
    } else {
      text = `🎮 Test your reaction speed and clicking reflex on PulseHub! ${window.location.href}`;
    }
    navigator.clipboard.writeText(text);
    setCopiedGameScore(true);
    setTimeout(() => setCopiedGameScore(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Header with Game Switcher & Sound Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Viral Reflex Games</h3>
            <p className="text-xs text-slate-400">Compete, benchmark your speed & share high scores</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable sound effects'}
            aria-label="Toggle game audio"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('reaction')}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'reaction'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gauge className="h-4 w-4" />
          <span>Reaction Speed Test</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('clicker')}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'clicker'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MousePointerClick className="h-4 w-4" />
          <span>10s Cyber CPS Clicker</span>
        </button>
      </div>

      {/* GAME 1: REACTION SPEED TEST */}
      {activeTab === 'reaction' && (
        <div className="mt-4 space-y-3">
          {/* Reaction Interactive Box */}
          <div
            onClick={handleReactionAreaClick}
            className={`relative flex min-h-[220px] sm:min-h-[240px] flex-col items-center justify-center rounded-2xl p-6 text-center transition-all duration-150 cursor-pointer select-none border ${
              reactionState === 'idle'
                ? 'bg-slate-950 hover:bg-slate-900/90 border-slate-800 text-slate-300'
                : reactionState === 'waiting'
                ? 'bg-rose-950/70 border-rose-600 text-rose-200'
                : reactionState === 'ready'
                ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/30'
                : reactionState === 'tooEarly'
                ? 'bg-amber-950/70 border-amber-600 text-amber-200'
                : 'bg-slate-950 border-purple-500/50 text-white'
            }`}
          >
            {reactionState === 'idle' && (
              <>
                <Zap className="h-10 w-10 text-cyan-400 animate-bounce mb-2" />
                <h4 className="text-lg font-bold text-white">Click Anywhere to Begin</h4>
                <p className="mt-1 text-xs text-slate-400">
                  When the red screen turns <span className="text-emerald-400 font-semibold">GREEN</span>, click as fast as humanly possible!
                </p>
              </>
            )}

            {reactionState === 'waiting' && (
              <>
                <div className="h-4 w-4 rounded-full bg-rose-500 animate-ping mb-3" />
                <h4 className="text-xl font-black tracking-tight text-rose-100">WAIT FOR GREEN...</h4>
                <p className="mt-1 text-xs text-rose-300/80">Keep your finger hovering on the trigger</p>
              </>
            )}

            {reactionState === 'ready' && (
              <>
                <h4 className="text-3xl font-black tracking-tight text-slate-950 animate-pulse">
                  CLICK NOW!
                </h4>
                <p className="mt-1 text-xs font-semibold text-slate-900">TAP AS FAST AS YOU CAN</p>
              </>
            )}

            {reactionState === 'tooEarly' && (
              <>
                <h4 className="text-xl font-bold text-amber-300">Too Early! ⚠️</h4>
                <p className="mt-1 text-xs text-amber-200/80">You clicked before it turned green. Click to retry.</p>
              </>
            )}

            {reactionState === 'result' && reactionTime !== null && (
              <>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Your Reaction Time</div>
                <div className="mt-1 font-mono text-5xl font-black text-cyan-400 tabular-nums">
                  {reactionTime} <span className="text-2xl font-bold text-slate-400">ms</span>
                </div>
                {(() => {
                  const grade = calculateReactionGrade(reactionTime);
                  return (
                    <div className="mt-2 flex flex-col items-center">
                      <span className={`text-base font-bold ${grade.color}`}>{grade.rank}</span>
                      <span className="text-xs text-slate-400">Performance: {grade.percentile}</span>
                    </div>
                  );
                })()}
                <p className="mt-3 text-xs text-slate-500">Click anywhere to test again</p>
              </>
            )}
          </div>

          {/* High Score & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Personal Best:</span>
              <span className="font-mono font-bold text-white">
                {bestReaction ? `${bestReaction} ms` : 'None yet'}
              </span>
            </div>

            {reactionTime !== null && (
              <button
                type="button"
                onClick={handleShareGame}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedGameScore ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copiedGameScore ? 'Copied Link!' : 'Share Score'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* GAME 2: CYBER CPS CLICKER */}
      {activeTab === 'clicker' && (
        <div className="mt-4 space-y-3">
          {/* CPS Dashboard Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Time Left</div>
              <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">{timeLeft}s</div>
            </div>
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Clicks</div>
              <div className="text-2xl font-bold font-mono text-purple-400 tabular-nums">{clicks}</div>
            </div>
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Live CPS</div>
              <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                {timeLeft < 10 ? (clicks / (10 - timeLeft)).toFixed(1) : '0.0'}
              </div>
            </div>
          </div>

          {/* Main Tapping Pad */}
          <div
            onClick={handleCpsClick}
            className={`relative flex min-h-[190px] flex-col items-center justify-center rounded-2xl p-6 text-center select-none border transition-all cursor-pointer ${
              timeLeft > 0
                ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-purple-500/40 active:scale-[0.98] hover:border-cyan-500/60'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            {timeLeft > 0 && !isClicking && clicks === 0 && (
              <>
                <MousePointerClick className="h-10 w-10 text-purple-400 animate-pulse mb-2" />
                <h4 className="text-lg font-bold text-white">Click or Tap Repeatedly to Start!</h4>
                <p className="mt-1 text-xs text-slate-400">10-second speed burst challenge</p>
              </>
            )}

            {isClicking && timeLeft > 0 && (
              <>
                <div className="text-5xl font-black font-mono text-white tabular-nums tracking-tight">
                  {clicks}
                </div>
                <div className="mt-1 text-xs font-semibold text-cyan-400 uppercase tracking-widest animate-pulse">
                  Keep Tapping Fast! 🔥
                </div>
              </>
            )}

            {timeLeft === 0 && cpsResult && (
              <div className="flex flex-col items-center">
                <div className="text-xs font-mono uppercase text-slate-400">Test Complete</div>
                <div className="mt-1 text-4xl font-black font-mono text-cyan-400 tabular-nums">
                  {cpsResult.cps} <span className="text-lg text-slate-400">CPS</span>
                </div>
                {(() => {
                  const grade = calculateCpsGrade(cpsResult.cps);
                  return (
                    <div className="mt-2 flex flex-col items-center">
                      <span className="rounded-full bg-purple-500/20 px-3 py-0.5 text-xs font-bold text-purple-300 border border-purple-500/40 mb-1">
                        {grade.badge}
                      </span>
                      <span className="text-sm font-semibold text-slate-200">{grade.title}</span>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Actions & Personal Best */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Record CPS:</span>
              <span className="font-mono font-bold text-white">
                {bestCps ? `${bestCps} CPS` : 'None yet'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetCps}
                className="flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
              {cpsResult && (
                <button
                  type="button"
                  onClick={handleShareGame}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white shadow transition-colors cursor-pointer"
                >
                  {copiedGameScore ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copiedGameScore ? 'Copied!' : 'Share Result'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
