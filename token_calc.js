#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let encodeCl100k, encodeO200k;

try {
  const mod4 = await import('gpt-tokenizer/model/gpt-4');
  const mod4o = await import('gpt-tokenizer/model/gpt-4o');
  encodeCl100k = mod4.encode;
  encodeO200k = mod4o.encode;
} catch (e) {
  const vaultModule4 = path.join(__dirname, 'node_modules', 'gpt-tokenizer', 'esm', 'model', 'gpt-4.js');
  const vaultModule4o = path.join(__dirname, 'node_modules', 'gpt-tokenizer', 'esm', 'model', 'gpt-4o.js');
  const mod4 = await import('file:///' + vaultModule4.replace(/\\/g, '/'));
  const mod4o = await import('file:///' + vaultModule4o.replace(/\\/g, '/'));
  encodeCl100k = mod4.encode;
  encodeO200k = mod4o.encode;
}

function formatNumber(num) {
  return num.toLocaleString();
}

function analyzeText(text, label = 'Input') {
  const cl100kTokens = encodeCl100k(text).length;
  const o200kTokens = encodeO200k(text).length;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  const tokenWordRatio = words > 0 ? (cl100kTokens / words).toFixed(2) : '0.00';

  return {
    label,
    cl100kTokens,
    o200kTokens,
    chars,
    words,
    lines,
    tokenWordRatio
  };
}

function printReport(results) {
  console.log('\n' + '='.repeat(88));
  console.log('              ⚔️ PROMPT KNIGHT — ACCURATE PRE-FLIGHT TOKEN AUDIT');
  console.log('='.repeat(88));
  console.log(
    'TARGET / FILE'.padEnd(36) + ' | ' +
    'CL100K'.padStart(7) + ' | ' +
    'O200K'.padStart(7) + ' | ' +
    'WORDS'.padStart(6) + ' | ' +
    'CHARS'.padStart(7) + ' | ' +
    'LINES'.padStart(5) + ' | ' +
    'TOK/WD'
  );
  console.log('-'.repeat(88));

  for (const r of results) {
    console.log(
      r.label.padEnd(36) + ' | ' +
      formatNumber(r.cl100kTokens).padStart(7) + ' | ' +
      formatNumber(r.o200kTokens).padStart(7) + ' | ' +
      formatNumber(r.words).padStart(6) + ' | ' +
      formatNumber(r.chars).padStart(7) + ' | ' +
      formatNumber(r.lines).padStart(5) + ' | ' +
      r.tokenWordRatio.padStart(6)
    );
  }
  console.log('='.repeat(88) + '\n');
}

// CLI Argument Parsing
const args = process.argv.slice(2);

if (args.length === 0) {
  // Scan all prompt files in current workspace or parent directory
  const rootDir = process.cwd();
  const searchDirs = [rootDir, path.join(rootDir, '..')];
  const promptFiles = [];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const f of files) {
        if ((f.endsWith('.xml') || f.endsWith('.md')) && !f.startsWith('.') && f !== 'README.md' && f !== 'WEBSITE_DESIGN.md' && f !== 'AGENTS.md' && f !== 'gradingsystem.md') {
          const fullPath = path.join(dir, f);
          if (!promptFiles.some(p => p.name === f) && fs.statSync(fullPath).isFile()) {
            promptFiles.push({ name: f, path: fullPath });
          }
        }
      }
    }
  }

  if (promptFiles.length === 0) {
    console.log('Usage: node token_calc.js <path/to/file.xml> OR node token_calc.js --text "prompt text"');
    process.exit(0);
  }

  const results = promptFiles.map(file => {
    const content = fs.readFileSync(file.path, 'utf-8');
    return analyzeText(content, file.name);
  });

  printReport(results);
} else if (args[0] === '--text' || args[0] === '-t') {
  const rawText = args.slice(1).join(' ');
  const res = analyzeText(rawText, 'Raw Text Input');
  printReport([res]);
} else {
  // Analyze specified files
  const results = [];
  for (const arg of args) {
    const filePath = path.resolve(process.cwd(), arg);
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const content = fs.readFileSync(filePath, 'utf-8');
        results.push(analyzeText(content, path.basename(filePath)));
      }
    } else {
      console.error(`❌ File not found: ${arg}`);
    }
  }

  if (results.length > 0) {
    printReport(results);
  }
}
