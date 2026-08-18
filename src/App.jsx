import React, { useState, useMemo } from 'react';
import { PROMPTS } from './data/prompts';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import ComingSoon from './components/ComingSoon';
import { Search, Menu, PanelLeftOpen, ArrowRight, CheckCircle2, Shield, Users, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'gemini', 'claude', 'deepseek', 'mimo'
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filter prompts based on active tab and search query
  const currentPrompts = useMemo(() => {
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
    <div className="min-h-screen flex bg-[#FAFAF8] text-[#18181B] font-sans antialiased overflow-x-clip">
      {/* Retractable Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        setIsMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Layout Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200/80 h-16 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Show Sidebar Button (When retracted) */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-all cursor-pointer shadow-2xs"
                title="Show navigation sidebar"
              >
                <PanelLeftOpen className="w-4 h-4 text-stone-500" />
                <span>Show Menu</span>
              </button>
            )}

            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-stone-950 text-base sm:text-lg tracking-tight">
                Prompt Knight
              </span>
              <span className="text-xs text-stone-600 font-medium hidden sm:inline">
                / Roleplay Prompts
              </span>
            </div>
          </div>

          {/* Right Header Links */}
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://github.com/Kars32/Prompt-Knight"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg font-medium text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 md:py-12">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-10">
              {/* Clean Welcome Banner */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
                  Curated Roleplay Prompts
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight mb-3">
                  Tested System Prompts for Gemini & Claude
                </h1>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                  High-quality system prompts designed for creative roleplay in <strong>SillyTavern</strong> and <strong>Janitor AI</strong>. They prevent the AI from talking for you, keep characters in-personality, and produce natural, immersive prose.
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('gemini');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    Gemini Prompts (3)
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('claude');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    Claude Prompts (1)
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('deepseek');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    DeepSeek Prompts (1)
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('nvidia');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    Nvidia Prompts (1)
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>

              {/* Simple 3-Step Guide */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-stone-900">
                  How to Use in 3 Simple Steps
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center mb-3">
                      1
                    </div>
                    <h3 className="text-sm font-bold text-stone-950 mb-1">Pick Your Model</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Choose the prompt matching your model (e.g. Gemini 3.7 Flash, Claude Sonnet 4.6, DeepSeek V4, or Nemotron 3 Ultra).
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center mb-3">
                      2
                    </div>
                    <h3 className="text-sm font-bold text-stone-950 mb-1">Click Copy</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Hit the <strong>Copy Prompt</strong> button on the prompt card to copy the entire system prompt.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center mb-3">
                      3
                    </div>
                    <h3 className="text-sm font-bold text-stone-950 mb-1">Paste in Frontend</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Paste it into your <strong>Main Prompt</strong> or <strong>System Prompt</strong> in SillyTavern or Janitor AI.
                    </p>
                  </div>
                </div>
              </div>

              {/* What Makes These Prompts Better */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-stone-900">
                  Key Rules Enforced by These Prompts:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-950 block">Zero Puppeting</strong>
                      The AI will never speak, act, or make decisions for you.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-950 block">Consistent Personality</strong>
                      Characters stay in-character and do not soften or forgive unearned.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-950 block">No Preachiness</strong>
                      No moralizing lectures, fake apologies, or broken immersion.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2, 3, 4 & 5: GEMINI, CLAUDE, DEEPSEEK & NVIDIA */}
          {(activeTab === 'gemini' || activeTab === 'claude' || activeTab === 'deepseek' || activeTab === 'nvidia') && (
            <div>
              {/* Header & Search */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-stone-900 capitalize">
                    {activeTab === 'nvidia' ? 'NVIDIA' : activeTab} Roleplay Prompts
                  </h1>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {currentPrompts.length} prompt architectures available
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search prompts..."
                    className="w-full text-xs font-medium pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Prompt List */}
              {currentPrompts.length > 0 ? (
                <div className="space-y-6">
                  {currentPrompts.map((prompt, idx) => (
                    <PromptCard key={prompt.id} prompt={prompt} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
                  <p className="text-stone-500 text-sm font-medium">
                    No prompts match "{searchQuery}".
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MIMO */}
          {activeTab === 'mimo' && (
            <ComingSoon
              suiteName="Mimo / MiniMax"
              description="Prompts optimized for long context windows and distinct multi-character voices are in development."
              plannedPrompts={[
                {
                  name: 'Mimo Long-Context Anchor',
                  desc: 'Prevents repetitive lines and memory loss in 100k+ token roleplays.'
                },
                {
                  name: 'MiniMax Dialogue Engine',
                  desc: 'Natural conversational cadence across multiple characters.'
                }
              ]}
            />
          )}
        </main>

        {/* Clean Minimal Footer */}
        <footer className="border-t border-stone-200 bg-white py-6 mt-16 text-center text-xs text-stone-500">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Prompt Knight · Curated by Kars</span>
            <span>Free to use in SillyTavern & Janitor AI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
