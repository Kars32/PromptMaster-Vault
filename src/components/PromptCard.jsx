import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Check, Download, ChevronDown, ChevronUp, Cpu, Hash, Terminal, History, RotateCcw, Boxes, Puzzle, X, Plus, Trash2, Eye, EyeOff, Layers, Sparkles, AlertTriangle } from 'lucide-react';

export default function PromptCard({ prompt, index }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVersionKey, setSelectedVersionKey] = useState('current');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isOocOpen, setIsOocOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [copiedModuleId, setCopiedModuleId] = useState(null);
  const [expandedPreviewIds, setExpandedPreviewIds] = useState([]);

  // Active module IDs state
  const [activeModuleIds, setActiveModuleIds] = useState(() => {
    if (prompt.modules) {
      return prompt.modules.filter((m) => m.defaultEnabled).map((m) => m.id);
    }
    return [];
  });

  // Close modules drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModulesOpen) {
        setIsModulesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModulesOpen]);

  const hasHistory = prompt.history && prompt.history.length > 0;
  const availableModules = prompt.modules || [];

  const toggleModule = (id) => {
    setActiveModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const togglePreview = (id) => {
    setExpandedPreviewIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const selectAllModules = () => {
    setActiveModuleIds(availableModules.map((m) => m.id));
  };

  const deselectAllModules = () => {
    setActiveModuleIds([]);
  };

  const activeModules = useMemo(() => {
    return availableModules.filter((m) => activeModuleIds.includes(m.id));
  }, [availableModules, activeModuleIds]);

  const activeModulesTokens = useMemo(() => {
    return activeModules.reduce((acc, m) => acc + (m.tokens || 0), 0);
  }, [activeModules]);

  // Determine active version data
  const activeData = useMemo(() => {
    if (selectedVersionKey === 'current' || !hasHistory) {
      return {
        version: prompt.version || 'v1.0 (Current)',
        isCurrent: true,
        tokens: prompt.tokens,
        content: prompt.content,
        tagline: prompt.tagline
      };
    }
    const historicalItem = prompt.history.find((h) => h.version === selectedVersionKey);
    if (historicalItem) {
      return {
        version: historicalItem.version,
        label: historicalItem.label || historicalItem.version,
        isCurrent: false,
        tokens: historicalItem.tokens,
        content: historicalItem.content,
        tagline: historicalItem.tagline || prompt.tagline,
        date: historicalItem.date
      };
    }
    return {
      version: prompt.version || 'v1.0 (Current)',
      isCurrent: true,
      tokens: prompt.tokens,
      content: prompt.content,
      tagline: prompt.tagline
    };
  }, [prompt, selectedVersionKey, hasHistory]);

  // Final combined content & token counts with attached modules
  const finalContent = useMemo(() => {
    if (!activeData.isCurrent || activeModules.length === 0) {
      return activeData.content;
    }
    const moduleText = activeModules.map((m) => m.content).join('\n\n');
    if (activeData.content.includes('</system_directive>')) {
      return activeData.content.replace('</system_directive>', `${moduleText}\n</system_directive>`);
    }
    return `${activeData.content}\n\n${moduleText}`;
  }, [activeData, activeModules]);

  const finalTokens = useMemo(() => {
    if (!activeData.isCurrent || activeModules.length === 0) {
      return activeData.tokens;
    }
    return activeData.tokens + activeModulesTokens;
  }, [activeData, activeModulesTokens]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyModuleSnippet = async (id, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedModuleId(id);
      setTimeout(() => setCopiedModuleId(null), 1500);
    } catch (err) {
      console.error('Failed to copy module: ', err);
    }
  };

  const handleCopyCommand = async (syntax) => {
    try {
      await navigator.clipboard.writeText(syntax);
      setCopiedCmd(syntax);
      setTimeout(() => setCopiedCmd(null), 1500);
    } catch (err) {
      console.error('Failed to copy command: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([finalContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const moduleSuffix = activeModules.length > 0 ? `_with_${activeModules.length}_modules` : '';
    link.download = `${prompt.id}_${activeData.version.replace(/[^a-zA-Z0-9_-]/g, '_')}${moduleSuffix}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = finalContent.split('\n');

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs mb-8 overflow-hidden transition-all duration-200">
      {/* Header Info */}
      <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50/40">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {/* Top Badges & Version Selector */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800 font-sans">
                <Cpu className="w-3.5 h-3.5 text-stone-500" />
                {prompt.model}
              </span>

              {/* Version History Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold font-mono border transition-all cursor-pointer ${
                    activeData.isCurrent
                      ? 'bg-stone-100 border-stone-200 text-stone-800 hover:bg-stone-200/70'
                      : 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                  }`}
                  title="View prompt version history and legacy fallbacks"
                >
                  <History className="w-3 h-3 text-stone-500" />
                  <span>{activeData.version}</span>
                  {hasHistory && <ChevronDown className="w-3 h-3 text-stone-400" />}
                </button>

                {/* Dropdown Menu for History */}
                {isHistoryOpen && (
                  <div
                    className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl border border-stone-200 shadow-lg z-20 p-1.5 text-xs font-sans"
                    onMouseLeave={() => setIsHistoryOpen(false)}
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono border-b border-stone-100 mb-1">
                      Version Fallbacks
                    </div>

                    {/* Current Version Option */}
                    <button
                      onClick={() => {
                        setSelectedVersionKey('current');
                        setIsHistoryOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        selectedVersionKey === 'current'
                          ? 'bg-stone-900 text-white font-semibold'
                          : 'hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs flex items-center gap-1.5">
                          <span>{prompt.version || 'v1.0 (Current)'}</span>
                          <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${selectedVersionKey === 'current' ? 'bg-stone-800 text-emerald-300' : 'bg-emerald-50 text-emerald-700'}`}>
                            LATEST
                          </span>
                        </div>
                        <span className={`text-[10px] block ${selectedVersionKey === 'current' ? 'text-stone-300' : 'text-stone-500'}`}>
                          {prompt.tokens.toLocaleString()} tokens · Active build
                        </span>
                      </div>
                      {selectedVersionKey === 'current' && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>

                    {/* Historical Fallback Versions */}
                    {hasHistory ? (
                      prompt.history.map((hist) => {
                        const isSelected = selectedVersionKey === hist.version;
                        return (
                          <button
                            key={hist.version}
                            onClick={() => {
                              setSelectedVersionKey(hist.version);
                              setIsHistoryOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between mt-1 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-100 text-amber-950 font-semibold'
                                : 'hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-xs flex items-center gap-1.5">
                                <span>{hist.label || hist.version}</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-stone-200 text-stone-600 font-mono">
                                  FALLBACK
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-500 block">
                                {hist.tokens ? `${hist.tokens.toLocaleString()} tokens` : ''} {hist.date ? `· ${hist.date}` : ''}
                              </span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-800 shrink-0" />}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-2.5 py-2 text-[11px] text-stone-400 italic">
                        No older versions logged yet.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Exact Token Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-stone-900 text-stone-100 font-mono">
                <Hash className="w-3 h-3 text-stone-400" />
                {finalTokens.toLocaleString()} tokens
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 font-sans">
              {prompt.title}
            </h2>
            <p className="text-sm text-stone-500 mt-1 font-medium">
              {activeData.tagline}
            </p>

            {/* Fallback Active Banner */}
            {!activeData.isCurrent && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold">⚠️ Fallback Version Active:</span>
                  <span>Viewing {activeData.version}.</span>
                </div>
                <button
                  onClick={() => setSelectedVersionKey('current')}
                  className="px-2.5 py-1 rounded-lg bg-amber-900 text-white font-semibold text-[11px] hover:bg-amber-950 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Switch to Latest
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {availableModules.length > 0 ? (
              <button
                onClick={() => setIsModulesOpen(!isModulesOpen)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
                  activeModules.length > 0
                    ? 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100'
                    : isModulesOpen
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
                title="View and toggle optional system modules"
              >
                <Boxes className={`w-3.5 h-3.5 ${activeModules.length > 0 ? 'text-amber-600' : isModulesOpen ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>Modules</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                  activeModules.length > 0
                    ? 'bg-amber-200 text-amber-900'
                    : isModulesOpen
                    ? 'bg-stone-800 text-stone-300'
                    : 'bg-stone-100 text-stone-700'
                }`}>
                  {activeModules.length}
                </span>
              </button>
            ) : (
              <div
                className="px-3 py-2 rounded-xl text-xs font-semibold border border-stone-200/80 bg-stone-100/70 text-stone-600 flex items-center gap-1.5 select-none"
                title="Monolithic architecture with all subsystems permanently built-in"
              >
                <Boxes className="w-3.5 h-3.5 text-stone-400" />
                <span>Monolithic Build</span>
              </div>
            )}
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

        {/* OOC Commands Dropdown */}
        {prompt.oocCommands && prompt.oocCommands.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-200/60">
            <button
              onClick={() => setIsOocOpen(!isOocOpen)}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 transition-all flex items-center justify-between cursor-pointer font-sans text-xs font-semibold shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-stone-900 text-amber-300 text-[10px] font-mono font-bold">
                  ⚡
                </span>
                <span className="font-bold text-stone-900">OOC Director Commands & Controls</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-[10px] font-mono">
                  {prompt.oocCommands.reduce((acc, c) => acc + c.commands.length, 0)} commands
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[11px]">
                <span>{isOocOpen ? 'Hide Commands' : 'View Commands'}</span>
                {isOocOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </button>

            {/* Collapsible OOC Drawer */}
            {isOocOpen && (
              <div className="mt-3 p-4 rounded-xl bg-stone-50/70 border border-stone-200 shadow-2xs space-y-4">
                <div className="text-[11px] text-stone-600 pb-2 border-b border-stone-200/70 flex items-center justify-between">
                  <span>Send commands inside curly braces <code className="font-mono bg-stone-200 px-1 py-0.5 rounded text-stone-900">{'{...}'}</code>. Persistent settings stay active across all subsequent turns.</span>
                </div>

                {prompt.oocCommands.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-600 font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                      {cat.category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {cat.commands.map((cmd, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 rounded-lg bg-white border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-semibold text-xs text-stone-900 font-sans">
                                {cmd.name}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyCommand(cmd.example || cmd.syntax);
                                }}
                                className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                                title="Copy example command"
                              >
                                {copiedCmd === (cmd.example || cmd.syntax) ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-700">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-stone-400" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-[11px] text-stone-600 leading-relaxed mb-2">
                              {cmd.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-stone-100 font-mono text-[11px] flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-stone-800 font-bold bg-stone-50 px-2 py-1 rounded border border-stone-200/60 overflow-x-auto">
                              <span className="text-stone-400 text-[10px] select-none">CMD:</span>
                              <code>{cmd.syntax}</code>
                            </div>
                            {cmd.example && (
                              <div className="text-[10px] text-stone-500 truncate px-1">
                                <span className="font-semibold text-stone-400 select-none">Ex: </span>
                                <span className="text-stone-600">{cmd.example}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full-Width Codeblock */}
      <div className="p-6 md:p-8 pt-0">
        <div className="rounded-xl border border-stone-200/90 bg-[#F7F7F5] overflow-hidden shadow-2xs">
          {/* Codeblock Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#EEEEEC] border-b border-stone-200 text-xs font-mono text-stone-600">
            <div className="flex items-center gap-2">
              <span className="text-stone-900 font-bold flex items-center gap-1.5 text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-stone-500" />
                {prompt.id}_{activeData.version.replace(/[^a-zA-Z0-9_-]/g, '')}.{finalContent.trim().startsWith('<') || prompt.format.toLowerCase().includes('xml') ? 'xml' : 'txt'}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
                {prompt.format}
              </span>
              {availableModules.length > 0 && (
                <button
                  onClick={() => setIsModulesOpen(true)}
                  className={`text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors px-2 py-0.5 rounded ${
                    activeModules.length > 0
                      ? 'text-amber-900 bg-amber-100 hover:bg-amber-200 font-bold'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
                  }`}
                  title="Open Optional Modules Drawer"
                >
                  <Boxes className={`w-3.5 h-3.5 ${activeModules.length > 0 ? 'text-amber-600' : 'text-stone-500'}`} />
                  <span>Modules ({activeModules.length})</span>
                </button>
              )}
              <button
                onClick={handleCopy}
                className="text-[11px] font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 cursor-pointer transition-colors px-2 py-0.5 rounded hover:bg-stone-200/70"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-stone-500" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Codeblock Viewport (Full Width 100%) */}
          <div
            className={`font-mono text-xs text-stone-800 p-4 sm:p-5 overflow-x-auto ${
              isExpanded ? 'max-h-none' : 'max-h-72 overflow-hidden'
            }`}
          >
            <pre className="leading-relaxed whitespace-pre font-mono">
              <code>{finalContent}</code>
            </pre>
          </div>

          {/* Codeblock Bottom Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-stone-200/80 bg-[#EEEEEC]">
            <span className="text-xs text-stone-500 font-mono">
              {lines.length} lines · {finalTokens.toLocaleString()} tokens ({activeData.version}){activeModules.length > 0 ? ` (+${activeModulesTokens.toLocaleString()} modular)` : ''}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {isExpanded ? (
                <>
                  Collapse
                  <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
                </>
              ) : (
                <>
                  View Full ({lines.length} lines)
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right-Side Slide-Over Modules Drawer */}
      {isModulesOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-stone-950/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsModulesOpen(false)}
          />

          {/* Right Slide-Over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-white border-l border-stone-200 shadow-2xl flex flex-col transform transition ease-in-out duration-300">
              {/* Drawer Top Bar */}
              <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#EEEEEC] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center shadow-2xs">
                    <Boxes className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-stone-900 font-sans">
                        Optional Modules
                      </h3>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-stone-200 text-stone-800">
                        {prompt.model}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-sans">
                      Plug-and-play extensions attached dynamically to your prompt
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModulesOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
                  title="Close Modules panel (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4 font-sans">
                {/* Fallback Active Notice in Drawer */}
                {!activeData.isCurrent && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col gap-2 shadow-2xs">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Historical Fallback Active ({activeData.version})</div>
                        <p className="text-[11px] text-amber-800/90 mt-0.5">
                          Dynamic module injection is exclusively supported on the latest active architecture ({prompt.version || 'v20'}). Switch to latest to enable modular assembly.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedVersionKey('current');
                      }}
                      className="self-start px-2.5 py-1 rounded-lg bg-amber-900 text-white font-semibold text-[11px] hover:bg-amber-950 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Switch to Latest & Enable Modules
                    </button>
                  </div>
                )}

                {availableModules.length > 0 ? (
                  <>
                    {/* Quick Action Toolbar */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${activeModules.length > 0 ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                        <span className="font-semibold text-stone-900">
                          {activeModules.length} of {availableModules.length} Active
                        </span>
                        {activeModulesTokens > 0 && (
                          <span className="text-[11px] font-mono text-stone-500 font-bold">
                            (+{activeModulesTokens.toLocaleString()} tok)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={selectAllModules}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                        >
                          Select All
                        </button>
                        <button
                          onClick={deselectAllModules}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    {/* Modules List */}
                    <div className="space-y-3">
                      {availableModules.map((module) => {
                        const isActive = activeModuleIds.includes(module.id);
                        const isPreviewOpen = expandedPreviewIds.includes(module.id);

                        return (
                          <div
                            key={module.id}
                            className={`p-4 rounded-xl border transition-all shadow-2xs ${
                              isActive
                                ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300/60'
                                : 'bg-white border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            {/* Card Top Metadata */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase tracking-wider bg-stone-100 text-stone-700 border border-stone-200">
                                  {module.category}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-stone-900 text-amber-300">
                                  +{module.tokens.toLocaleString()} tokens
                                </span>
                              </div>

                              {/* Direct Add / Remove Button */}
                              <button
                                onClick={() => toggleModule(module.id)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
                                  isActive
                                    ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                                    : 'bg-stone-900 hover:bg-black text-white'
                                }`}
                              >
                                {isActive ? (
                                  <>
                                    <Trash2 className="w-3 h-3 text-red-600" />
                                    <span>Remove</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3 text-amber-300" />
                                    <span>Add Module</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Title & Description */}
                            <h4 className="font-bold text-xs text-stone-900 font-sans mt-2">
                              {module.name}
                            </h4>
                            <p className="text-[11px] text-stone-600 leading-relaxed mt-1">
                              {module.description}
                            </p>

                            {/* Card Footer: Code Preview Toggle & Copy Snippet */}
                            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                              <button
                                onClick={() => togglePreview(module.id)}
                                className="text-[11px] font-medium text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                {isPreviewOpen ? (
                                  <>
                                    <EyeOff className="w-3 h-3 text-stone-400" />
                                    <span>Hide XML Snippet</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3 h-3 text-stone-400" />
                                    <span>Preview XML Snippet</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleCopyModuleSnippet(module.id, module.content)}
                                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                                title="Copy module XML directly"
                              >
                                {copiedModuleId === module.id ? (
                                  <>
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                    <span className="text-emerald-700">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-2.5 h-2.5 text-stone-400" />
                                    <span>Copy Snippet</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Expandable XML Preview Box */}
                            {isPreviewOpen && (
                              <div className="mt-2.5 p-3 rounded-lg bg-[#F7F7F5] border border-stone-200 overflow-hidden font-mono text-[10px] text-stone-800 max-h-48 overflow-y-auto">
                                <pre className="whitespace-pre font-mono leading-relaxed">
                                  <code>{module.content}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/70 p-4 text-center">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 mx-auto mb-2.5 shadow-2xs">
                      <Puzzle className="w-5 h-5 text-stone-800" />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 mb-1">
                      No Modules Registered Yet
                    </h4>
                    <p className="text-[11px] text-stone-600 leading-relaxed max-w-xs mx-auto">
                      Optional subsystem extensions for {prompt.model} will appear here when configured.
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Bottom Bar */}
              <div className="p-4 border-t border-stone-200 bg-[#EEEEEC] flex items-center justify-between font-mono text-xs text-stone-600">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${activeModules.length > 0 ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                  <span className="font-semibold text-stone-800">
                    {activeModules.length} Modules Attached ({finalTokens.toLocaleString()} tot tok)
                  </span>
                </div>
                <button
                  onClick={() => setIsModulesOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold font-sans cursor-pointer transition-colors shadow-2xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
