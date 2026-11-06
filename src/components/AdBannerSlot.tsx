import React, { useState } from 'react';
import { Sparkles, Code2, ExternalLink, Check, Copy } from 'lucide-react';

export type AdSlotType = 
  | 'header-leaderboard' 
  | 'sidebar-rectangle' 
  | 'infeed-native' 
  | 'between-results' 
  | 'sticky-bottom-banner';

interface AdBannerSlotProps {
  slotType: AdSlotType;
  title?: string;
  className?: string;
  onOpenPublisherGuide?: () => void;
}

export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  slotType,
  title,
  className = '',
  onOpenPublisherGuide,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const getSlotDetails = () => {
    switch (slotType) {
      case 'header-leaderboard':
        return {
          dimensions: '728×90 Desktop / 320×50 Mobile',
          adsterraType: 'Leaderboard Banner',
          codeSnippet: `<!-- Adsterra Leaderboard Banner 728x90 / 320x50 -->
<script type="text/javascript">
  atOptions = {
    'key' : 'YOUR_ADSTERRA_BANNER_KEY_HERE',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/YOUR_KEY/invoke.js"></script>`,
        };
      case 'sidebar-rectangle':
        return {
          dimensions: '300×250 Medium Rectangle',
          adsterraType: 'Native / Display Rectangle',
          codeSnippet: `<!-- Adsterra Medium Rectangle 300x250 -->
<script type="text/javascript">
  atOptions = {
    'key' : 'YOUR_ADSTERRA_RECTANGLE_KEY',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/YOUR_KEY/invoke.js"></script>`,
        };
      case 'infeed-native':
      case 'between-results':
        return {
          dimensions: 'Responsive Native In-Feed (468×60 / 728×90)',
          adsterraType: 'Native In-Feed Banner (High CTR)',
          codeSnippet: `<!-- Adsterra In-Feed Native Banner Slot -->
<script async="async" data-cfasync="false" src="//pl12345678.highperformanceformat.com/YOUR_KEY/invoke.js"></script>
<div id="container-YOUR_KEY"></div>`,
        };
      case 'sticky-bottom-banner':
        return {
          dimensions: '320×50 / 728×90 Sticky Anchor',
          adsterraType: 'Anchor Ad Placement',
          codeSnippet: `<!-- Adsterra Mobile Sticky Bottom 320x50 -->
<div class="fixed bottom-0 left-0 right-0 z-30 flex justify-center bg-slate-950/90 py-1">
  <!-- Place Adsterra 320x50 Script Here -->
</div>`,
        };
    }
  };

  const details = getSlotDetails();

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(details.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group overflow-hidden rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-3 transition-all hover:border-cyan-500/50 ${className}`}>
      {/* Top Header Tag */}
      <div className="flex items-center justify-between pb-2 text-[11px] font-medium text-slate-400">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="uppercase tracking-wider text-slate-300 font-mono text-[10px] truncate">
            {title || `Adsterra ${details.adsterraType}`}
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-500 font-mono text-[10px] hidden sm:inline">{details.dimensions}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-cyan-300 hover:bg-slate-700 transition-colors"
            title="Inspect Adsterra script tag"
          >
            <Code2 className="h-3 w-3" />
            <span>{showCode ? 'Hide Code' : 'Adsterra Tag'}</span>
          </button>
          {onOpenPublisherGuide && (
            <button
              type="button"
              onClick={onOpenPublisherGuide}
              className="hidden sm:flex items-center gap-1 text-[10px] text-purple-300 hover:text-purple-200"
            >
              <Sparkles className="h-3 w-3" />
              <span>Setup Guide</span>
            </button>
          )}
        </div>
      </div>

      {/* Code Inspector Disclosure */}
      {showCode ? (
        <div className="mt-2 rounded-lg bg-slate-950 p-2.5 font-mono text-[11px] text-slate-300 border border-slate-800">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 mb-2">
            <span className="text-cyan-400 font-semibold text-[10px]">HTML & JS Integration Snippet:</span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto whitespace-pre text-[10px] text-slate-400 leading-relaxed">
            {details.codeSnippet}
          </pre>
        </div>
      ) : (
        /* High-Converting Simulated Ad Placement Visual */
        <div className="relative flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-3 px-4 text-center border border-slate-800/60 min-h-[70px]">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-500/20">
              ADSTERRA READY
            </span>
            <span>Boost Your Daily Traffic & Revenue</span>
            <span className="text-[10px] text-slate-500">#Sponsored</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 max-w-md">
            Compatible with CPM/CPC Banner, Native Direct Links & Popunder tags. Ready for instantaneous monetization.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPublisherGuide}
              className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
            >
              <span>Connect Adsterra Account</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </button>
            <span className="text-[10px] text-slate-500">Or replace with your ad tag</span>
          </div>
        </div>
      )}
    </div>
  );
};
