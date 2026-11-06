import React, { useState } from 'react';
import { 
  Zap, 
  Wrench, 
  Flame, 
  Sparkles, 
  DollarSign, 
  Download,
  Users,
  ShieldCheck
} from 'lucide-react';
import { Header } from './components/Header';
import { AdBannerSlot } from './components/AdBannerSlot';
import { PasswordGenerator } from './components/PasswordGenerator';
import { WordCounter } from './components/WordCounter';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { MiniGames } from './components/MiniGames';
import { ViralQuiz } from './components/ViralQuiz';
import { SocialBarNotification } from './components/SocialBarNotification';
import { PublisherGuideModal } from './components/PublisherGuideModal';
import { StandaloneExportModal } from './components/StandaloneExportModal';

export default function App() {
  const [isPublisherGuideOpen, setIsPublisherGuideOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* 1. Header Navigation */}
      <Header
        onOpenPublisherGuide={() => setIsPublisherGuideOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-8 flex-1">
        
        {/* <!-- Adsterra Header Banner Slot (728x90 Desktop / 320x50 Mobile) --> */}
        <section aria-label="Header Advertisement" className="w-full">
          <AdBannerSlot
            slotType="header-leaderboard"
            title="Header Leaderboard Banner Slot"
            onOpenPublisherGuide={() => setIsPublisherGuideOpen(true)}
          />
        </section>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950/80 p-6 sm:p-10 text-center shadow-2xl backdrop-blur-xl">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 h-48 w-80 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3.5 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Fast Daily Utilities & Viral Interactive Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Instant Power Tools & <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Viral Challenges</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Generate uncrackable passwords, analyze texts in real-time, render custom styled QR codes, test your reaction reflex, and discover your true digital archetype in seconds.
            </p>

            {/* Quick Proof Metrics Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-cyan-400" />
                <span>124,000+ Monthly Visitors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-purple-400" />
                <span>0.2s Instant Client Processing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Private & In-Browser</span>
              </div>
            </div>

            {/* Quick Navigation Jump Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="#utilities"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Wrench className="h-3.5 w-3.5 text-cyan-400" />
                <span>Quick Utilities</span>
              </a>
              <a
                href="#games"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Zap className="h-3.5 w-3.5 text-purple-400" />
                <span>Reflex Games</span>
              </a>
              <a
                href="#quiz"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all"
              >
                <Flame className="h-3.5 w-3.5" />
                <span>Take Viral Quiz</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 1: QUICK UTILITY TOOLS */}
        <section id="utilities" className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-bold border border-cyan-500/20">
                01
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Quick Everyday Utilities</h2>
                <p className="text-xs text-slate-400">Fast, client-side, zero latency utility suite</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">No signup required</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <PasswordGenerator />
            <WordCounter />
            <QRCodeGenerator />
          </div>
        </section>

        {/* <!-- Adsterra In-Feed Native Banner Slot (468x60 / 728x90) --> */}
        <section aria-label="In-Feed Advertisement" className="w-full">
          <AdBannerSlot
            slotType="infeed-native"
            title="Adsterra In-Feed Native Slot"
            onOpenPublisherGuide={() => setIsPublisherGuideOpen(true)}
          />
        </section>

        {/* SECTION 2: VIRAL GAMES & VIRAL PERSONALITY QUIZ (2-COLUMN SPLIT) */}
        <section id="games" className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 text-sm font-bold border border-purple-500/20">
                02
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Viral Interactive Arena</h2>
                <p className="text-xs text-slate-400">High-retention mini-games & viral personality archetypes</p>
              </div>
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-800/30">
              High Engagement
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Interactive Mini-Games: Reaction Tester & 10s CPS Clicker */}
            <MiniGames />

            {/* Interactive Viral Personality Quiz */}
            <div id="quiz">
              <ViralQuiz />
            </div>
          </div>
        </section>

        {/* Publisher Monetization Architecture Showcase Card */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Monetization Ready for Adsterra & CPM Networks</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Includes Leaderboard (728×90), Sidebar (300×250), In-Feed Native, Social Bar, and Direct Link anchors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsPublisherGuideOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-semibold text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Adsterra Guide</span>
              </button>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Single HTML File</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 3. Floating Adsterra Social Bar Simulation */}
      <SocialBarNotification
        onOpenPublisherGuide={() => setIsPublisherGuideOpen(true)}
      />

      {/* 4. Footer */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-white">PulseHub</span>
            <span>·</span>
            <span>All-in-One Viral Utility & Fun Hub</span>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a href="#utilities" className="hover:text-cyan-400 transition-colors">Utilities</a>
            <a href="#games" className="hover:text-cyan-400 transition-colors">Games</a>
            <a href="#quiz" className="hover:text-cyan-400 transition-colors">Quiz</a>
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Standalone Code
            </button>
          </div>

          <div className="text-[11px] text-slate-600 font-mono">
            Optimized for 99+ PageSpeed & Low Bounce Rates
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PublisherGuideModal
        isOpen={isPublisherGuideOpen}
        onClose={() => setIsPublisherGuideOpen(false)}
      />

      <StandaloneExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
