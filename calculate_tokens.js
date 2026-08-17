import { encode as encodeCl100k } from 'gpt-tokenizer/model/gpt-4';
import { encode as encodeO200k } from 'gpt-tokenizer/model/gpt-4o';
import { PROMPTS } from './src/data/prompts.js';

console.log('='.repeat(75));
console.log('                 ⚔️ PROMPT KNIGHT — TOKEN AUDIT REPORT');
console.log('='.repeat(75));

const results = [];

for (const [suite, promptList] of Object.entries(PROMPTS)) {
  for (const p of promptList) {
    const text = p.content;
    const cl100kTokens = encodeCl100k(text).length;
    const o200kTokens = encodeO200k(text).length;
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).length;
    const lineCount = text.split('\n').length;

    results.push({
      suite: suite.toUpperCase(),
      id: p.id,
      title: p.title,
      cl100kTokens,
      o200kTokens,
      charCount,
      wordCount,
      lineCount
    });
  }
}

console.log(
  'SUITE'.padEnd(8) + ' | ' +
  'MODEL / PROMPT'.padEnd(20) + ' | ' +
  'CL100K'.padStart(7) + ' | ' +
  'O200K'.padStart(7) + ' | ' +
  'WORDS'.padStart(6) + ' | ' +
  'CHARS'.padStart(7) + ' | ' +
  'LINES'.padStart(5)
);
console.log('-'.repeat(75));

for (const r of results) {
  console.log(
    r.suite.padEnd(8) + ' | ' +
    r.title.padEnd(20) + ' | ' +
    String(r.cl100kTokens).padStart(7) + ' | ' +
    String(r.o200kTokens).padStart(7) + ' | ' +
    String(r.wordCount).padStart(6) + ' | ' +
    String(r.charCount).padStart(7) + ' | ' +
    String(r.lineCount).padStart(5)
  );
}

console.log('='.repeat(75));
