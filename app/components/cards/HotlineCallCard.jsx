'use client';

import { ChallengeHeader, Field } from './utils';

export default function HotlineCallCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-950 text-white">
   <ChallengeHeader card={card} />

   {/* Phone call screen */}
   <div className="mx-3 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-b from-green-900 to-emerald-950">
    {/* Caller info */}
    <div className="flex flex-col items-center px-4 pt-5">
     <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600/40 ring-2 ring-green-500/50">
      <svg
       className="h-7 w-7 text-green-300"
       fill="currentColor"
       viewBox="0 0 24 24"
      >
       <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
      </svg>
     </div>
     <Field
      fields={fields}
      fieldKey="caller_name"
      editable={editable}
      onFieldChange={onFieldChange}
      className="mt-2 text-lg font-bold text-white"
      tag="p"
     />
     <Field
      fields={fields}
      fieldKey="caller_status"
      editable={editable}
      onFieldChange={onFieldChange}
      className="text-xs text-green-300"
      tag="p"
     />
     <Field
      fields={fields}
      fieldKey="phone"
      editable={editable}
      onFieldChange={onFieldChange}
      className="mt-0.5 font-mono text-xs text-green-200/70"
      tag="p"
     />
    </div>

    {/* Caller details */}
    <div className="mx-4 mt-3 rounded-lg bg-black/30 px-3 py-2 text-center">
     <Field
      fields={fields}
      fieldKey="caller_title"
      editable={editable}
      onFieldChange={onFieldChange}
      className="text-[10px] font-semibold text-green-200"
      tag="p"
     />
     <Field
      fields={fields}
      fieldKey="caller_location"
      editable={editable}
      onFieldChange={onFieldChange}
      className="text-[10px] text-green-300/70"
      tag="p"
     />
    </div>

    {/* Transcript */}
    <div className="mx-4 my-3 flex-1 rounded-lg bg-white/10 p-3">
     <p className="mb-1 text-[8px] font-semibold uppercase tracking-widest text-green-400">Transcript</p>
     <Field
      fields={fields}
      fieldKey="transcript"
      editable={editable}
      onFieldChange={onFieldChange}
      className="text-[10px] italic leading-relaxed text-green-100"
      tag="p"
     />
    </div>

    {/* Call controls */}
    <div className="flex items-center justify-center gap-5 pb-4">
     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
      <svg
       className="h-5 w-5 rotate-135 text-white"
       fill="currentColor"
       viewBox="0 0 24 24"
      >
       <path d="M6.6 10.8c1.4 2.9 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.5 2.4.7 3.6.7.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.7 3.6.1.4 0 .7-.2 1l-2.4 2.2z" />
      </svg>
     </div>
    </div>
   </div>

   {/* Agency branding */}
   <div className="flex items-center justify-between px-4 py-2">
    <Field
     fields={fields}
     fieldKey="agency"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-[10px] font-semibold text-orange-400"
    />
    <div className="text-[9px] text-gray-500">
     Agent:{' '}
     <Field
      fields={fields}
      fieldKey="agent_name"
      editable={editable}
      onFieldChange={onFieldChange}
      className="font-semibold text-gray-300"
     />
    </div>
   </div>
  </div>
 );
}
