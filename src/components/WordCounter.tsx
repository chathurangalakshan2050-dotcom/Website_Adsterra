import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Trash2, 
  Clock, 
  Mic, 
  BarChart3
} from 'lucide-react';
import { analyzeText } from '../utils/toolsLogic';

const SAMPLE_TEXT = `The future belongs to those who build fast, create relentlessly, and iterate with passion. In an era dominated by hyper-speed internet culture, mastering both simple daily utility tools and interactive experiences is the ultimate cheat code for creators, developers, and digital nomads alike.`;

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [copied, setCopied] = useState<boolean>(false);

  const metrics = analyzeText(text);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const handleTransform = (type: 'upper' | 'lower' | 'title' | 'cleanSpaces') => {
    if (!text) return;
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.replace(
            /\w\S*/g,
            txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
        );
        break;
      case 'cleanSpaces':
        setText(text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim());
        break;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md transition-all hover:border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Word & Character Counter</h3>
            <p className="text-xs text-slate-400">Live speed metrics, reading time & keyword density</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setText(SAMPLE_TEXT)}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-mono bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40 cursor-pointer"
        >
          Load Sample
        </button>
      </div>

      {/* Real-time KPI Metric Cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="rounded-xl bg-slate-950 p-3 border border-slate-800/80">
          <div className="text-[11px] font-medium text-slate-400">Words</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">{metrics.words}</div>
        </div>
        <div className="rounded-xl bg-slate-950 p-3 border border-slate-800/80">
          <div className="text-[11px] font-medium text-slate-400">Characters</div>
          <div className="text-2xl font-bold font-mono text-purple-400 tabular-nums">{metrics.characters}</div>
          <div className="text-[10px] text-slate-500 font-mono">No spaces: {metrics.charactersNoSpaces}</div>
        </div>
        <div className="rounded-xl bg-slate-950 p-3 border border-slate-800/80">
          <div className="text-[11px] font-medium text-slate-400">Sentences</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">{metrics.sentences}</div>
        </div>
        <div className="rounded-xl bg-slate-950 p-3 border border-slate-800/80">
          <div className="text-[11px] font-medium text-slate-400">Paragraphs</div>
          <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">{metrics.paragraphs}</div>
        </div>
      </div>

      {/* Textarea Input Field */}
      <div className="mt-3 relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={5}
          aria-label="Text counter input"
          className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 font-sans text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500/60 focus:outline-none transition-colors leading-relaxed"
        />
        {text && (
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur px-2 py-1 rounded-md border border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>{metrics.characters} chars</span>
          </div>
        )}
      </div>

      {/* Formatting & Clean Action Toolbar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleTransform('upper')}
            className="rounded-md bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            UPPERCASE
          </button>
          <button
            type="button"
            onClick={() => handleTransform('lower')}
            className="rounded-md bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            lowercase
          </button>
          <button
            type="button"
            onClick={() => handleTransform('title')}
            className="rounded-md bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            Title Case
          </button>
          <button
            type="button"
            onClick={() => handleTransform('cleanSpaces')}
            className="rounded-md bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            title="Clean redundant whitespaces"
          >
            Trim Spaces
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold shadow transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white'
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Reading & Speaking Estimates + Keyword Density */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-800/60 text-xs">
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Reading:</span>
            <span className="font-semibold text-slate-200 font-mono">
              ~{metrics.readingTimeMinutes} min
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mic className="h-3.5 w-3.5 text-purple-400" />
            <span>Speaking:</span>
            <span className="font-semibold text-slate-200 font-mono">
              ~{metrics.speakingTimeMinutes} min
            </span>
          </div>
        </div>

        {metrics.topWords.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap sm:justify-end text-slate-400">
            <BarChart3 className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-[11px]">Top words:</span>
            {metrics.topWords.slice(0, 3).map((w, idx) => (
              <span key={idx} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-300">
                {w.word} ({w.count})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
