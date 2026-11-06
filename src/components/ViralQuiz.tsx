import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Check, 
  Flame, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { calculateQuizResult, QuizPersona } from '../utils/toolsLogic';
import { AdBannerSlot } from './AdBannerSlot';

interface Question {
  id: number;
  question: string;
  options: Array<{
    label: string;
    sublabel: string;
    personaKey: 'cyber_architect' | 'meme_monarch' | 'digital_zen' | 'night_owl_hacker';
    icon: string;
  }>;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Your ideal Friday night online looks like:",
    options: [
      { label: "Optimizing my workspace, tinkering with shortcuts & productivity hacks", sublabel: "Efficiency is art", personaKey: 'cyber_architect', icon: "⚡" },
      { label: "Sharing unhinged memes in the group chat until 2 AM", sublabel: "Laughter is mandatory", personaKey: 'meme_monarch', icon: "👑" },
      { label: "Zero unread notifications, listening to ambient rain sounds", sublabel: "Peace of mind first", personaKey: 'digital_zen', icon: "🌿" },
      { label: "Diving down an obscure 4-hour rabbit hole about ancient cryptography", sublabel: "Curiosity never sleeps", personaKey: 'night_owl_hacker', icon: "🦉" },
    ],
  },
  {
    id: 2,
    question: "When a wild new internet trend blows up, your instant move is:",
    options: [
      { label: "Analyze how it works and whether it has real utility", sublabel: "Dissecting the architecture", personaKey: 'cyber_architect', icon: "📐" },
      { label: "Immediately remix it into a viral joke before anyone else", sublabel: "First on the punchline", personaKey: 'meme_monarch', icon: "🚀" },
      { label: "Mute the hashtag and go read a nice book or touch grass", sublabel: "Noise filter active", personaKey: 'digital_zen', icon: "☕" },
      { label: "Trace who started it and reverse-engineer the algorithm", sublabel: "Under the hood", personaKey: 'night_owl_hacker', icon: "🔍" },
    ],
  },
  {
    id: 3,
    question: "Be honest: how do you manage your browser tabs?",
    options: [
      { label: "Pinned tab groups with custom color categories", sublabel: "Pure structured elegance", personaKey: 'cyber_architect', icon: "📂" },
      { label: "70 tabs open across 3 windows, relying entirely on vibes", sublabel: "Organized chaos", personaKey: 'meme_monarch', icon: "🌪️" },
      { label: "Max 5 tabs. When I'm done with one, it gets closed instantly", sublabel: "Zen minimalism", personaKey: 'digital_zen', icon: "🧘" },
      { label: "Tabs from 3 weeks ago saved in an encrypted session file", sublabel: "Digital archaeologist", personaKey: 'night_owl_hacker', icon: "💾" },
    ],
  },
  {
    id: 4,
    question: "Pick your signature digital weapon:",
    options: [
      { label: "Command line terminal & custom keyboard shortcuts", sublabel: "Max speed & power", personaKey: 'cyber_architect', icon: "⌨️" },
      { label: "A reaction GIF that renders the entire chat speechless", sublabel: "Emotional critical hit", personaKey: 'meme_monarch', icon: "🎭" },
      { label: "Do Not Disturb mode toggled permanently ON", sublabel: "Shield of invulnerability", personaKey: 'digital_zen', icon: "🛡️" },
      { label: "A 32-character uncrackable password with 2FA hardware key", sublabel: "Absolute fortress", personaKey: 'night_owl_hacker', icon: "🔐" },
    ],
  },
  {
    id: 5,
    question: "What is your #1 rule for living in the digital era?",
    options: [
      { label: "Automate everything that can be automated", sublabel: "Work smarter, not harder", personaKey: 'cyber_architect', icon: "🤖" },
      { label: "Never take internet discourse too seriously", sublabel: "Life is for having fun", personaKey: 'meme_monarch', icon: "🎉" },
      { label: "Protect your attention like your most valuable currency", sublabel: "Energy conservation", personaKey: 'digital_zen', icon: "🕯️" },
      { label: "Stay curious, question defaults, keep exploring", sublabel: "Seek the truth", personaKey: 'night_owl_hacker', icon: "🌌" },
    ],
  },
];

export const ViralQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizPersona | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const handleSelectOption = (personaKey: string) => {
    const updated = { ...answers, [currentStep]: personaKey };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final result
      const persona = calculateQuizResult(updated);
      setResult(persona);
      
      // Trigger joyful celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#a855f7', '#ec4899', '#10b981'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleShare = () => {
    if (!result) return;
    const shareText = `✨ I took the Viral Digital Persona Quiz and got: "${result.title}" (Vibe Score: ${result.vibeScore}%).\nWhat's your internet archetype? Test yourself on PulseHub: ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Quiz Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Viral Personality Quiz</h3>
            <p className="text-xs text-slate-400">What is your true digital persona archetype?</p>
          </div>
        </div>

        {!result && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400">
              Q{currentStep + 1}/{QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {/* Progress Line */}
      {!result && (
        <div className="mt-3 w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Question Card or Results */}
      {!result ? (
        <div className="mt-5 space-y-4">
          <h4 className="text-lg font-semibold text-white tracking-tight leading-snug">
            {currentQ.question}
          </h4>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt.personaKey)}
                className="group flex flex-col items-start rounded-xl bg-slate-950 border border-slate-800/80 p-4 text-left hover:border-cyan-500/60 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-cyan-500/5 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-2xl" role="img" aria-label="choice emoji">
                    {opt.icon}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {opt.label}
                </div>
                <div className="mt-0.5 text-xs text-slate-400 group-hover:text-slate-300">
                  {opt.sublabel}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Takes under 30 seconds</span>
            <span>Over 12,400+ participants today</span>
          </div>
        </div>
      ) : (
        /* Result Showcase Screen */
        <div className="mt-5 space-y-4">
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${result.color} p-0.5 shadow-2xl`}>
            <div className="rounded-[15px] bg-slate-950/95 p-6 backdrop-blur">
              {/* Badge & Vibe Score */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your Archetype
                </span>
                <div className="flex items-center gap-1 text-xs font-mono bg-purple-950/60 text-purple-300 px-3 py-1 rounded-full border border-purple-800/50">
                  <TrendingUp className="h-3 w-3" />
                  <span>Vibe Score: {result.vibeScore}%</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-4">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {result.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-cyan-300">
                  "{result.tagline}"
                </p>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Archetype Traits */}
              <div className="mt-4 flex flex-wrap gap-2">
                {result.traits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-800"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>

              {/* Social Share & Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-purple-500 hover:to-cyan-500 transition-all cursor-pointer"
                >
                  {copiedShare ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  <span>{copiedShare ? 'Result Copied to Clipboard!' : 'Share Your Persona'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake</span>
                </button>
              </div>
            </div>
          </div>

          {/* High-Converting Adsterra In-Feed Slot Below Quiz Result */}
          <AdBannerSlot
            slotType="between-results"
            title="Adsterra High-CTR Result Banner"
          />
        </div>
      )}
    </div>
  );
};
