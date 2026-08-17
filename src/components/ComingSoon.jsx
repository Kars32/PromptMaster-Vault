import React from 'react';
import { Clock, Hammer } from 'lucide-react';

export default function ComingSoon({ suiteName, description, plannedPrompts }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12 text-center max-w-xl mx-auto shadow-xs my-8">
      <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mx-auto mb-4">
        <Hammer className="w-6 h-6" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700 mb-3">
        <Clock className="w-3.5 h-3.5" />
        Coming Soon
      </div>

      <h2 className="text-2xl font-bold text-stone-900 mb-2">
        {suiteName} Prompts
      </h2>

      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        {description}
      </p>

      {plannedPrompts && plannedPrompts.length > 0 && (
        <div className="text-left bg-stone-50 rounded-xl p-4 border border-stone-200/80 text-xs text-stone-700 space-y-2">
          <strong className="text-stone-900 block font-semibold mb-1">In Development:</strong>
          {plannedPrompts.map((p, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
              <span>
                <strong>{p.name}</strong>: {p.desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
