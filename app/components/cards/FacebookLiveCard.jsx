'use client';

import { ChallengeHeader, Field, getFieldJson } from './utils';

export default function FacebookLiveCard({ card, fields, editable, onFieldChange }) {
 const comments = getFieldJson(card, 'comments')?.items ?? [];

 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-950 text-white">
   <ChallengeHeader card={card} />

   {/* Phone frame */}
   <div className="mx-3 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-black">
    {/* Status bar */}
    <div className="flex items-center justify-between bg-slate-900 px-3 py-1 text-[9px]">
     <span className="font-semibold text-red-500">RED</span>
     <span className="text-gray-400">10:01</span>
     <span className="text-gray-400">100%</span>
    </div>

    {/* Live video area */}
    <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 px-3 py-6">
     <div className="absolute left-3 top-2 flex items-center gap-1.5">
      <span className="animate-pulse rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-bold">LIVE</span>
      <Field
       fields={fields}
       fieldKey="viewer_count"
       editable={editable}
       onFieldChange={onFieldChange}
       className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-white"
      />
     </div>
     <div className="mt-3 flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-blue-500/40" />
      <div>
       <p className="text-[10px] font-semibold">Live Video</p>
       <p className="text-[8px] text-gray-300">Streaming now</p>
      </div>
     </div>
    </div>

    {/* Comments */}
    <div className="flex-1 space-y-1 bg-white px-3 py-2 text-black">
     {comments.map((c, i) => (
      <div
       key={i}
       className="flex items-start gap-1.5"
      >
       <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-gray-300" />
       <div>
        <span className="text-[9px] font-semibold">{c.name}</span>
        {c.text && <span className="ml-1 text-[9px] text-gray-600">{c.text}</span>}
       </div>
      </div>
     ))}
     <div className="mt-1 rounded-full border border-gray-300 px-2 py-1 text-[9px] text-gray-400">Comment ...</div>
    </div>
   </div>

   {/* Description area */}
   <div className="px-4 py-2">
    <p className="text-[9px] font-semibold text-blue-400">Facebook live Feeds</p>
    <Field
     fields={fields}
     fieldKey="summary"
     editable={editable}
     onFieldChange={onFieldChange}
     className="mt-1 text-[10px] leading-relaxed text-gray-300"
     tag="p"
    />
    <Field
     fields={fields}
     fieldKey="url"
     editable={editable}
     onFieldChange={onFieldChange}
     className="mt-1 text-[9px] text-blue-400 underline"
     tag="p"
    />
   </div>
  </div>
 );
}
