import React, { useState } from 'react';
import { Copy, Check, Download, ChevronDown, ChevronUp, Cpu, Hash } from 'lucide-react';

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
      <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800">
                <Cpu className="w-3.5 h-3.5 text-stone-500" />
                {prompt.model}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-stone-100 text-stone-600 font-mono">
                <Hash className="w-3 h-3 text-stone-500" />
                ~{prompt.tokens.toLocaleString()} tokens
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
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
          <div className="mt-5 p-3.5 rounded-xl bg-stone-100/70 border border-stone-200/60">
            <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2 font-mono">
              Empirical Sampler Calibration
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              <div className="bg-white p-2 rounded-lg border border-stone-200/60">
                <span className="text-[10px] text-stone-600 block font-medium">Temperature</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.temp}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60">
                <span className="text-[10px] text-stone-600 block font-medium">Top-P</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.topP}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60">
                <span className="text-[10px] text-stone-600 block font-medium">Top-K</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.topK || 'Off'}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60">
                <span className="text-[10px] text-stone-600 block font-medium">Min-P</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.minP}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60">
                <span className="text-[10px] text-stone-600 block font-medium">Rep. Penalty</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.repPenalty}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/60">
                <span className="text-[10px] text-stone-600 block font-medium">Freq. Penalty</span>
                <span className="font-mono font-bold text-stone-900">{prompt.samplers.freqPenalty || '0.00'}</span>
              </div>
            </div>

            {prompt.communityTip && (
              <p className="mt-2.5 text-[11px] text-stone-600 leading-relaxed bg-white/70 p-2 rounded-lg border border-stone-200/50">
                <strong className="text-stone-900 font-semibold">Community Note:</strong> {prompt.communityTip}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Code Block Container */}
      <div className="relative bg-[#F8F9FA]">
        <pre
          className={`p-5 md:p-6 text-xs md:text-sm font-mono text-stone-800 overflow-x-auto ${
            isExpanded ? 'max-h-none' : 'max-h-60 overflow-hidden'
          }`}
        >
          <code>{prompt.content}</code>
        </pre>

        {/* Expand / Collapse Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-stone-200/80 bg-white">
          <span className="text-xs text-stone-500 font-mono">
            {lines.length} lines
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {isExpanded ? (
              <>
                Collapse Prompt
                <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
              </>
            ) : (
              <>
                View Full Prompt ({lines.length} lines)
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
