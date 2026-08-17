import React, { useState } from 'react';
import { Copy, Check, Download, ChevronDown, ChevronUp, Cpu, Hash, Terminal } from 'lucide-react';

export default function PromptCard({ prompt, index }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const isXml = prompt.format.toLowerCase().includes('xml');
    const ext = isXml ? 'xml' : 'txt';
    const blob = new Blob([prompt.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.id}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = prompt.content.split('\n');

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs mb-8 overflow-hidden transition-all duration-200">
      {/* Header Info */}
      <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50/40">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800 font-sans">
                <Cpu className="w-3.5 h-3.5 text-stone-500" />
                {prompt.model}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-stone-900 text-stone-100 font-mono">
                <Hash className="w-3 h-3 text-stone-400" />
                {prompt.tokens.toLocaleString()} tokens
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 font-sans">
              {prompt.title}
            </h2>
            <p className="text-sm text-stone-500 mt-1 font-medium">
              {prompt.tagline}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
              title="Download prompt file"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              Download
            </button>
            <button
              onClick={handleCopy}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-black text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  Copied! ✓
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-300" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sampler Quick Settings */}
        {prompt.samplers && (
          <div className="mt-5 p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block font-mono">
                Sampler Configuration
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              <div className="bg-white p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                <span className="text-[10px] text-stone-500 block font-medium">Temperature</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.temp}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                <span className="text-[10px] text-stone-500 block font-medium">Top-P</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.topP}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                <span className="text-[10px] text-stone-500 block font-medium">Top-K</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.topK}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                <span className="text-[10px] text-stone-500 block font-medium">Min-P</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.minP}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                <span className="text-[10px] text-stone-500 block font-medium">Rep. Penalty</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.repPenalty}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60 shadow-2xs">
                <span className="text-[10px] text-stone-500 block font-medium">Freq. Penalty</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.freqPenalty}</span>
              </div>
            </div>

            {prompt.communityTip && (
              <p className="mt-2.5 text-[11px] text-stone-600 leading-relaxed bg-white/90 p-2 rounded-lg border border-stone-200/60">
                <strong className="text-stone-900 font-semibold">Note:</strong> {prompt.communityTip}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Codeblock Container */}
      <div className="bg-[#18181B] text-stone-100 border-t border-stone-800">
        {/* Codeblock Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#121214] border-b border-stone-800/80 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" />
            </div>
            <span className="text-stone-300 font-medium ml-2 flex items-center gap-1 text-[11px]">
              <Terminal className="w-3 h-3 text-stone-500" />
              {prompt.id}.{prompt.format.toLowerCase().includes('xml') ? 'xml' : 'txt'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-500 hidden sm:inline">
              {prompt.format}
            </span>
            <button
              onClick={handleCopy}
              className="text-[11px] text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-stone-400" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Codeblock Viewport */}
        <div
          className={`font-mono text-xs text-stone-200 p-4 sm:p-6 overflow-x-auto ${
            isExpanded ? 'max-h-none' : 'max-h-64 overflow-hidden'
          }`}
        >
          <pre className="leading-relaxed whitespace-pre font-mono">
            <code>{prompt.content}</code>
          </pre>
        </div>

        {/* Expand / Collapse Tray */}
        <div className="flex items-center justify-between px-6 py-2.5 border-t border-stone-800/80 bg-[#141416]">
          <span className="text-xs text-stone-500 font-mono">
            {lines.length} lines · {prompt.tokens.toLocaleString()} tokens
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-stone-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {isExpanded ? (
              <>
                Collapse Codeblock
                <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
              </>
            ) : (
              <>
                Expand Full Codeblock ({lines.length} lines)
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
