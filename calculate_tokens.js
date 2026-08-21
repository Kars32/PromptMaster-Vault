import { encode as encodeCl100k } from 'gpt-tokenizer/model/gpt-4';
import { encode as encodeO200k } from 'gpt-tokenizer/model/gpt-4o';
import { PROMPTS } from './src/data/prompts.js';

console.log('='.repeat(80));
console.log('                 ⚔️ PROMPT KNIGHT — TOKEN AUDIT & HISTORY REPORT');
console.log('='.repeat(80));

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
      title: `${p.title} (${p.version || 'Current'})`,
      cl100kTokens,
      o200kTokens,
      charCount,
      wordCount,
      lineCount
    });

    if (p.modules && p.modules.length > 0) {
      for (const m of p.modules) {
        const mText = m.content;
        const mCl100k = encodeCl100k(mText).length;
        const mO200k = encodeO200k(mText).length;
        results.push({
          suite: suite.toUpperCase(),
          id: p.id,
          title: ` ├─ [Module] ${m.name}`,
          cl100kTokens: mCl100k,
          o200kTokens: mO200k,
          charCount: mText.length,
          wordCount: mText.trim().split(/\s+/).length,
          lineCount: mText.split('\n').length
        });
      }
    }

    if (p.history && p.history.length > 0) {
      for (const h of p.history) {
        const hText = h.content;
        const hCl100k = encodeCl100k(hText).length;
        const hO200k = encodeO200k(hText).length;
        results.push({
          suite: suite.toUpperCase(),
          id: p.id,
          title: ` └─ [History] ${h.label || h.version}`,
          cl100kTokens: hCl100k,
          o200kTokens: hO200k,
          charCount: hText.length,
          wordCount: hText.trim().split(/\s+/).length,
          lineCount: hText.split('\n').length
        });
      }
    }
  }
}

console.log(
  'SUITE'.padEnd(8) + ' | ' +
  'MODEL / VERSION'.padEnd(30) + ' | ' +
  'CL100K'.padStart(7) + ' | ' +
  'O200K'.padStart(7) + ' | ' +
  'WORDS'.padStart(6) + ' | ' +
  'CHARS'.padStart(7) + ' | ' +
  'LINES'.padStart(5)
);
console.log('-'.repeat(80));

for (const r of results) {
  console.log(
    r.suite.padEnd(8) + ' | ' +
    r.title.padEnd(30) + ' | ' +
    String(r.cl100kTokens).padStart(7) + ' | ' +
    String(r.o200kTokens).padStart(7) + ' | ' +
    String(r.wordCount).padStart(6) + ' | ' +
    String(r.charCount).padStart(7) + ' | ' +
    String(r.lineCount).padStart(5)
  );
}

console.log('='.repeat(80));
