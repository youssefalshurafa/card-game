'use client';

import { ChallengeHeader, Field } from './utils';
import EditableImage from '../EditableImage';

export default function BreakingNewsCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50">
   {/* ---- Challenge header (teal banner with orange accents) ---- */}
   <ChallengeHeader card={card} />

   {/* ---- Card body ---- */}
   <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-1">
    {/* TV Set */}
    <div className="relative w-[92%]">
     {/* Antennas */}
     <div className="relative mx-auto h-6 w-20">
      <div className="absolute bottom-0 left-1/2 h-6 w-0.5 origin-bottom -translate-x-4 -rotate-[30deg] bg-gradient-to-t from-gray-500 to-gray-400 rounded-full" />
      <div className="absolute bottom-0 left-1/2 h-6 w-0.5 origin-bottom translate-x-3 rotate-[30deg] bg-gradient-to-t from-gray-500 to-gray-400 rounded-full" />
     </div>

     {/* TV body */}
     <div className="relative rounded-xl bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400 p-1.5 shadow-lg">
      <div className="flex gap-1.5">
       {/* Screen area */}
       <div className="flex-1 overflow-hidden rounded-lg border-[3px] border-amber-700/80 bg-black">
        {/* News image — editable */}
        <div className="relative aspect-[4/3]">
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
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 text-[8px] text-gray-400">News Photo</div>
         )}

         {/* LIVE badge */}
         <div className="absolute left-1.5 top-1.5">
          <span className="rounded-sm bg-red-600 px-1 py-[1px] text-[6px] font-bold text-white">LIVE</span>
         </div>

         {/* BREAKING NEWS overlay */}
         <div className="absolute left-0 right-0 top-3.5 bg-red-700/90 px-1.5 py-0.5">
          <p className="text-[6px] font-extrabold tracking-wider text-white">BREAKING</p>
          <p className="text-[8px] font-extrabold text-white">NEWS</p>
         </div>

         {/* Bottom news bar */}
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-1.5 pb-1 pt-3">
          <div className="flex items-end justify-between">
           <div>
            <div className="rounded-sm bg-red-700 px-1 py-[1px]">
             <Field
              fields={fields}
              fieldKey="label"
              editable={editable}
              onFieldChange={onFieldChange}
              className="text-[5px] font-bold text-white"
             />
            </div>
            <Field
             fields={fields}
             fieldKey="ticker"
             editable={editable}
             onFieldChange={onFieldChange}
             className="mt-0.5 line-clamp-1 text-[4.5px] text-amber-300"
             tag="p"
            />
            <Field
             fields={fields}
             fieldKey="headline"
             editable={editable}
             onFieldChange={onFieldChange}
             className="text-[7px] font-bold text-white"
             tag="p"
            />
           </div>
           <div className="flex items-center gap-1">
            <Field
             fields={fields}
             fieldKey="time"
             editable={editable}
             onFieldChange={onFieldChange}
             className="text-[5px] text-gray-300"
            />
            <div className="flex items-center gap-0.5">
             <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#e37222]">
              <span className="text-[3.5px] font-bold text-white">24</span>
             </div>
             <span className="text-[3.5px] font-semibold text-[#e37222]">Ethiopia</span>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>

       {/* TV knobs panel */}
       <div className="flex w-5 flex-col items-center justify-center gap-1.5 rounded-r-md">
        <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner ring-1 ring-gray-500/50" />
        <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner ring-1 ring-gray-500/50" />
        <div className="h-2 w-2 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-inner" />
       </div>
      </div>

      {/* TV base/stand accent */}
      <div className="mx-auto mt-1 h-0.5 w-3/4 rounded-full bg-gray-500/40" />
     </div>
    </div>

    {/* ---- Summary section below TV ---- */}
    <div className="mt-auto w-full px-2 pt-3">
     <div className="border-t border-gray-200 pt-2">
      <Field
       fields={fields}
       fieldKey="label"
       editable={false}
       onFieldChange={onFieldChange}
       className="text-[9px] font-bold text-gray-900"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="summary"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-1 text-[7px] leading-relaxed text-gray-700"
       tag="p"
      />
     </div>
    </div>
   </div>
  </div>
 );
}
