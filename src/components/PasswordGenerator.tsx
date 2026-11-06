import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles,
  History,
  SlidersHorizontal
} from 'lucide-react';
import { generatePassword, calculatePasswordStrength, PasswordOptions } from '../utils/toolsLogic';

export const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: false,
  });

  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [copiedHistoryIndex, setCopiedHistoryIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setHistory(prev => [newPassword, ...prev.filter(p => p !== newPassword)].slice(0, 5));
  };

  useEffect(() => {
    handleGenerate();
  }, [options.length, options.includeUppercase, options.includeLowercase, options.includeNumbers, options.includeSymbols, options.excludeAmbiguous]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyHistory = (pwd: string, index: number) => {
    navigator.clipboard.writeText(pwd);
    setCopiedHistoryIndex(index);
    setTimeout(() => setCopiedHistoryIndex(null), 1500);
  };

  const strength = calculatePasswordStrength(password);

  const getStrengthBarColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-rose-500';
      case 1: return 'bg-amber-500';
      case 2: return 'bg-yellow-400';
      case 3: return 'bg-cyan-400';
      case 4: return 'bg-emerald-400';
      default: return 'bg-slate-700';
    }
  };

  const applyPreset = (len: number, symbols: boolean) => {
    setOptions(prev => ({
      ...prev,
      length: len,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: symbols,
    }));
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md transition-all hover:border-slate-700">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Fast Password Generator</h3>
            <p className="text-xs text-slate-400">Cryptographically secure, instant entropy analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-800/40">
          <Sparkles className="h-3 w-3" />
          <span>Client-Side Only</span>
        </div>
      </div>

      {/* Main Password Output Screen */}
      <div className="mt-4 relative group">
        <div className="flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 p-3.5 pl-4 focus-within:border-purple-500/60 transition-colors">
          <input
            type="text"
            readOnly
            value={password}
            aria-label="Generated password"
            className="w-full bg-transparent font-mono text-lg font-semibold tracking-wider text-cyan-300 focus:outline-none select-all"
          />
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              type="button"
              onClick={handleGenerate}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
              title="Regenerate password"
              aria-label="Generate new password"
            >
              <RefreshCw className="h-4 w-4 active:rotate-180 transition-transform duration-300" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold shadow-md transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500'
              }`}
              aria-label="Copy password to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Password Strength Indicator Meter */}
        <div className="mt-3 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/60">
          <div className="flex items-center justify-between text-xs pb-1.5">
            <div className="flex items-center gap-1.5 font-medium">
              {strength.score >= 3 ? (
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
              )}
              <span className="text-slate-300">Security:</span>
              <span className={`font-semibold ${
                strength.score === 4 ? 'text-emerald-400' :
                strength.score === 3 ? 'text-cyan-400' :
                strength.score === 2 ? 'text-yellow-400' : 'text-rose-400'
              }`}>
                {strength.label}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Entropy: <span className="text-purple-300 font-bold">{strength.entropy} bits</span> · Crack time: <span className="text-slate-300">{strength.crackTime}</span>
            </div>
          </div>

          {/* 5-Step Progress Bar */}
          <div className="grid grid-cols-5 gap-1.5 h-1.5 mt-1">
            {[0, 1, 2, 3, 4].map(idx => (
              <div
                key={idx}
                className={`rounded-full transition-all duration-300 ${
                  idx <= strength.score ? getStrengthBarColor(strength.score) : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
          <SlidersHorizontal className="h-3 w-3" /> Presets:
        </span>
        <button
          type="button"
          onClick={() => applyPreset(4, false)}
          className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
            options.length === 4 && !options.includeSymbols
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          PIN (4)
        </button>
        <button
          type="button"
          onClick={() => applyPreset(16, true)}
          className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
            options.length === 16 && options.includeSymbols
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Standard (16)
        </button>
        <button
          type="button"
          onClick={() => applyPreset(24, true)}
          className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
            options.length === 24
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Ultra Safe (24)
        </button>
        <button
          type="button"
          onClick={() => applyPreset(32, true)}
          className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
            options.length === 32
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Fort Knox (32)
        </button>
      </div>

      {/* Length Slider Controls */}
      <div className="mt-4 space-y-3 rounded-xl bg-slate-950/40 p-3.5 border border-slate-800/60">
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
            <label htmlFor="pwd-length" className="cursor-pointer">Password Length</label>
            <span className="font-mono text-sm font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {options.length} chars
            </span>
          </div>
          <input
            id="pwd-length"
            type="range"
            min={4}
            max={64}
            value={options.length}
            onChange={e => setOptions({ ...options, length: Number(e.target.value) })}
            className="w-full accent-cyan-400 bg-slate-800 cursor-pointer h-2 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span>4</span>
            <span>16</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        {/* Checkbox Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={e => setOptions({ ...options, includeUppercase: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-purple-500 accent-purple-500 h-4 w-4"
            />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={e => setOptions({ ...options, includeLowercase: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-purple-500 accent-purple-500 h-4 w-4"
            />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={e => setOptions({ ...options, includeNumbers: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-purple-500 accent-purple-500 h-4 w-4"
            />
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={e => setOptions({ ...options, includeSymbols: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-purple-500 accent-purple-500 h-4 w-4"
            />
            <span>Symbols (!@#$)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none col-span-2 sm:col-span-1">
            <input
              type="checkbox"
              checked={options.excludeAmbiguous}
              onChange={e => setOptions({ ...options, excludeAmbiguous: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-purple-500 accent-purple-500 h-4 w-4"
            />
            <span>No Ambiguous (1, l, O)</span>
          </label>
        </div>
      </div>

      {/* History of Generated Passwords */}
      {history.length > 1 && (
        <div className="mt-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2">
            <History className="h-3 w-3" />
            <span>Recent Passwords:</span>
          </div>
          <div className="space-y-1.5">
            {history.slice(1, 4).map((hPwd, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-slate-950/80 px-2.5 py-1.5 text-xs font-mono text-slate-400 border border-slate-800/40"
              >
                <span className="truncate max-w-[240px] text-slate-300">{hPwd}</span>
                <button
                  type="button"
                  onClick={() => handleCopyHistory(hPwd, idx)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedHistoryIndex === idx ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedHistoryIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
