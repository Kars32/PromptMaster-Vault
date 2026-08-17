import React from 'react';
import { Clock, Hammer, ShieldCheck, Sparkles } from 'lucide-react';

export default function ComingSoon({ suiteName, description, plannedModules }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center mx-auto mb-5">
        <Hammer className="w-7 h-7" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700 mb-3">
        <Clock className="w-3.5 h-3.5" />
        In Active Development
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight mb-3">
        {suiteName} Master Directives
      </h2>

      <p className="text-sm md:text-base text-stone-600 mb-8 leading-relaxed">
        {description}
      </p>

      {/* Planned Modules Roadmap */}
      <div className="text-left bg-stone-50/80 rounded-xl p-5 border border-stone-200/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Planned Modules in Calibration
        </h4>
        <div className="space-y-2.5">
          {plannedModules.map((module, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-stone-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
              <span>
                <strong>{module.name}</strong>: {module.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
