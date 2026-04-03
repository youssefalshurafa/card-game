'use client';

import { ChallengeHeader, Field, ImageField, getFieldJson } from './utils';

const AVATAR_COLORS = ['bg-blue-400', 'bg-pink-400', 'bg-emerald-400', 'bg-amber-400', 'bg-purple-400'];

export default function FacebookLiveCard({ card, fields, editable, onFieldChange }) {
 const comments = getFieldJson(card, 'comments')?.items ?? [];

 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#7ab3a0] to-[#4e9080]">
   <ChallengeHeader card={card} />

   {/* Card body — green background visible around phone */}
   <div className="flex flex-1 flex-col items-center justify-between px-3 py-2">

    {/* ── Phone frame ── */}
    <div className="relative w-[54%] rounded-[22px] bg-white p-[5px] shadow-[0_10px_32px_rgba(0,0,0,0.55)]">

     {/* Top bezel — camera dot + speaker bar */}
     <div className="flex items-center justify-center gap-1 py-[5px]">
      <div className="h-[5px] w-[5px] rounded-full bg-gray-400" />
      <div className="h-[4px] w-[22px] rounded-full bg-gray-300" />
      <div className="h-[5px] w-[5px] rounded-full bg-gray-400" />
     </div>

     {/* Screen */}
     <div className="overflow-hidden rounded-[10px] bg-black">

      {/* Status bar — Facebook blue */}
      <div className="flex items-center justify-between bg-[#3b5998] px-2 py-[2px] text-[6px] text-white">
       <div className="flex items-center gap-0.5">
        <svg viewBox="0 0 16 10" className="h-[5px] w-[8px] fill-white">
         <rect x="0" y="6" width="2.5" height="4" /><rect x="3.5" y="4" width="2.5" height="6" />
         <rect x="7" y="2" width="2.5" height="8" /><rect x="10.5" y="0" width="2.5" height="10" />
        </svg>
        <span className="font-semibold">RED</span>
        <svg viewBox="0 0 20 14" className="h-[5px] w-[8px] fill-white">
         <path d="M10 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-4a5.5 5.5 0 0 1 3.9 1.61l-1.42 1.42a3.5 3.5 0 0 0-4.96 0L6.1 9.11A5.5 5.5 0 0 1 10 7.5zm0-4a9.5 9.5 0 0 1 6.72 2.78L15.3 7.7A7.5 7.5 0 0 0 4.7 7.7L3.28 6.28A9.5 9.5 0 0 1 10 3.5z" />
        </svg>
       </div>
       <span className="font-medium">10:01</span>
       <div className="flex items-center gap-0.5">
        <span>100%</span>
        <svg viewBox="0 0 22 11" className="h-[5px] w-[11px]">
         <rect x="0" y="0" width="19" height="11" rx="2" fill="none" stroke="white" strokeWidth="1.4" />
         <rect x="19.5" y="3" width="2" height="5" rx="1" fill="white" />
         <rect x="1.5" y="1.5" width="15.5" height="8" rx="1" fill="white" />
        </svg>
       </div>
      </div>

      {/* Browser bar — Facebook blue */}
      <div className="flex items-center gap-1 bg-[#3b5998] px-1.5 pb-[3px] pt-[2px]">
       <svg viewBox="0 0 24 24" className="h-[10px] w-[10px] shrink-0 fill-white">
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm6.5-2H19l-1.5-2h-11L5 5h.5A2.5 2.5 0 0 0 3 7.5v9A2.5 2.5 0 0 0 5.5 19h13a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 18.5 5z" />
       </svg>
       <div className="flex flex-1 items-center gap-0.5 overflow-hidden rounded-full bg-white/20 px-1.5 py-[1px]">
        <svg viewBox="0 0 24 24" className="h-[6px] w-[6px] shrink-0 fill-white/80">
         <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <span className="truncate text-[5.5px] text-white leading-none">{fields?.url ?? 'https://www.facebook.com/live'}</span>
       </div>
       <svg viewBox="0 0 36 36" className="h-[10px] w-[10px] shrink-0 fill-white">
        <path d="M18 2C9.16 2 2 8.71 2 17c0 4.5 1.9 8.55 4.97 11.43V33l4.87-2.68C13.16 30.74 15.52 31 18 31c8.84 0 16-6.71 16-15S26.84 2 18 2zm1.77 20.27-4.07-4.34-7.95 4.34 8.74-9.27 4.17 4.34 7.85-4.34-8.74 9.27z" />
       </svg>
      </div>

      {/* Live video area */}
      <div className="relative aspect-[9/14] w-full overflow-hidden bg-gray-900">
       <ImageField
        fields={fields}
        fieldKey="live_image"
        editable={editable}
        onFieldChange={onFieldChange}
        className="h-full w-full"
        placeholder="Click to add live stream photo"
       />

       {/* Bottom gradient */}
       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />

       {/* Broadcaster avatar + LIVE + viewer count — top left */}
       <div className="absolute left-1.5 top-1.5 flex items-center gap-1">
        <div className="h-5 w-5 rounded-full border border-white/60 bg-gray-600" />
        <div className="flex flex-col gap-px">
         <span className="text-[5px] font-semibold text-white leading-none drop-shadow">Live Video</span>
        </div>
       </div>
       <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
        <span className="animate-pulse rounded bg-red-600 px-1 py-[1px] text-[6px] font-black text-white leading-tight">LIVE</span>
        <div className="flex items-center gap-0.5 rounded bg-black/50 px-1 py-[1px]">
         <Field
          fields={fields}
          fieldKey="viewer_count"
          editable={editable}
          onFieldChange={onFieldChange}
          className="text-[6px] font-semibold text-white leading-tight"
         />
        </div>
       </div>

       {/* Reaction buttons — right edge */}
       <div className="absolute right-1 top-1/3 flex flex-col items-center gap-1.5">
        {['❤️', '😮', '😢', '👍'].map((emoji) => (
         <span key={emoji} className="text-[10px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{emoji}</span>
        ))}
       </div>

       {/* Comment overlays — bottom */}
       <div className="absolute inset-x-1.5 bottom-5 space-y-[3px]">
        {comments.slice(0, 3).map((c, i) => (
         <div key={i} className="flex items-center gap-1">
          <div className={`h-3 w-3 shrink-0 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`} />
          <div className="flex items-baseline gap-1 rounded-full bg-black/40 px-1.5 py-[1px]">
           <span className="text-[5.5px] font-semibold text-white leading-none">{c.name}</span>
           {c.text && <span className="text-[5.5px] text-gray-200 leading-none">{c.text}</span>}
          </div>
         </div>
        ))}
       </div>

       {/* Comment input bar */}
       <div className="absolute inset-x-1.5 bottom-1 flex items-center gap-1 rounded-full bg-white/20 px-1.5 py-[2px] backdrop-blur-sm">
        <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-gray-400" />
        <span className="text-[5.5px] text-white/70">Comment ...</span>
        <span className="ml-auto text-[8px] text-white/60">···</span>
       </div>
      </div>

     </div>{/* /screen */}

     {/* Bottom bezel — home button */}
     <div className="flex items-center justify-center py-[6px]">
      <div className="h-[14px] w-[14px] rounded-full border-[1.5px] border-gray-300" />
     </div>
    </div>{/* /phone frame */}

    {/* Description — below phone, inside card */}
    <div className="mt-2 w-full rounded-lg bg-white/90 px-3 py-2">
     <p className="text-[11px] font-bold text-[#1877f2]">Facebook live Feeds</p>
     <Field
      fields={fields}
      fieldKey="summary"
      editable={editable}
      onFieldChange={onFieldChange}
      className="mt-0.5 text-[9px] leading-relaxed text-gray-700"
      tag="p"
     />
    </div>

   </div>
  </div>
 );
}

