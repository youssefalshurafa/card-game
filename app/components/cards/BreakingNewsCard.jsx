'use client';

import { ChallengeHeader, Field } from './utils';

export default function BreakingNewsCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a0a1a] via-[#0f172a] to-[#1a1a2e] text-white">
   <ChallengeHeader card={card} />

   {/* Channel bar */}
   <div className="flex items-center justify-between px-4 py-2">
    <div className="flex items-center gap-3">
     <span className="animate-pulse rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold">LIVE</span>
     <div className="flex items-center gap-1.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-black">24</div>
      <Field
       fields={fields}
       fieldKey="channel"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-xs font-semibold text-gray-300"
      />
     </div>
    </div>
    <Field
     fields={fields}
     fieldKey="time"
     editable={editable}
     onFieldChange={onFieldChange}
     className="font-mono text-xs text-gray-400"
    />
   </div>

   {/* BREAKING NEWS banner */}
   <div className="relative bg-gradient-to-r from-red-700 to-red-800 px-4 py-2.5">
    <div className="absolute inset-y-0 left-0 w-1.5 bg-white" />
    <p className="pl-2 text-xs font-extrabold tracking-[0.2em]">BREAKING</p>
    <Field
     fields={fields}
     fieldKey="headline"
     editable={editable}
     onFieldChange={onFieldChange}
     className="pl-2 text-base font-extrabold tracking-wider"
     tag="p"
    />
   </div>

   {/* Summary body */}
   <div className="flex flex-1 flex-col px-4 py-3">
    <Field
     fields={fields}
     fieldKey="label"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-[10px] font-semibold uppercase tracking-widest text-amber-400"
     tag="p"
    />
    <Field
     fields={fields}
     fieldKey="summary"
     editable={editable}
     onFieldChange={onFieldChange}
     className="mt-2 flex-1 text-xs leading-relaxed text-gray-200"
     tag="p"
    />
   </div>

   {/* News ticker */}
   <div className="flex items-center gap-2 bg-red-800/90 px-4 py-1.5">
    <span className="shrink-0 rounded bg-white px-1.5 py-0.5 text-[8px] font-bold text-red-800">BREAKING</span>
    <Field
     fields={fields}
     fieldKey="ticker"
     editable={editable}
     onFieldChange={onFieldChange}
     className="truncate text-[10px] text-gray-200"
     tag="p"
    />
   </div>
  </div>
 );
}
