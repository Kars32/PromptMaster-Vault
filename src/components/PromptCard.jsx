import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowDownToLine, ChevronDown, ChevronUp } from 'lucide-react';

export default function PromptCard({ prompt, index, charName, userName }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Variable injection
  const processedContent = useMemo(() => {
    let text = prompt.content;
    if (charName && charName.trim() !== '' && charName !== '{{char}}') {
      text = text.replaceAll('{{char}}', charName);
    }
    if (userName && userName.trim() !== '' && userName !== '{{user}}') {
      text = text.replaceAll('{{user}}', userName);
    }
    return text;
  }, [prompt.content, charName, userName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const isXml = prompt.format.toLowerCase().includes('xml');
    const ext = isXml ? 'xml' : 'txt';
    const blob = new Blob([processedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.id}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = processedContent.split('\n');

  return (
    <article className="surface-card rounded-xl overflow-hidden mb-10 transition-all duration-200">
      {/* Header Bar */}
      <div className="p-6 md:p-8 border-b border-stone-200/80 bg-white">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-stone-500 tracking-wider">
              {String(index + 1).padStart(2, '0')} //
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-950 font-sans">
              {prompt.title}
            </h2>
          </div>

          {/* Action Affordances */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-98"
              title="Download file"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 text-stone-500" />
              Export
            </button>
            <button
              onClick={handleCopy}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-98 ${
                copied
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-900 hover:bg-black text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-300" />
                  Copy Directive
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-sm text-stone-600 font-editorial italic text-base mb-6">
          {prompt.tagline}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-stone-50 border border-stone-200/70 text-xs font-mono text-stone-700">
          <div>
            <span className="block text-[11px] text-stone-600 font-sans font-semibold mb-0.5">TARGET MODEL</span>
            <span className="font-semibold text-stone-900">{prompt.model}</span>
          </div>
          <div>
            <span className="block text-[11px] text-stone-600 font-sans font-semibold mb-0.5">CONTEXT FOOTPRINT</span>
            <span className="font-semibold text-stone-900">~{prompt.tokens.toLocaleString()} tokens</span>
          </div>
          <div>
            <span className="block text-[11px] text-stone-600 font-sans font-semibold mb-0.5">TEMPERATURE (T)</span>
            <span className="font-semibold text-stone-900">{prompt.samplers.temp}</span>
          </div>
          <div>
            <span className="block text-[11px] text-stone-600 font-sans font-semibold mb-0.5">MIN-P / TOP-P</span>
            <span className="font-semibold text-stone-900">{prompt.samplers.minP} / {prompt.samplers.topP}</span>
          </div>
        </div>
      </div>

      {/* Code Block Container */}
      <div className="relative bg-[#F8F8F7]">
        <div
          className={`font-mono text-xs text-stone-800 p-5 md:p-6 overflow-x-auto ${
            isExpanded ? 'max-h-none' : 'max-h-64 overflow-hidden'
          }`}
        >
          <pre className="leading-relaxed whitespace-pre font-mono">
            <code>{processedContent}</code>
          </pre>
        </div>

        {/* Expand / Collapse Tray */}
        <div
          className={`flex items-center justify-between px-6 py-3 border-t border-stone-200/60 bg-stone-50/80 ${
            !isExpanded && 'relative'
          }`}
        >
          <span className="text-xs font-mono text-stone-500">
            {lines.length} lines · {prompt.format}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-stone-800 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isExpanded ? (
              <>
                Collapse Directive
                <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
              </>
            ) : (
              <>
                Expand Full Directive
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
