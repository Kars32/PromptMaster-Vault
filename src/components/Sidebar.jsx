import React from 'react';
import { Compass, Sparkles, Layers, Terminal, Cpu, Waves, Globe, Infinity, BookOpen, X, PanelLeftClose, PanelLeft } from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  isMobileOpen,
  setIsMobileOpen
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'gemini', label: 'Gemini', icon: Sparkles, count: 3 },
    { id: 'claude', label: 'Claude', icon: Layers, count: 1 },
    { id: 'deepseek', label: 'DeepSeek', icon: Terminal, count: 1 },
    { id: 'nvidia', label: 'Nvidia', icon: Cpu, count: 1 },
    { id: 'poolside', label: 'Poolside', icon: Waves, count: 1 },
    { id: 'tencent', label: 'Tencent', icon: Globe, count: 1 },
    { id: 'meta', label: 'Meta', icon: Infinity, count: 1 },
    { id: 'mimo', label: 'Mimo', icon: BookOpen, badge: 'Soon' },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-stone-200/80 flex flex-col transition-all duration-300 ease-in-out ${
          /* Desktop behavior: w-64 when open, w-0 when closed */
          isOpen ? 'md:w-64' : 'md:w-0 md:border-none md:overflow-hidden'
        } ${
          /* Mobile behavior: slide in from left when isMobileOpen */
          isMobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-5 border-b border-stone-100 flex items-center justify-between shrink-0">
          <div>
            <span className="font-extrabold text-stone-950 text-base tracking-tight block font-sans">
              Prompt Knight
            </span>
            <span className="text-[11px] text-stone-600 font-medium font-sans">
              Roleplay Prompts
            </span>
          </div>

          {/* Close / Retract button */}
          <div className="flex items-center">
            {/* Desktop Retract */}
            <button
              onClick={() => setIsOpen(false)}
              className="hidden md:flex p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Hide sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
            {/* Mobile Close */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-stone-600 uppercase tracking-wider font-mono">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-600'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.count}
                  </span>
                )}

                {item.badge && (
                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-100 text-xs text-stone-600 shrink-0">
          <p className="font-medium text-[11px]">Free & Open Source</p>
          <a
            href="https://github.com/Kars32/Prompt-Knight"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-stone-700 hover:text-black font-semibold underline underline-offset-2 mt-0.5 inline-block"
          >
            GitHub Repository ↗
          </a>
        </div>
      </aside>
    </>
  );
}
