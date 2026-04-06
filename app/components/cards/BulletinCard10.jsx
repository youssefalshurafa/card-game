'use client';

import { ChallengeHeader, Field, getFieldJson } from './utils';

export default function BulletinCard({ card, fields, editable, onFieldChange }) {
 const keyData = getFieldJson(card, 'key_data')?.items ?? [];

 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-b from-slate-50 to-rose-50 text-slate-900">
   <ChallengeHeader card={card} />

   {/* Authority header */}
   <div className="border-b border-rose-200 bg-white/80 px-5 py-3 text-center">
    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-800">
     <span className="text-[8px] font-bold text-white">PH</span>
    </div>
    <Field
     fields={fields}
     fieldKey="authority"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-sm font-bold text-rose-900"
     tag="p"
    />
   </div>

   {/* Bulletin title */}
   <div className="border-b border-rose-200 bg-rose-800 px-5 py-2 text-center">
    <Field
     fields={fields}
     fieldKey="bulletin_title"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-xs font-extrabold tracking-widest text-white"
     tag="p"
    />
   </div>

   {/* Summary */}
   <div className="px-5 py-3">
    <p className="text-[9px] font-semibold uppercase tracking-wider text-rose-700">Summary:</p>
    <Field
     fields={fields}
     fieldKey="summary"
     editable={editable}
     onFieldChange={onFieldChange}
     className="mt-1 text-[11px] leading-relaxed text-slate-700"
     tag="p"
    />
   </div>

   {/* Key data */}
   {keyData.length > 0 && (
    <div className="mx-5 rounded-lg border border-rose-200 bg-white/60 px-3 py-2">
     <p className="text-[9px] font-semibold uppercase tracking-wider text-rose-700">Key Data:</p>
     <ul className="mt-1 space-y-1">
      {keyData.map((item, i) => (
       <li
        key={i}
        className="flex items-start gap-2 text-[10px]"
       >
        <span className="text-rose-600">•</span>
        <span>
         <span className="font-semibold">{item.label}:</span> {item.value}
        </span>
       </li>
      ))}
     </ul>
    </div>
   )}

   {/* Footer */}
   <div className="mt-auto border-t border-rose-200 bg-white/60 px-5 py-2 text-center">
    <Field
     fields={fields}
     fieldKey="footer"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-[9px] font-semibold text-gray-500"
     tag="p"
    />
   </div>
  </div>
 );
}
