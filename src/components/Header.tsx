import React from 'react';
import { Sparkles, FileCode } from 'lucide-react';

interface HeaderProps {
  onOpenPublisherGuide: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPublisherGuide,
  onOpenExportModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 text-sm">
            ⚡
          </span>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            PulseHub
          </span>
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#utilities" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Utility Tools
          </a>
          <a href="#games" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Reaction Games
          </a>
          <a href="#quiz" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Viral Quiz
          </a>
          <button 
            type="button"
            onClick={onOpenPublisherGuide} 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-slate-300 font-medium"
          >
            Ad Monetization
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Inspect & export single-file HTML deliverable"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Deliverable</span> HTML
          </button>

          <a
            href="#quiz"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-cyan-500 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Viral Quiz</span>
          </a>
        </div>
      </div>
    </header>
  );
};
