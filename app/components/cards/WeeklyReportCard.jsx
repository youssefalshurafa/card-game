'use client';

import { ChallengeHeader, Field, ImageField, getFieldJson } from './utils';

export default function WeeklyReportCard({ card, fields, editable, onFieldChange }) {
 const bullets = getFieldJson(card, 'bullets')?.items ?? [];

 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border-[3px] border-slate-300 bg-white shadow-md">
   <ChallengeHeader card={card} />

   {/* Document body */}
   <div className="flex flex-1 flex-col px-4 py-3">
    {/* Agency name + navy line + WEEKLY REPORT */}
    <div className="flex items-start gap-2">
     {/* Left: agency name + WEEKLY REPORT below */}
     <div className="shrink-0">
      <Field
       fields={fields}
       fieldKey="agency"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-[14px] font-extrabold leading-tight text-[#1a237e]"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="report_title"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-[9px] font-extrabold tracking-widest text-gray-900"
       tag="p"
      />
     </div>
     {/* Navy line flush to the right, aligned near top */}
     <div className="mt-[7px] flex-1 border-t-2 border-[#1a237e]" />
    </div>

    {/* Map image */}
    <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded border border-gray-200 bg-gray-100">
     <ImageField
      fields={fields}
      fieldKey="map_image"
      editable={editable}
      onFieldChange={onFieldChange}
      className="h-full w-full"
      placeholder="Click to add map image"
     />
    </div>

    {/* Bullet points bubble */}
    <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
     <ul className="space-y-1.5">
      {bullets.map((bullet, i) => (
       <li
        key={i}
        className="flex items-start gap-2 text-[8.5px] leading-snug text-slate-800"
       >
        <span className="mt-px shrink-0 text-gray-500">-</span>
        <span>{bullet}</span>
       </li>
      ))}
     </ul>
    </div>

    {/* Blue double underline footer */}
    <div className="mt-auto pt-3 space-y-[3px]">
     <div className="h-[2px] w-full bg-[#1a237e]" />
     <div className="h-[2px] w-full bg-[#1a237e]" />
    </div>
   </div>
  </div>
 );
}
