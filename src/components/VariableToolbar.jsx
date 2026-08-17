import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function VariableToolbar({ charName, setCharName, userName, setUserName }) {
  const isCustomized = charName !== '{{char}}' || userName !== '{{user}}';

  return (
    <div className="surface-card rounded-xl p-4 md:p-5 mb-8 border border-stone-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block font-mono">
            Variable Pre-Processor
          </span>
          <p className="text-xs text-stone-500 mt-0.5">
            Inject custom entity names into directives prior to copying.
          </p>
        </div>
        {isCustomized && (
          <button
            onClick={() => {
              setCharName('{{char}}');
              setUserName('{{user}}');
            }}
            className="text-xs font-mono text-stone-500 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1 font-mono">
            <span>Character Entity</span>
            <span className="text-stone-400">{"{{char}}"}</span>
          </div>
          <input
            type="text"
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
            placeholder="{{char}}"
            className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none transition-all"
          />
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-stone-600 mb-1 font-mono">
            <span>User Persona</span>
            <span className="text-stone-400">{"{{user}}"}</span>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="{{user}}"
            className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
