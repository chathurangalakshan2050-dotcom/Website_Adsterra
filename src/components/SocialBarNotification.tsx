import React, { useState } from 'react';
import { X, Flame, ExternalLink } from 'lucide-react';

interface SocialBarProps {
  onOpenPublisherGuide: () => void;
}

export const SocialBarNotification: React.FC<SocialBarProps> = ({ onOpenPublisherGuide }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full bg-slate-900 border border-cyan-500/50 px-3 py-1.5 text-xs text-cyan-300 shadow-xl backdrop-blur-md hover:bg-slate-800 transition-all cursor-pointer"
        title="View simulated Adsterra Social Bar"
      >
        <Flame className="h-3.5 w-3.5 text-cyan-400" />
        <span>Social Bar Preview</span>
      </button>
    );
  }

  return (
    <aside 
      aria-label="Adsterra Social Bar Preview"
      className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-xl">
        {/* Subtle Neon Glow Edge */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-md">
            <Flame className="h-5 w-5 animate-pulse" />
          </div>

          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-semibold uppercase">
              <span>&lt;!-- Adsterra Social Bar Zone --&gt;</span>
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              🔥 Trending Utility & Games
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              2,840+ users generated secure passwords & tested their reaction speed in the last hour!
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenPublisherGuide}
                className="flex items-center gap-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-2.5 py-1 text-[11px] font-bold text-white shadow hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
              >
                <span>Adsterra Social Bar Setup</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </button>
              <button
                type="button"
                onClick={onOpenPublisherGuide}
                className="text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
              >
                Copy Tag
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close social bar preview"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
