export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PulseHub — Viral Utility & Fun Hub</title>
  <meta name="description" content="All-in-one viral utility tools and interactive fun hub with password generator, word counter, QR generator, reaction tester, and personality quiz." />
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              cyan: '#06b6d4',
              purple: '#a855f7',
              dark: '#0b0f19',
              card: '#111827',
            }
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <!-- Lightweight QR Code Generator (qrcode-generator) -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>

  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #0b0f19;
      color: #f1f5f9;
    }
    code, pre, .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0b0f19; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #334155; }
  </style>

  <!-- Adsterra Popunder / Direct Link Integration Zone (Optional) -->
  <!-- <script type='text/javascript' src='//pl12345678.highperformanceformat.com/YOUR_POPUNDER_KEY.js'></script> -->
</head>
<body class="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">

  <!-- TOP BAR NAVIGATION -->
  <header class="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0b0f19]/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-16">
      <!-- Zone 1: Brand Wordmark -->
      <a href="#" class="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 text-sm">
          ⚡
        </span>
        <span class="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">PulseHub</span>
      </a>

      <!-- Zone 2: Navigation Links -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <a href="#utilities" class="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">Utility Tools</a>
        <a href="#games" class="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">Reaction Games</a>
        <a href="#quiz" class="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">Viral Quiz</a>
      </nav>

      <!-- Zone 3: Primary Action CTA -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="#quiz" class="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-cyan-500 transition-all whitespace-nowrap shrink-0">
          Take Viral Quiz
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN WRAPPER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-8">

    <!-- <!-- Adsterra Header Banner Slot (728x90 Desktop / 320x50 Mobile) --> -->
    <section class="w-full">
      <div class="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-3 text-center">
        <div class="flex items-center justify-between pb-2 text-[11px] text-slate-400 font-mono">
          <span class="text-cyan-400 font-bold"><!-- Adsterra Leaderboard 728x90 --></span>
          <span class="text-slate-500">Sponsored Zone</span>
        </div>
        <!-- Real Adsterra Tag Placeholder:
        <script type="text/javascript">
          atOptions = { 'key' : 'YOUR_ADSTERRA_728x90_KEY', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/YOUR_KEY/invoke.js"></script>
        -->
        <div class="flex flex-col items-center justify-center py-4 bg-slate-950/80 rounded-lg border border-slate-800">
          <span class="text-xs font-semibold text-slate-300">✨ Premium Sponsored Placement · Leaderboard 728×90 / 320×50</span>
          <span class="text-[11px] text-slate-500 mt-0.5">High-viewability header ad zone</span>
        </div>
      </div>
    </section>

    <!-- HERO INTRODUCTION -->
    <section class="text-center py-4 max-w-2xl mx-auto space-y-2">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
        Fast Everyday Utilities & <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Viral Fun</span>
      </h1>
      <p class="text-sm text-slate-400">
        Generate uncrackable passwords, count words, build custom QR codes, test your reaction speed, and discover your true digital archetype.
      </p>
    </section>

    <!-- SECTION 1: QUICK UTILITY TOOLS (GRID) -->
    <section id="utilities" class="space-y-4">
      <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
        <span class="text-lg">🛠️</span>
        <h2 class="text-xl font-bold text-white tracking-tight">Quick Utility Tools</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- TOOL 1: PASSWORD GENERATOR -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 class="text-base font-bold text-white">Password Generator</h3>
              <span class="text-[11px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">Secure</span>
            </div>

            <div class="mt-4">
              <div class="flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 p-3">
                <input id="pwd-output" type="text" readonly class="w-full bg-transparent font-mono text-base font-semibold text-cyan-300 focus:outline-none" />
                <button onclick="copyPassword()" class="ml-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-colors">
                  Copy
                </button>
              </div>
              <div id="pwd-strength-bar" class="mt-2 text-xs font-mono text-slate-400">
                Security: <span id="pwd-strength-label" class="text-emerald-400 font-bold">Strong</span>
              </div>
            </div>

            <div class="mt-4 space-y-3 text-xs text-slate-300">
              <div>
                <div class="flex justify-between mb-1">
                  <span>Length</span>
                  <span id="pwd-len-val" class="font-mono font-bold text-cyan-400">16</span>
                </div>
                <input id="pwd-len" type="range" min="4" max="48" value="16" class="w-full accent-cyan-400" oninput="updatePassword()" />
              </div>

              <div class="grid grid-cols-2 gap-2 pt-1">
                <label class="flex items-center gap-1.5"><input type="checkbox" id="pwd-upper" checked onchange="updatePassword()" class="accent-purple-500"> Uppercase</label>
                <label class="flex items-center gap-1.5"><input type="checkbox" id="pwd-lower" checked onchange="updatePassword()" class="accent-purple-500"> Lowercase</label>
                <label class="flex items-center gap-1.5"><input type="checkbox" id="pwd-nums" checked onchange="updatePassword()" class="accent-purple-500"> Numbers</label>
                <label class="flex items-center gap-1.5"><input type="checkbox" id="pwd-syms" checked onchange="updatePassword()" class="accent-purple-500"> Symbols</label>
              </div>
            </div>
          </div>

          <button onclick="updatePassword()" class="mt-5 w-full rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-slate-200 transition-colors">
            Generate New Password
          </button>
        </div>

        <!-- TOOL 2: WORD & CHARACTER COUNTER -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 class="text-base font-bold text-white">Word & Char Counter</h3>
              <button onclick="loadWordSample()" class="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">Sample</button>
            </div>

            <div class="grid grid-cols-4 gap-2 mt-4 text-center">
              <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div class="text-[10px] text-slate-400">Words</div>
                <div id="word-count" class="text-lg font-mono font-bold text-cyan-400">0</div>
              </div>
              <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div class="text-[10px] text-slate-400">Chars</div>
                <div id="char-count" class="text-lg font-mono font-bold text-purple-400">0</div>
              </div>
              <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div class="text-[10px] text-slate-400">Lines</div>
                <div id="line-count" class="text-lg font-mono font-bold text-emerald-400">0</div>
              </div>
              <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <div class="text-[10px] text-slate-400">Read Time</div>
                <div id="read-time" class="text-lg font-mono font-bold text-amber-400">0m</div>
              </div>
            </div>

            <div class="mt-3">
              <textarea id="word-input" rows="5" placeholder="Type or paste your text here..." oninput="calculateWords()" class="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 focus:border-cyan-500/60 focus:outline-none"></textarea>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button onclick="cleanWordSpaces()" class="flex-1 rounded-xl bg-slate-800 hover:bg-slate-700 py-2 text-xs font-semibold text-slate-300">
              Trim Spaces
            </button>
            <button onclick="copyWordText()" class="flex-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 py-2 text-xs font-bold text-white">
              Copy Text
            </button>
          </div>
        </div>

        <!-- TOOL 3: QR CODE GENERATOR -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 class="text-base font-bold text-white">QR Code Generator</h3>
              <span class="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">Instant</span>
            </div>

            <div class="mt-4">
              <label class="text-xs text-slate-400 block mb-1">Enter Text or URL</label>
              <input id="qr-input" type="text" value="https://google.com" oninput="renderQrCode()" class="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-cyan-300 font-mono focus:border-cyan-500/60 focus:outline-none" />
            </div>

            <div class="mt-4 flex justify-center">
              <div id="qr-display" class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center"></div>
            </div>
          </div>

          <div class="mt-4 flex gap-2">
            <button onclick="copyQrContent()" class="flex-1 rounded-xl bg-slate-800 hover:bg-slate-700 py-2 text-xs font-semibold text-slate-300">
              Copy Link
            </button>
            <button onclick="downloadQrSvg()" class="flex-1 rounded-xl bg-purple-600 hover:bg-purple-500 py-2 text-xs font-bold text-white">
              Download SVG
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- <!-- Adsterra In-Feed Native Banner Slot (468x60 / 728x90) --> -->
    <section class="w-full">
      <div class="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-3 text-center">
        <div class="flex items-center justify-between pb-2 text-[11px] text-slate-400 font-mono">
          <span class="text-purple-400 font-bold"><!-- Adsterra In-Feed Native Ad Slot --></span>
          <span class="text-slate-500">Sponsored</span>
        </div>
        <!-- Real Adsterra In-Feed Tag Placeholder -->
        <div class="flex flex-col items-center justify-center py-3 bg-slate-950/80 rounded-lg border border-slate-800">
          <span class="text-xs font-semibold text-slate-200">🚀 Sponsored Content & High-CTR Native Recommendation</span>
          <span class="text-[11px] text-slate-500">Reaches engaged visitors right between tools and viral games</span>
        </div>
      </div>
    </section>

    <!-- SECTION 2: VIRAL GAMES (REACTION TIME & CLICKER) -->
    <section id="games" class="space-y-4">
      <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
        <span class="text-lg">⚡</span>
        <h2 class="text-xl font-bold text-white tracking-tight">Viral Reflex Games</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- REACTION SPEED TEST -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="text-base font-bold text-white">Reaction Speed Challenge</h3>
            <span id="best-reaction-display" class="text-xs font-mono text-amber-400">Best: -- ms</span>
          </div>

          <div
            id="reaction-box"
            onclick="handleReactionClick()"
            class="mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-slate-950 p-6 text-center cursor-pointer select-none border border-slate-800 transition-all duration-150"
          >
            <div id="reaction-icon" class="text-3xl mb-2">⚡</div>
            <h4 id="reaction-title" class="text-lg font-bold text-white">Click to Begin Test</h4>
            <p id="reaction-desc" class="text-xs text-slate-400 mt-1">When screen turns GREEN, click as fast as possible!</p>
          </div>
        </div>

        <!-- 10S CYBER CLICKER -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="text-base font-bold text-white">10-Second CPS Clicker</h3>
            <span id="best-cps-display" class="text-xs font-mono text-cyan-400">Best: -- CPS</span>
          </div>

          <div class="grid grid-cols-3 gap-2 mt-4 text-center">
            <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Time Left</div>
              <div id="cps-time" class="text-lg font-mono font-bold text-amber-400">10s</div>
            </div>
            <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Clicks</div>
              <div id="cps-clicks" class="text-lg font-mono font-bold text-purple-400">0</div>
            </div>
            <div class="bg-slate-950 p-2 rounded-xl border border-slate-800">
              <div class="text-[10px] text-slate-400">Live CPS</div>
              <div id="cps-rate" class="text-lg font-mono font-bold text-cyan-400">0.0</div>
            </div>
          </div>

          <div
            id="cps-pad"
            onclick="handleCpsPadClick()"
            class="mt-4 flex min-h-[140px] flex-col items-center justify-center rounded-2xl bg-slate-950 p-6 text-center cursor-pointer select-none border border-purple-500/40 active:scale-[0.98] transition-all"
          >
            <h4 id="cps-title" class="text-base font-bold text-white">Tap Repeatedly to Start!</h4>
            <p id="cps-desc" class="text-xs text-slate-400 mt-1">Finger speed test · 10s sprint</p>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 3: VIRAL PERSONALITY QUIZ -->
    <section id="quiz" class="space-y-4">
      <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
        <span class="text-lg">🔥</span>
        <h2 class="text-xl font-bold text-white tracking-tight">Viral Digital Archetype Quiz</h2>
      </div>

      <div class="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
        <div id="quiz-question-container">
          <div class="flex items-center justify-between pb-3">
            <span id="quiz-progress-text" class="text-xs font-mono text-cyan-400">Question 1/5</span>
            <span class="text-xs text-slate-500">~30 seconds</span>
          </div>

          <h3 id="quiz-question-title" class="text-lg font-bold text-white mt-1">
            Your ideal Friday night online looks like:
          </h3>

          <div id="quiz-options-list" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <!-- Injected dynamically via JS -->
          </div>
        </div>

        <!-- QUIZ RESULT CONTAINER (Hidden by default) -->
        <div id="quiz-result-container" class="hidden space-y-4">
          <div class="rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-2xl">
            <div class="rounded-[15px] bg-slate-950 p-6">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <span class="text-xs font-mono font-bold text-cyan-400 uppercase">✦ Your Digital Persona</span>
                <span id="quiz-vibe-score" class="text-xs font-mono bg-purple-950 px-2.5 py-1 rounded-full text-purple-300">Vibe Score: 98%</span>
              </div>
              <h3 id="quiz-result-title" class="text-2xl font-black text-white mt-3">The Cyber Architect</h3>
              <p id="quiz-result-tagline" class="text-sm font-semibold text-cyan-300 mt-1">"Always 3 steps ahead, building digital empires."</p>
              <p id="quiz-result-desc" class="text-xs text-slate-300 mt-2 leading-relaxed">You treat the internet like your personal sandbox. You love smart tools, dark mode aesthetic, and futuristic tech.</p>

              <div class="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                <button onclick="shareQuizResult()" class="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 py-2.5 text-xs font-bold text-white shadow">
                  Share Your Persona
                </button>
                <button onclick="restartQuiz()" class="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 border border-slate-800">
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>

          <!-- <!-- Adsterra Between-Results Ad Slot --> -->
          <div class="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-3 text-center">
            <div class="text-[10px] font-mono text-cyan-400 font-bold mb-1"><!-- Adsterra Post-Quiz Banner Slot --></div>
            <div class="text-xs text-slate-300">Boost your engagement & daily traffic with high-performance ad formats.</div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- <!-- Adsterra Social Bar Integration Zone (Floating Simulation) --> -->
  <aside id="social-bar" class="fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-xl flex items-start gap-3">
    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-md">
      🔥
    </div>
    <div class="flex-1 pr-2">
      <div class="text-[10px] font-mono text-cyan-400 uppercase font-bold">&lt;!-- Adsterra Social Bar --&gt;</div>
      <div class="text-xs font-bold text-white mt-0.5">Viral Trending Reflex Test</div>
      <p class="text-[11px] text-slate-300 mt-0.5">2,800+ visitors tested their speed today!</p>
    </div>
    <button onclick="document.getElementById('social-bar').style.display='none'" class="text-slate-400 hover:text-white text-sm">✕</button>
  </aside>

  <!-- FOOTER -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div>PulseHub © 2026 · All-in-One Viral Utility & Fun Hub</div>
      <div class="flex gap-4">
        <a href="#utilities" class="hover:text-slate-300">Utilities</a>
        <a href="#games" class="hover:text-slate-300">Games</a>
        <a href="#quiz" class="hover:text-slate-300">Quiz</a>
      </div>
    </div>
  </footer>

  <!-- VANILLA JAVASCRIPT LOGIC -->
  <script>
    // 1. Password Generator Logic
    function updatePassword() {
      const len = parseInt(document.getElementById('pwd-len').value);
      document.getElementById('pwd-len-val').textContent = len;
      const upper = document.getElementById('pwd-upper').checked;
      const lower = document.getElementById('pwd-lower').checked;
      const nums = document.getElementById('pwd-nums').checked;
      const syms = document.getElementById('pwd-syms').checked;

      let chars = '';
      if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (nums) chars += '0123456789';
      if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

      let result = '';
      for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById('pwd-output').value = result;

      // Strength
      let label = 'Medium';
      if (len >= 16 && (upper && lower && nums && syms)) label = 'Uncrackable';
      else if (len >= 12) label = 'Strong';
      else if (len < 8) label = 'Weak';
      document.getElementById('pwd-strength-label').textContent = label;
    }

    function copyPassword() {
      const val = document.getElementById('pwd-output').value;
      navigator.clipboard.writeText(val);
      alert('Password copied to clipboard!');
    }

    // 2. Word Counter Logic
    function calculateWords() {
      const text = document.getElementById('word-input').value;
      const chars = text.length;
      const trimmed = text.trim();
      const words = trimmed ? trimmed.split(/\\s+/).filter(Boolean).length : 0;
      const lines = trimmed ? text.split(/\\n+/).filter(Boolean).length : 0;
      const readTime = Math.max(0.1, Number((words / 200).toFixed(1)));

      document.getElementById('char-count').textContent = chars;
      document.getElementById('word-count').textContent = words;
      document.getElementById('line-count').textContent = lines;
      document.getElementById('read-time').textContent = words > 0 ? readTime + 'm' : '0m';
    }

    function loadWordSample() {
      document.getElementById('word-input').value = 'PulseHub empowers millions of creators with instant daily utilities and viral mini-games optimized for speed, engagement, and low bounce rates.';
      calculateWords();
    }

    function cleanWordSpaces() {
      const el = document.getElementById('word-input');
      el.value = el.value.replace(/[ \\t]+/g, ' ').replace(/\\n\\s*\\n/g, '\\n\\n').trim();
      calculateWords();
    }

    function copyWordText() {
      navigator.clipboard.writeText(document.getElementById('word-input').value);
      alert('Text copied!');
    }

    // 3. QR Code Generator Logic
    function renderQrCode() {
      const val = document.getElementById('qr-input').value || 'https://pulsehub.app';
      const typeNumber = 0;
      const errorCorrectionLevel = 'M';
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(val);
      qr.make();
      document.getElementById('qr-display').innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2 });
    }

    function copyQrContent() {
      navigator.clipboard.writeText(document.getElementById('qr-input').value);
      alert('QR Link copied to clipboard!');
    }

    function downloadQrSvg() {
      const svg = document.getElementById('qr-display').innerHTML;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pulsehub-qr.svg';
      a.click();
    }

    // 4. Reaction Speed Test Logic
    let reactionState = 'idle';
    let reactionStart = 0;
    let reactionTimer = null;
    let bestReaction = null;

    function handleReactionClick() {
      const box = document.getElementById('reaction-box');
      const title = document.getElementById('reaction-title');
      const desc = document.getElementById('reaction-desc');

      if (reactionState === 'idle' || reactionState === 'result' || reactionState === 'tooEarly') {
        reactionState = 'waiting';
        box.className = 'mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-rose-950/70 p-6 text-center cursor-pointer select-none border border-rose-600 transition-all';
        title.textContent = 'WAIT FOR GREEN...';
        desc.textContent = 'Hover your finger over the trigger';

        const delay = Math.floor(Math.random() * 2500) + 1500;
        reactionTimer = setTimeout(() => {
          reactionState = 'ready';
          reactionStart = performance.now();
          box.className = 'mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-emerald-500 p-6 text-center cursor-pointer select-none border border-emerald-400 text-black shadow-xl shadow-emerald-500/30 transition-all';
          title.textContent = 'CLICK NOW!';
          desc.textContent = 'TAP AS FAST AS YOU CAN!';
        }, delay);
      } else if (reactionState === 'waiting') {
        clearTimeout(reactionTimer);
        reactionState = 'tooEarly';
        box.className = 'mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-amber-950/70 p-6 text-center cursor-pointer select-none border border-amber-600 transition-all';
        title.textContent = 'Too Early! ⚠️';
        desc.textContent = 'You tapped before green. Click to retry.';
      } else if (reactionState === 'ready') {
        const ms = Math.round(performance.now() - reactionStart);
        reactionState = 'result';
        box.className = 'mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-2xl bg-slate-950 p-6 text-center cursor-pointer select-none border border-purple-500/50 transition-all';
        title.textContent = ms + ' ms!';
        desc.textContent = ms < 220 ? '🔥 Superhuman Reflexes!' : 'Solid Speed! Click to test again.';
        if (!bestReaction || ms < bestReaction) {
          bestReaction = ms;
          document.getElementById('best-reaction-display').textContent = 'Best: ' + ms + ' ms';
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }
      }
    }

    // 5. 10s CPS Clicker Logic
    let cpsRunning = false;
    let cpsClicks = 0;
    let cpsTimeLeft = 10;
    let cpsTimer = null;
    let bestCps = null;

    function handleCpsPadClick() {
      if (!cpsRunning && cpsTimeLeft === 10) {
        cpsRunning = true;
        cpsClicks = 1;
        document.getElementById('cps-clicks').textContent = 1;
        document.getElementById('cps-title').textContent = 'KEEP TAPPING FAST!';
        cpsTimer = setInterval(() => {
          cpsTimeLeft--;
          document.getElementById('cps-time').textContent = cpsTimeLeft + 's';
          document.getElementById('cps-rate').textContent = (cpsClicks / (10 - cpsTimeLeft)).toFixed(1);
          if (cpsTimeLeft <= 0) {
            clearInterval(cpsTimer);
            cpsRunning = false;
            const finalCps = (cpsClicks / 10).toFixed(1);
            document.getElementById('cps-title').textContent = finalCps + ' CPS Completed!';
            document.getElementById('cps-desc').textContent = 'Total: ' + cpsClicks + ' clicks in 10s. Tap to restart.';
            if (!bestCps || parseFloat(finalCps) > parseFloat(bestCps)) {
              bestCps = finalCps;
              document.getElementById('best-cps-display').textContent = 'Best: ' + bestCps + ' CPS';
              confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
            }
          }
        }, 1000);
      } else if (cpsRunning && cpsTimeLeft > 0) {
        cpsClicks++;
        document.getElementById('cps-clicks').textContent = cpsClicks;
        document.getElementById('cps-rate').textContent = (cpsClicks / (10 - cpsTimeLeft)).toFixed(1);
      } else if (!cpsRunning && cpsTimeLeft <= 0) {
        cpsClicks = 0;
        cpsTimeLeft = 10;
        document.getElementById('cps-time').textContent = '10s';
        document.getElementById('cps-clicks').textContent = '0';
        document.getElementById('cps-rate').textContent = '0.0';
        document.getElementById('cps-title').textContent = 'Tap Repeatedly to Start!';
        document.getElementById('cps-desc').textContent = 'Finger speed test · 10s sprint';
      }
    }

    // 6. Viral Quiz Logic
    const quizQuestions = [
      {
        q: "Your ideal Friday night online looks like:",
        options: [
          { text: "Optimizing shortcuts & automation hacks", persona: "architect" },
          { text: "Sending unhinged memes in the group chat", persona: "meme" },
          { text: "Zero notifications, ambient lofi sounds", persona: "zen" },
          { text: "Deep rabbit hole of 2 AM mysteries", persona: "alchemist" }
        ]
      },
      {
        q: "When a wild internet rumor drops, your move is:",
        options: [
          { text: "Analyze if it actually has real substance", persona: "architect" },
          { text: "Remix it into a joke before anyone else", persona: "meme" },
          { text: "Mute the buzz and go touch grass", persona: "zen" },
          { text: "Trace who originated it and investigate", persona: "alchemist" }
        ]
      },
      {
        q: "How do you manage your browser tabs?",
        options: [
          { text: "Pinned tab groups with color coding", persona: "architect" },
          { text: "70 tabs open across 3 windows", persona: "meme" },
          { text: "Max 5 tabs, strict minimalist cleanup", persona: "zen" },
          { text: "Saved encrypted session files from weeks ago", persona: "alchemist" }
        ]
      },
      {
        q: "Pick your signature digital weapon:",
        options: [
          { text: "Command line & keyboard shortcuts", persona: "architect" },
          { text: "A reaction GIF that stuns the chat", persona: "meme" },
          { text: "Do Not Disturb mode toggled permanently", persona: "zen" },
          { text: "32-character uncrackable master password", persona: "alchemist" }
        ]
      },
      {
        q: "What is your #1 rule in the digital era?",
        options: [
          { text: "Automate everything possible", persona: "architect" },
          { text: "Never take internet drama seriously", persona: "meme" },
          { text: "Protect your attention like treasure", persona: "zen" },
          { text: "Stay curious and question defaults", persona: "alchemist" }
        ]
      }
    ];

    let quizStep = 0;
    let quizScores = { architect: 0, meme: 0, zen: 0, alchemist: 0 };

    function renderQuizStep() {
      const q = quizQuestions[quizStep];
      document.getElementById('quiz-progress-text').textContent = 'Question ' + (quizStep + 1) + '/5';
      document.getElementById('quiz-question-title').textContent = q.q;

      const list = document.getElementById('quiz-options-list');
      list.innerHTML = '';
      q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-left hover:border-cyan-400 hover:bg-slate-900 transition-colors';
        btn.textContent = opt.text;
        btn.onclick = () => {
          quizScores[opt.persona]++;
          quizStep++;
          if (quizStep < quizQuestions.length) {
            renderQuizStep();
          } else {
            showQuizResult();
          }
        };
        list.appendChild(btn);
      });
    }

    function showQuizResult() {
      document.getElementById('quiz-question-container').classList.add('hidden');
      document.getElementById('quiz-result-container').classList.remove('hidden');

      let top = 'architect';
      let max = -1;
      for (const k in quizScores) {
        if (quizScores[k] > max) { max = quizScores[k]; top = k; }
      }

      const results = {
        architect: { title: "The Cyber Architect", tagline: "Always 3 steps ahead, building digital empires.", desc: "You treat the internet like your personal sandbox. You love smart tools, dark mode aesthetic, and futuristic tech." },
        meme: { title: "The Viral Meme Monarch", tagline: "Born to entertain with legendary comedic timing.", desc: "Your group chats rely on your humor, and your reaction speed is legendary." },
        zen: { title: "The Digital Zen Master", tagline: "Unbothered, moisturized, in your lane, thriving.", desc: "You keep your screen time disciplined, your mind peaceful, and your notification count at zero." },
        alchemist: { title: "The Night Owl Alchemist", tagline: "Fueled by 2 AM epiphanies and curiosity.", desc: "Your peak brain hours occur under moonlight, diving down deep rabbit holes and solving mysteries." }
      };

      const res = results[top] || results.architect;
      document.getElementById('quiz-result-title').textContent = res.title;
      document.getElementById('quiz-result-tagline').textContent = '"' + res.tagline + '"';
      document.getElementById('quiz-result-desc').textContent = res.desc;

      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }

    function restartQuiz() {
      quizStep = 0;
      quizScores = { architect: 0, meme: 0, zen: 0, alchemist: 0 };
      document.getElementById('quiz-result-container').classList.add('hidden');
      document.getElementById('quiz-question-container').classList.remove('hidden');
      renderQuizStep();
    }

    function shareQuizResult() {
      const title = document.getElementById('quiz-result-title').textContent;
      navigator.clipboard.writeText("✨ I took the Viral Persona Quiz on PulseHub and got: " + title + "!");
      alert("Result copied to clipboard! Share it with your friends.");
    }

    // Initialize on load
    window.onload = function() {
      updatePassword();
      renderQrCode();
      renderQuizStep();
    };
  </script>
</body>
</html>
`;
}
