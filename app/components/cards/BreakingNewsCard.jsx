'use client';

import { ChallengeHeader, Field } from './utils';
import EditableImage from '../EditableImage';

export default function BreakingNewsCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-linear-to-b from-gray-200 via-gray-100 to-gray-50">
   {/* ---- Challenge header (teal banner with orange accents) ---- */}
   <ChallengeHeader card={card} />

   {/* ---- Card body ---- */}
   <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-2">
    {/* TV Set — SVG frame with content inside screen */}
    <div className="relative w-[94%]">
     {/* TV frame image */}
     <img
      src="/tv-frame.svg"
      alt=""
      className="relative z-10 block w-full pointer-events-none"
     />

     {/* Screen content sits above the frame because the SVG includes an opaque black screen fill. */}
     <div
      className="absolute z-20 overflow-hidden rounded-[10px] bg-black"
      style={{ top: '15.7%', left: '11.65%', width: '62.85%', height: '63.35%' }}
     >
      {/* News image — editable */}
      <div className="relative h-full w-full">
       {editable ? (
        <EditableImage
         value={fields.news_image}
         fieldKey="news_image"
         onSave={onFieldChange}
         className="h-full w-full"
         placeholder="Click to add news photo"
        />
       ) : fields.news_image && fields.news_image !== '' ? (
        <img
         src={fields.news_image}
         alt=""
         className="h-full w-full object-cover"
        />
       ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-600 to-gray-800 text-[8px] text-gray-400">News Photo</div>
       )}

       {/* LIVE badge */}
       <div className="absolute left-2.5 top-2 z-20 flex flex-col items-start drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <span className="ml-6 rounded-xs bg-black px-1.5 py-px text-[7px] font-black leading-none tracking-widest text-white">LIVE</span>

        <div className="mt-1 rounded-xs bg-[#ae1308] px-2.5 py-1 shadow-[0_4px_10px_rgba(0,0,0,0.24)]">
         <p className="text-[12px] font-black leading-none tracking-[0.05em] text-white">BREAKING</p>
        </div>

        <div className="ml-6 mt-1 rounded-xs bg-white px-2 py-0.5 shadow-[0_3px_8px_rgba(0,0,0,0.16)]">
         <p className="text-[9px] font-black leading-none tracking-[0.05em] text-[#111111]">NEWS</p>
        </div>
       </div>

       {/* Bottom news bar */}
       <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col">
        {/* Row 1 — white info strip */}
        <div className="flex items-center gap-1 bg-white/95 px-1.5 py-0.75 shadow-[0_-1px_6px_rgba(0,0,0,0.12)]">
         <div className="inline-flex shrink-0 rounded-xs bg-[#d11111] px-1.5 py-px">
          <Field
           fields={fields}
           fieldKey="label"
           editable={editable}
           onFieldChange={onFieldChange}
           className="text-[5px] font-black leading-none text-white"
          />
         </div>
         <Field
          fields={fields}
          fieldKey="ticker"
          editable={editable}
          onFieldChange={onFieldChange}
          className="min-w-0 flex-1 truncate text-[5px] font-medium leading-none text-[#222222]"
          tag="p"
         />
        </div>

        {/* Row 2 — black headline bar */}
        <div className="bg-[#111111] py-0.75 text-center">
         <Field
          fields={fields}
          fieldKey="headline"
          editable={editable}
          onFieldChange={onFieldChange}
          className="text-center text-[6px] font-black leading-none tracking-[0.01em] text-white"
          tag="p"
         />
        </div>

        {/* Row 3 — ticker strip */}
        <div className="flex items-stretch bg-white text-[#161616]">
         <div className="flex w-8 shrink-0 items-center px-1.5">
          <Field
           fields={fields}
           fieldKey="time"
           editable={editable}
           onFieldChange={onFieldChange}
           className="text-[5px] font-bold leading-none text-[#1f1f1f]"
          />
         </div>

         <div className="flex min-w-0 flex-1 items-center overflow-hidden bg-[#c51212] px-1.5 py-0.5">
          <Field
           fields={fields}
           fieldKey="ticker"
           editable={editable}
           onFieldChange={onFieldChange}
           className="w-full truncate text-[4px] font-semibold leading-none text-white"
           tag="p"
          />
         </div>

         <div className="flex w-9 shrink-0 flex-col overflow-hidden bg-[#d11111]">
          <div className="flex flex-1 items-center justify-center border-b border-white/25 text-[8px] font-black leading-none text-white">24</div>
          <div className="flex items-center justify-center bg-white px-1 py-px text-[4px] font-black leading-none text-[#d11111]">Ethiopia</div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>

    {/* ---- Summary bubble below TV ---- */}
    <div className="mt-2 w-full px-2 pb-2">
     <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
      <Field
       fields={fields}
       fieldKey="label"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-[10px] font-bold text-gray-900"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="summary"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-1 text-[9px] leading-relaxed text-gray-700"
       tag="p"
      />
     </div>
    </div>
   </div>
  </div>
 );
}
