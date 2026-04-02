'use client';

import { ChallengeHeader, Field, getFieldJson } from './utils';

export default function WeeklyReportCard({ card, fields, editable, onFieldChange }) {
 const bullets = getFieldJson(card, 'bullets')?.items ?? [];

 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-amber-50 text-slate-900">
   <ChallengeHeader card={card} />

   {/* Agency header */}
   <div className="border-b border-green-200 bg-white/80 px-5 py-3 text-center">
    <div className="mx-auto mb-1 h-8 w-8 rounded-full bg-green-700" />
    <Field
     fields={fields}
     fieldKey="agency"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-sm font-bold text-green-900"
     tag="p"
    />
   </div>

   {/* Report title */}
   <div className="border-b border-green-200 bg-green-800 px-5 py-2 text-center">
    <Field
     fields={fields}
     fieldKey="report_title"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-sm font-extrabold tracking-widest text-white"
     tag="p"
    />
   </div>

   {/* Bullet points */}
   <div className="flex-1 px-5 py-4">
    <ul className="space-y-2.5">
     {bullets.map((bullet, i) => (
      <li
       key={i}
       className="flex items-start gap-2 text-xs leading-relaxed text-slate-800"
      >
       <span className="mt-0.5 text-green-700">•</span>
       <span>{bullet}</span>
      </li>
     ))}
    </ul>
   </div>

   {/* Footer */}
   <div className="border-t border-green-200 bg-white/60 px-5 py-2 text-center">
    <p className="text-[9px] text-gray-500">National Agricultural Agency — Confidential</p>
   </div>
  </div>
 );
}
