import React, { useState, useMemo } from 'react';
import { PROMPTS } from './data/prompts';
import PromptCard from './components/PromptCard';
import VariableToolbar from './components/VariableToolbar';
import ComingSoon from './components/ComingSoon';
import { Search, Compass, Sparkles, Layers, Terminal, BookOpen, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'gemini', 'claude', 'deepseek', 'mimo'
  const [searchQuery, setSearchQuery] = useState('');
  const [charName, setCharName] = useState('{{char}}');
  const [userName, setUserName] = useState('{{user}}');

  // Filter prompts
  const activePrompts = useMemo(() => {
    if (activeTab !== 'gemini' && activeTab !== 'claude') return [];
    const list = PROMPTS[activeTab] || [];
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.content.toLowerCase().includes(q)
    );
  }, [activeTab, searchQuery]);

  const tabs = [
    { id: 'overview', index: '01', label: 'Overview' },
    { id: 'gemini', index: '02', label: 'Gemini', count: 3 },
    { id: 'claude', index: '03', label: 'Claude', count: 2 },
    { id: 'deepseek', index: '04', label: 'DeepSeek', badge: 'Soon' },
    { id: 'mimo', index: '05', label: 'Mimo', badge: 'Soon' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#18181B] font-sans">
      {/* Editorial Header */}
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className="text-lg font-bold tracking-tight text-stone-950 font-sans cursor-pointer hover:opacity-80 transition-opacity"
            >
              PROMPT KNIGHT
            </button>
            <span className="hidden sm:inline text-xs font-mono text-stone-400">
              / ROLEPLAY SYSTEM DIRECTIVES
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
            <a
              href="https://github.com/Kars32/PromptMaster-Vault"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              GitHub
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Header */}
      <div className="border-b border-stone-200/80 bg-[#FAFAF8]/95 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-4 py-2.5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <span className={isActive ? 'text-stone-400' : 'text-stone-400'}>
                    {tab.index}
                  </span>
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span className="text-[9px] uppercase px-1 rounded bg-stone-200/60 text-stone-500 font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex-1 w-full">
        {/* Search & Variable Injector for Gemini/Claude */}
        {(activeTab === 'gemini' || activeTab === 'claude') && (
          <>
            <VariableToolbar
              charName={charName}
              setCharName={setCharName}
              userName={userName}
              setUserName={setUserName}
            />

            <div className="relative mb-8">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Filter ${activeTab.toUpperCase()} directives by keyword, token limit, or tag...`}
                className="w-full text-xs font-mono pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none transition-all shadow-xs"
              />
            </div>
          </>
        )}

        {/* TAB 01: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="border-b border-stone-200 pb-8">
              <span className="font-mono text-xs text-stone-500 block mb-2">
                SYSTEM SPECIFICATION & ARCHITECTURE
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-950 font-sans mb-4">
                Prompt Knight
              </h1>
              <p className="text-lg md:text-xl font-editorial text-stone-600 italic leading-relaxed">
                A repository of zero-compromise prompt systems engineered to bypass assistant moralizing, enforce rigorous anti-puppeting turn boundaries, and eliminate multi-character telepathy.
              </p>
            </div>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="surface-card p-6 rounded-xl border border-stone-200">
                <span className="font-mono text-xs font-bold text-stone-400 block mb-2">01 // ISOLATION</span>
                <h2 className="text-sm font-bold text-stone-950 mb-2">Fictional Sandbox Isolation</h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Strictly divorces fictional creative writing from real-world refusals, meta-commentary, and unsolicited safety lecturing.
                </p>
              </div>

              <div className="surface-card p-6 rounded-xl border border-stone-200">
                <span className="font-mono text-xs font-bold text-stone-400 block mb-2">02 // AGENCY</span>
                <h2 className="text-sm font-bold text-stone-950 mb-2">Anti-Puppeting Firewall</h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Imposes absolute syntactic barriers stopping models from assuming actions, internal thoughts, or dialogue for <code className="font-mono text-stone-800 bg-stone-100 px-1 py-0.5 rounded text-[11px]">{"{{user}}"}</code>.
                </p>
              </div>

              <div className="surface-card p-6 rounded-xl border border-stone-200">
                <span className="font-mono text-xs font-bold text-stone-400 block mb-2">03 // EPISTEMICS</span>
                <h2 className="text-sm font-bold text-stone-950 mb-2">Multi-NPC Knowledge Quarantine</h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Prevents ambient characters from telepathically knowing private 1-on-1 secrets or off-screen events without in-world proof.
                </p>
              </div>
            </div>

            {/* Mathematical Sampling Formulation (CKW Standard) */}
            <div className="surface-card p-6 md:p-8 rounded-xl border border-stone-200">
              <span className="font-mono text-xs font-bold text-stone-400 block mb-2">
                MATHEMATICAL SAMPLING SPECIFICATION
              </span>
              <h2 className="text-base font-bold text-stone-950 mb-3">
                Softmax Temperature & Min-P Dynamic Truncation
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed mb-6 font-sans">
                Standard Top-P truncation artificially flattens prose diversity in high-probability contexts and allows noise in low-probability tails. Prompt Knight directives are calibrated for <strong>Min-P dynamic truncation</strong>:
              </p>

              {/* Annotated Formula */}
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800 space-y-2 mb-4">
                <div className="text-sm font-semibold text-stone-950">
                  P(x_i) = exp(z_i / T) / Σ_j exp(z_j / T)
                </div>
                <div className="text-stone-600">
                  Threshold = p_max · Min-P
                </div>
                <div className="text-stone-600">
                  Candidate Set S = &#123; x_i | P(x_i) ≥ Threshold &#125;
                </div>
              </div>

              <div className="text-xs text-stone-500 font-mono space-y-1">
                <div>• <strong className="text-stone-700">T (Temperature)</strong>: Controls logit entropy before softmax ($T \in [0.85, 0.92]$ recommended).</div>
                <div>• <strong className="text-stone-700">p_max</strong>: Probability of the top-ranked token candidate in the active vocabulary.</div>
                <div>• <strong className="text-stone-700">Min-P</strong>: Scaled cutoff factor ($0.05$ recommended), discarding tokens below $5\%$ of the leader's probability.</div>
              </div>
            </div>

            {/* Navigation CTA */}
            <div className="p-6 rounded-xl bg-stone-100 border border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <strong className="text-sm font-bold text-stone-950 block">Ready to deploy a directive?</strong>
                <span className="text-xs text-stone-600">Select a model suite from the navigation above.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('gemini')}
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-mono font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  View Gemini (3) →
                </button>
                <button
                  onClick={() => setActiveTab('claude')}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-800 bg-white text-xs font-mono font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  View Claude (2) →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 02 & 03: GEMINI & CLAUDE */}
        {(activeTab === 'gemini' || activeTab === 'claude') && (
          <div>
            <div className="mb-6 flex items-baseline justify-between border-b border-stone-200 pb-3">
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-950 uppercase font-sans">
                  {activeTab} Directive Suite
                </h1>
                <span className="text-xs font-mono text-stone-500">
                  {activePrompts.length} Verified Production Architectures
                </span>
              </div>
            </div>

            {activePrompts.length > 0 ? (
              <div>
                {activePrompts.map((prompt, idx) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    index={idx}
                    charName={charName}
                    userName={userName}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 surface-card rounded-xl border border-stone-200">
                <p className="text-stone-500 text-xs font-mono">
                  No directives matched query "{searchQuery}".
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 04: DEEPSEEK */}
        {activeTab === 'deepseek' && (
          <ComingSoon
            suiteName="DeepSeek"
            targetModel="DeepSeek V3 & DeepSeek R1"
            overview="Directives currently undergoing reasoning trace benchmarking, isolating chain-of-thought analysis from creative prose delivery."
            plannedDirectives={[
              {
                title: 'DeepSeek V3 Pure Creative Matrix',
                detail: 'High-speed, uninhibited roleplay engine with somatic prose and dynamic memory indexing.'
              },
              {
                title: 'DeepSeek R1 Guided <think> Harness',
                detail: 'Channels internal reasoning steps into epistemic firewalls and physical combat calculus before emitting narration.'
              }
            ]}
          />
        )}

        {/* TAB 05: MIMO */}
        {activeTab === 'mimo' && (
          <ComingSoon
            suiteName="Mimo / MiniMax"
            targetModel="Mimo & MiniMax Series"
            overview="Calibrating prompt systems for 100k+ token context windows to prevent repetition loops, voice flattening, and relationship reset degradation."
            plannedDirectives={[
              {
                title: 'Mimo Long-Session Context Anchor',
                detail: 'Hard structural anchors maintaining character flaws and grudges across massive chat histories.'
              },
              {
                title: 'MiniMax Vocal Fingerprint Matrix',
                detail: 'Linguistic cadences and dialect markers across multi-NPC environments.'
              }
            ]}
          />
        )}
      </main>

      {/* Minimalist Editorial Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-6 mt-16 text-xs text-stone-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>PROMPT KNIGHT // MAINTAINED BY KARS</span>
          <span>ZERO PREACHINESS · ANTI-PUPPETING ENFORCED</span>
        </div>
      </footer>
    </div>
  );
}
