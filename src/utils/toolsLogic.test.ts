import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generatePassword,
  calculatePasswordStrength,
  analyzeText,
  calculateReactionGrade,
  calculateCpsGrade,
  calculateQuizResult,
} from './toolsLogic';

test('generatePassword creates password with requested length and character sets', () => {
  const pwd = generatePassword({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  assert.equal(pwd.length, 16);
  assert.ok(/[A-Z]/.test(pwd), 'Should contain uppercase');
  assert.ok(/[a-z]/.test(pwd), 'Should contain lowercase');
  assert.ok(/[0-9]/.test(pwd), 'Should contain number');
  assert.ok(/[^a-zA-Z0-9]/.test(pwd), 'Should contain symbol');
});

test('calculatePasswordStrength evaluates weak vs uncrackable passwords', () => {
  const weak = calculatePasswordStrength('12345');
  assert.ok(weak.score <= 1);
  assert.equal(weak.label, 'Very Weak');

  const strong = calculatePasswordStrength('K9#pL8$zW2@qR7!vN4');
  assert.ok(strong.score >= 3);
  assert.ok(strong.entropy > 70);
});

test('analyzeText computes accurate counts, reading time, and word frequencies', () => {
  const sample = 'The quick brown fox jumps over the lazy dog. The fox was quick!';
  const metrics = analyzeText(sample);

  assert.equal(metrics.words, 13);
  assert.ok(metrics.characters > 50);
  assert.ok(metrics.sentences >= 2);
  assert.ok(metrics.paragraphs === 1);
  assert.ok(metrics.readingTimeMinutes > 0);

  // 'fox' or 'quick' should be among top words
  const topWordStrings = metrics.topWords.map(w => w.word);
  assert.ok(topWordStrings.includes('fox') || topWordStrings.includes('quick'));
});

test('calculateReactionGrade returns correct ranks for speed tiers', () => {
  const fast = calculateReactionGrade(175);
  assert.equal(fast.rank, 'Superhuman Reflexes');

  const slow = calculateReactionGrade(450);
  assert.equal(slow.rank, 'Sleepy Sloth');
});

test('calculateCpsGrade accurately tiers clicks per second', () => {
  const godlike = calculateCpsGrade(13.5);
  assert.equal(godlike.title, 'Cosmic Speed Demon');

  const steady = calculateCpsGrade(5.5);
  assert.equal(steady.title, 'Casual Surfer');
});

test('calculateQuizResult tallies persona based on majority answers', () => {
  const answers = {
    0: 'cyber_architect',
    1: 'cyber_architect',
    2: 'meme_monarch',
    3: 'cyber_architect',
  };
  const result = calculateQuizResult(answers);
  assert.equal(result.id, 'cyber_architect');
});
