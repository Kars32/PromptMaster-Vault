import React from 'react';

export default function ComingSoon({ suiteName, targetModel, overview, plannedDirectives }) {
  return (
    <div className="surface-card rounded-xl p-8 md:p-12 max-w-3xl mx-auto my-6 border border-stone-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-700 uppercase tracking-wider">
          Calibration in Progress
        </span>
        <span className="text-xs text-stone-400 font-mono">
          Target: {targetModel}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-950 mb-3">
        {suiteName} Directive Suite
      </h2>

      <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8 font-editorial italic text-base">
        {overview}
      </p>

      <div className="border-t border-stone-200/80 pt-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 mb-4">
          Directives in Benchmarking
        </h3>
        <div className="space-y-4">
          {plannedDirectives.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-stone-50 border border-stone-200/60 flex items-start gap-4">
              <span className="font-mono text-xs font-semibold text-stone-400 mt-0.5">
                0{idx + 1}
              </span>
              <div>
                <strong className="text-sm font-semibold text-stone-900 block mb-1">
                  {item.title}
                </strong>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
