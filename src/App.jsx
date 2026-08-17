import React, { useState, useMemo } from 'react';
import { PROMPTS } from './data/prompts';
import PromptCard from './components/PromptCard';
import VariableInjector from './components/VariableInjector';
import ComingSoon from './components/ComingSoon';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Layers, 
  Terminal, 
  Compass, 
  ShieldCheck, 
  ExternalLink,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('intro'); // 'intro', 'gemini', 'claude', 'deepseek', 'mimo'
  const [searchQuery, setSearchQuery] = useState('');
  const [charName, setCharName] = useState('{{char}}');
  const [userName, setUserName] = useState('{{user}}');

  // Filter prompts based on activeTab and search
  const filteredPrompts = useMemo(() => {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#1C1917]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-amber-600/20">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-stone-950 text-base tracking-tight block">
                PromptMaster Vault
              </span>
            </div>
          </div>

          {/* Status & GitHub */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              5 Suites Active
            </span>
            <a
              href="https://github.com/Kars32/PromptMaster-Vault"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="View on GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-stone-100/70 border-b border-stone-200/80 sticky top-16 z-30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-2 py-2.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'intro', label: 'Introduction', icon: Compass },
              { id: 'gemini', label: 'Gemini', icon: Sparkles, count: 3 },
              { id: 'claude', label: 'Claude', icon: Layers, count: 2 },
              { id: 'deepseek', label: 'DeepSeek', icon: Terminal, badge: 'Soon' },
              { id: 'mimo', label: 'Mimo', icon: BookOpen, badge: 'Soon' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-amber-700 shadow-sm border border-stone-200/90'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                  {tab.label}
                  {tab.count && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-500 font-semibold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex-1 w-full">
        {/* Search Bar & Variable Injector (Only for model tabs) */}
        {(activeTab === 'gemini' || activeTab === 'claude') && (
          <>
            <VariableInjector
              charName={charName}
              setCharName={setCharName}
              userName={userName}
              setUserName={setUserName}
            />

            <div className="relative mb-8">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.toUpperCase()} prompts, tokens, tags...`}
                className="w-full text-sm pl-11 pr-4 py-3 rounded-2xl border border-stone-200/90 bg-white shadow-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:ring-3 focus:ring-amber-500/10 outline-none transition-all"
              />
            </div>
          </>
        )}

        {/* TAB 1: INTRODUCTION */}
        {activeTab === 'intro' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            {/* Hero Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-500/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Curated Roleplay Engineering
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight mb-4">
                Production-Grade System Prompts & Architectures
              </h1>
              <p className="text-base md:text-lg text-stone-600 leading-relaxed font-normal mb-8">
                A streamlined vault of production-calibrated prompt architectures built for <strong>Gemini</strong>, <strong>Claude</strong>, <strong>DeepSeek</strong>, and <strong>Mimo</strong>. Eliminates AI preachiness, enforces hard anti-puppeting firewalls, and enables rich literary prose.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('gemini')}
                  className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  Explore Gemini Suite (3 Prompts)
                </button>
                <button
                  onClick={() => setActiveTab('claude')}
                  className="px-6 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-sm transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  Explore Claude Suite (2 Prompts)
                </button>
              </div>
            </div>

            {/* Core Directives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-950 mb-1.5">Anti-Puppeting Enforcement</h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Hard turn boundaries prevent models from assuming dialogue, thoughts, or actions on behalf of <code className="text-amber-700 font-mono">{"{{user}}"}</code>.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-950 mb-1.5">Multi-NPC Epistemic Firewall</h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Quarantines private 1-on-1 events so ambient NPCs never magically leak secret knowledge without in-world justification.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-950 mb-1.5">Negative Realism & Inertia</h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  Eliminates artificial optimism and instant forgiveness. Characters maintain authentic psychological friction and slow-burn depth.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 & 3: GEMINI & CLAUDE */}
        {(activeTab === 'gemini' || activeTab === 'claude') && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900 capitalize">
                  {activeTab} Prompt Suite
                </h2>
                <p className="text-xs md:text-sm text-stone-500 mt-0.5">
                  Showing {filteredPrompts.length} verified production directives
                </p>
              </div>
            </div>

            {filteredPrompts.length > 0 ? (
              <div className="space-y-6">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    charName={charName}
                    userName={userName}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500 text-sm font-medium">
                  No prompts match your search query "{searchQuery}".
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DEEPSEEK */}
        {activeTab === 'deepseek' && (
          <ComingSoon
            suiteName="DeepSeek"
            description="Specialized prompt architectures calibrated for DeepSeek V3 and DeepSeek R1 reasoning models."
            plannedModules={[
              {
                name: 'DeepSeek V3 Creative Sandbox',
                desc: 'Uncensored high-speed roleplay engine with dynamic character state tracking.'
              },
              {
                name: 'DeepSeek R1 Guided CoT Harness',
                desc: 'Utilizes <think> tags for epistemic firewalls and tactical combat physics prior to prose generation.'
              }
            ]}
          />
        )}

        {/* TAB 5: MIMO */}
        {activeTab === 'mimo' && (
          <ComingSoon
            suiteName="Mimo / MiniMax"
            description="Directives optimized for ultra-long context window retention, voice differentiation, and SillyTavern presets."
            plannedModules={[
              {
                name: 'Mimo Long-Context Anchor',
                desc: 'Prevents context rot, repetitive phrasing, and memory decay past 100k tokens.'
              },
              {
                name: 'MiniMax Dialogue Engine',
                desc: 'Vocal fingerprinting across complex multi-cast scenarios.'
              }
            ]}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-8 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>PromptMaster Vault · Curated by Kars</span>
          <span>100% Free · Cloud Hosted 24/7 on Vercel & GitHub</span>
        </div>
      </footer>
    </div>
  );
}
