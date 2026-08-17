import React, { useState } from 'react';
import { Copy, Check, Download, Eye, EyeOff, Sliders, Hash, Cpu, Sparkles } from 'lucide-react';

export default function PromptCard({ prompt, charName, userName }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamically replace variables if provided
  const processedContent = React.useMemo(() => {
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
      console.error('Failed to copy: ', err);
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

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden mb-8">
      {/* Card Header */}
      <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50/40">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-500/20">
                <Cpu className="w-3.5 h-3.5 text-amber-600" />
                {prompt.model}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-200/70 text-stone-700">
                <Hash className="w-3 h-3 text-stone-500" />
                ~{prompt.tokens.toLocaleString()} Tokens
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
              {prompt.title}
            </h2>
            <p className="text-sm md:text-base text-stone-500 mt-1 font-medium">
              {prompt.tagline}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              title="Download file"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              Download
            </button>
            <button
              onClick={handleCopy}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied! ✓
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-stone-200/60">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Sampler Settings Box */}
        {prompt.samplers && (
          <div className="mt-5 p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/80 flex flex-wrap items-center gap-4 text-xs text-stone-700">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <Sliders className="w-3.5 h-3.5 text-amber-700" />
              Recommended Samplers:
            </div>
            <div className="flex items-center gap-4 font-mono font-medium">
              <span>Temperature: <strong className="text-amber-800">{prompt.samplers.temp}</strong></span>
              <span>Top-P: <strong className="text-amber-800">{prompt.samplers.topP}</strong></span>
              <span>Min-P: <strong className="text-amber-800">{prompt.samplers.minP}</strong></span>
              {prompt.samplers.repPenalty && (
                <span>Rep-Penalty: <strong className="text-amber-800">{prompt.samplers.repPenalty}</strong></span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Code Container */}
      <div className="relative">
        <pre
          className={`p-6 text-xs md:text-sm font-mono text-stone-800 bg-[#F8FAFC] overflow-x-auto transition-all ${
            isExpanded ? 'max-h-[800px] overflow-y-auto' : 'max-h-56 overflow-hidden'
          }`}
        >
          <code>{processedContent}</code>
        </pre>

        {/* Fade Out & Expand Button */}
        <div
          className={`absolute bottom-0 inset-x-0 flex items-center justify-center p-4 ${
            isExpanded
              ? 'bg-transparent'
              : 'bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent pt-12'
          }`}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-stone-50 border border-stone-300/80 text-stone-700 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            {isExpanded ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-stone-500" />
                Collapse Preview
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-stone-500" />
                View Full Prompt ({processedContent.split('\n').length} lines)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
