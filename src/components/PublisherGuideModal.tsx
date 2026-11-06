import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  DollarSign, 
  TrendingUp,
  FileCode
} from 'lucide-react';

interface PublisherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublisherGuideModal: React.FC<PublisherGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const SNIPPETS = [
    {
      id: 'leaderboard',
      title: '1. Adsterra Leaderboard (728×90 Desktop / 320×50 Mobile)',
      desc: 'Placed right below the top navigation. Delivers highest viewability rates.',
      code: `<!-- Adsterra Leaderboard Banner Slot -->
<script type="text/javascript">
  atOptions = {
    'key' : 'YOUR_ADSTERRA_728x90_KEY',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/YOUR_KEY/invoke.js"></script>`,
    },
    {
      id: 'sidebar',
      title: '2. Adsterra Medium Rectangle (300×250)',
      desc: 'Placed in the sidebar or between utility tool sections. Optimal for high CPMs.',
      code: `<!-- Adsterra 300x250 Native/Display Slot -->
<script type="text/javascript">
  atOptions = {
    'key' : 'YOUR_ADSTERRA_300x250_KEY',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/YOUR_KEY/invoke.js"></script>`,
    },
    {
      id: 'socialbar',
      title: '3. Adsterra Social Bar (Floating Push/Banner - 20x CTR)',
      desc: 'Highest CTR format that works on iOS, Android & Desktop without opt-in permissions.',
      code: `<!-- Adsterra Social Bar Integration Zone -->
<script type='text/javascript' src='//pl12345678.highperformanceformat.com/ab/cd/ef/abcdef0123456789.js'></script>`,
    },
    {
      id: 'infeed',
      title: '4. Native Banner (Result & Between-Tools In-Feed)',
      desc: 'Blends seamlessly beneath quiz results and tool generators to catch engaged visitors.',
      code: `<!-- Adsterra Native In-Feed Placement -->
<script async="async" data-cfasync="false" src="//pl12345678.highperformanceformat.com/YOUR_NATIVE_KEY/invoke.js"></script>
<div id="container-YOUR_NATIVE_KEY"></div>`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-white tracking-tight">Adsterra Monetization Guide</h2>
              <p className="text-xs text-slate-400">Plug & Play Ad Placement Architecture for Webmasters</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Overview Box */}
        <div className="mt-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-950 p-4 border border-cyan-800/40">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            <TrendingUp className="h-4 w-4" />
            <span>Optimal Monetization Strategy</span>
          </div>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            This website is engineered specifically for viral utility & mini-games to maximize session duration (2+ minutes avg) and lower bounce rates. All ad slots are labeled with clear HTML comment anchors like <code className="text-cyan-300 font-mono text-[11px]">&lt;!-- Adsterra ... --&gt;</code> so you can swap in your real tags in seconds.
          </p>
        </div>

        {/* Code Snippets List */}
        <div className="mt-5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FileCode className="h-3.5 w-3.5 text-purple-400" />
            <span>Adsterra Ready Code Snippets</span>
          </h3>

          {SNIPPETS.map(snippet => (
            <div key={snippet.id} className="rounded-xl bg-slate-950 border border-slate-800 p-3.5">
              <div className="flex items-start justify-between gap-2 pb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{snippet.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{snippet.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(snippet.id, snippet.code)}
                  className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-xs text-cyan-300 hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedKey === snippet.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === snippet.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-slate-900/90 p-2.5 font-mono text-[11px] text-slate-300 border border-slate-800 leading-relaxed">
                {snippet.code}
              </pre>
            </div>
          ))}
        </div>

        {/* Close & Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
