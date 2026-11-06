export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous?: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Uncrackable';
  entropy: number; // bits
  crackTime: string;
}

export interface TextMetrics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  topWords: Array<{ word: string; count: number }>;
}

export interface QuizPersona {
  id: string;
  title: string;
  tagline: string;
  description: string;
  traits: string[];
  vibeScore: number; // 0-100
  color: string;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = 'iIlL1oO0';

export function generatePassword(options: PasswordOptions): string {
  let chars = '';
  if (options.includeUppercase) chars += UPPERCASE;
  if (options.includeLowercase) chars += LOWERCASE;
  if (options.includeNumbers) chars += NUMBERS;
  if (options.includeSymbols) chars += SYMBOLS;

  if (options.excludeAmbiguous) {
    chars = chars.split('').filter(c => !AMBIGUOUS.includes(c)).join('');
  }

  if (!chars) chars = LOWERCASE;

  const length = Math.max(4, Math.min(64, options.length));
  const result: string[] = [];
  
  // Guarantee at least one of each selected charset
  const pools: string[] = [];
  if (options.includeUppercase) pools.push(UPPERCASE);
  if (options.includeLowercase) pools.push(LOWERCASE);
  if (options.includeNumbers) pools.push(NUMBERS);
  if (options.includeSymbols) pools.push(SYMBOLS);

  pools.forEach(pool => {
    let validPool = pool;
    if (options.excludeAmbiguous) {
      validPool = validPool.split('').filter(c => !AMBIGUOUS.includes(c)).join('');
    }
    if (validPool.length > 0 && result.length < length) {
      const randIdx = Math.floor(Math.random() * validPool.length);
      result.push(validPool[randIdx]);
    }
  });

  while (result.length < length) {
    const randIdx = Math.floor(Math.random() * chars.length);
    result.push(chars[randIdx]);
  }

  // Shuffle the result array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'Very Weak', entropy: 0, crackTime: 'Instant' };
  }

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const length = password.length;
  const entropy = Math.round(length * Math.log2(Math.max(2, poolSize)));

  let score = 0;
  let label: PasswordStrength['label'] = 'Very Weak';
  let crackTime = 'Instant';

  if (entropy < 28) {
    score = 0;
    label = 'Very Weak';
    crackTime = 'Under 1 second';
  } else if (entropy < 45) {
    score = 1;
    label = 'Weak';
    crackTime = 'A few minutes';
  } else if (entropy < 65) {
    score = 2;
    label = 'Medium';
    crackTime = 'Several months';
  } else if (entropy < 85) {
    score = 3;
    label = 'Strong';
    crackTime = 'Thousands of years';
  } else {
    score = 4;
    label = 'Uncrackable';
    crackTime = 'Millions of centuries';
  }

  return { score, label, entropy, crackTime };
}

export function analyzeText(text: string): TextMetrics {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  
  const trimmed = text.trim();
  const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const words = wordsArray.length;

  const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text]).length : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.max(0.1, Number((words / 200).toFixed(1)));
  // Average speaking speed: 130 words per minute
  const speakingTimeMinutes = Math.max(0.1, Number((words / 130).toFixed(1)));

  // Keyword frequency (ignoring common short stop words)
  const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'that', 'for', 'on', 'with', 'as', 'this', 'at', 'by']);
  const wordCounts = new Map<string, number>();
  
  wordsArray.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length > 2 && !stopWords.has(clean)) {
      wordCounts.set(clean, (wordCounts.get(clean) || 0) + 1);
    }
  });

  const topWords = Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTimeMinutes: words > 0 ? readingTimeMinutes : 0,
    speakingTimeMinutes: words > 0 ? speakingTimeMinutes : 0,
    topWords,
  };
}

export function calculateReactionGrade(ms: number): { rank: string; percentile: string; color: string } {
  if (ms <= 180) {
    return { rank: 'Superhuman Reflexes', percentile: 'Top 0.5%', color: 'text-cyan-400' };
  } else if (ms <= 220) {
    return { rank: 'Esports Pro Speed', percentile: 'Top 5%', color: 'text-emerald-400' };
  } else if (ms <= 260) {
    return { rank: 'Lightning Quick', percentile: 'Top 20%', color: 'text-purple-400' };
  } else if (ms <= 320) {
    return { rank: 'Solid Average', percentile: 'Top 50%', color: 'text-amber-400' };
  } else {
    return { rank: 'Sleepy Sloth', percentile: 'Bottom 25%', color: 'text-rose-400' };
  }
}

export function calculateCpsGrade(cps: number): { rank: string; title: string; badge: string } {
  if (cps >= 12) {
    return { rank: 'Godlike Finger Jitter', title: 'Cosmic Speed Demon', badge: '⚡ S-TIER' };
  } else if (cps >= 9) {
    return { rank: 'Ultra Rapid Clicker', title: 'Cyber Assassin', badge: '🔥 A-TIER' };
  } else if (cps >= 7) {
    return { rank: 'Fast Gamer Pace', title: 'Reflex Maestro', badge: '✨ B-TIER' };
  } else if (cps >= 5) {
    return { rank: 'Steady Clicker', title: 'Casual Surfer', badge: '👍 C-TIER' };
  } else {
    return { rank: 'Relaxed Tapper', title: 'Gentle Wanderer', badge: '🐢 D-TIER' };
  }
}

export const QUIZ_PERSONAS: Record<string, QuizPersona> = {
  cyber_architect: {
    id: 'cyber_architect',
    title: 'The Cyber Architect',
    tagline: 'Always 3 steps ahead, building digital empires while sipping matcha.',
    description: 'You treat the internet like your personal sandbox. You love smart tools, optimized workflows, dark mode aesthetic, and futuristic tech.',
    traits: ['Hyper-Organized', 'Futuristic Visionary', 'Automation Obsessed'],
    vibeScore: 98,
    color: 'from-cyan-500 to-blue-600',
  },
  meme_monarch: {
    id: 'meme_monarch',
    title: 'The Viral Meme Monarch',
    tagline: 'Born to entertain, equipped with impeccable timing and legendary memes.',
    description: 'You understand internet culture before it even hits mainstream feeds. Your group chats rely on your stickers, and your reaction speed is legendary.',
    traits: ['Cultural Trendsetter', 'Instant Witty Comebacks', 'Group Chat Royalty'],
    vibeScore: 94,
    color: 'from-purple-500 to-pink-500',
  },
  digital_zen: {
    id: 'digital_zen',
    title: 'The Digital Zen Master',
    tagline: 'Unbothered, moisturized, in your lane, thriving with zero notification badges.',
    description: 'You keep your screen time disciplined, your bookmarks curated, and your mind peaceful. When chaos erupts online, you remain serene and wise.',
    traits: ['Mindful Aesthetic', 'Peak Focus', 'Zero Unread Badges'],
    vibeScore: 91,
    color: 'from-emerald-400 to-teal-600',
  },
  night_owl_hacker: {
    id: 'night_owl_hacker',
    title: 'The Night Owl Alchemist',
    tagline: 'Fueled by 2 AM epiphanies, neon lo-fi beats, and infinite curiosity.',
    description: 'Your peak brain hours occur under moonlight. You dive down deep rabbit holes, generate uncrackable passwords, and solve complex mysteries.',
    traits: ['Insatiable Curiosity', 'Deep Focus Mode', 'Nighttime Superpowers'],
    vibeScore: 96,
    color: 'from-violet-600 to-fuchsia-600',
  },
};

export function calculateQuizResult(answers: Record<number, string>): QuizPersona {
  const counts: Record<string, number> = {
    cyber_architect: 0,
    meme_monarch: 0,
    digital_zen: 0,
    night_owl_hacker: 0,
  };

  Object.values(answers).forEach(val => {
    if (counts[val] !== undefined) {
      counts[val]++;
    }
  });

  let topPersona = 'cyber_architect';
  let maxCount = -1;
  for (const [key, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      topPersona = key;
    }
  }

  return QUIZ_PERSONAS[topPersona] || QUIZ_PERSONAS.cyber_architect;
}
