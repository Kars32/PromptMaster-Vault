import React from 'react';
import { User, Sparkles, RefreshCw } from 'lucide-react';

export default function VariableInjector({ charName, setCharName, userName, setUserName }) {
  const handleReset = () => {
    setCharName('{{char}}');
    setUserName('{{user}}');
  };

  const isModified = charName !== '{{char}}' || userName !== '{{user}}';

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 p-4 md:p-5 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-stone-900">
            Live Variable Injector
          </h3>
          <span className="text-xs text-stone-500 font-normal">
            (Automatically replaces placeholders across all prompts before copying)
          </span>
        </div>
        {isModified && (
          <button
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-semibold cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset to Default
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1.5">
            Character Name <code className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded text-[11px] font-mono">{"{{char}}"}</code>
          </label>
          <input
            type="text"
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
            placeholder="e.g. Seraphina"
            className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/70 text-stone-900 focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1.5">
            User Persona <code className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded text-[11px] font-mono">{"{{user}}"}</code>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Detective Miller"
            className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/70 text-stone-900 focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/10 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
