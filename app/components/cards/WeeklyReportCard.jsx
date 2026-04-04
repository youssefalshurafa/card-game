'use client';

import { ChallengePdfShell, challengeDisplayFont, challengeHandFont } from './challengeShell';
import { Field, ImageField, getFieldJson } from './utils';

export default function WeeklyReportCard({ card, fields, editable, onFieldChange }) {
 const bullets = getFieldJson(card, 'bullets')?.items ?? [];

 return (
  <ChallengePdfShell card={card}>
   <div className="flex flex-1 flex-col px-8 pb-7 pt-4">
    <div className="flex h-full flex-col border-[3px] border-[#171717] bg-white px-8 pb-6 pt-8">
     {/* Agency name + navy line + WEEKLY REPORT */}
     <div className="flex items-start gap-4">
      <div className="w-[36%] shrink-0">
       <Field
        fields={fields}
        fieldKey="agency"
        editable={editable}
        onFieldChange={onFieldChange}
        className={`${challengeDisplayFont.className} text-[18px] font-extrabold leading-[0.92] text-[#244c9d]`}
        tag="p"
       />
      </div>
      <div className="min-w-0 flex-1 pt-5">
       <div className="mb-3 w-full border-t-[7px] border-[#244c9d]" />
       <Field
        fields={fields}
        fieldKey="report_title"
        editable={editable}
        onFieldChange={onFieldChange}
        className="text-[12px] font-extrabold tracking-[0.01em] text-[#4b2d18]"
        tag="p"
       />
      </div>
     </div>

     {/* Map image */}
     <div className="mx-auto mt-5 aspect-[1.18/1] w-[74%] overflow-hidden border border-gray-300 bg-gray-100">
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
     <div className="mx-6 mt-5 rounded-[30px] bg-[#efefef] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
      <ul className="space-y-1.5">
       {bullets.map((bullet, i) => (
        <li
         key={i}
         className={`${challengeHandFont.className} flex items-start gap-2 text-[7.8px] leading-[1.12] text-[#34363b]`}
        >
         <span className="mt-px shrink-0 text-gray-500">.</span>
         <span>{bullet}</span>
        </li>
       ))}
      </ul>
     </div>

     {/* Blue double underline footer */}
     <div className="mt-auto px-3 pt-8 space-y-0.75">
      <div className="h-0.75 w-full bg-[#244c9d]" />
      <div className="h-0.75 w-full bg-[#244c9d]" />
     </div>
    </div>
   </div>
  </ChallengePdfShell>
 );
}
