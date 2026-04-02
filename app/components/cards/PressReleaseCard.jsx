'use client';

import { ChallengeHeader, Field } from './utils';

export default function PressReleaseCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-b from-slate-50 to-purple-50 text-slate-900">
   <ChallengeHeader card={card} />

   {/* Issuer header */}
   <div className="border-b border-purple-200 bg-white/80 px-5 py-3 text-center">
    <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-800">
     <span className="text-[10px] font-bold text-white">GOV</span>
    </div>
    <Field
     fields={fields}
     fieldKey="issuer"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-sm font-bold text-purple-900"
     tag="p"
    />
   </div>

   {/* Title banner */}
   <div className="border-b border-purple-200 bg-purple-800 px-5 py-2 text-center">
    <Field
     fields={fields}
     fieldKey="title"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-xs font-extrabold tracking-widest text-white"
     tag="p"
    />
   </div>

   {/* Body text */}
   <div className="flex-1 px-5 py-4">
    <Field
     fields={fields}
     fieldKey="body"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-xs leading-relaxed text-slate-700"
     tag="p"
    />
   </div>

   {/* Footer */}
   <div className="border-t border-purple-200 bg-white/60 px-5 py-2 text-center">
    <p className="text-[9px] text-gray-500">Official Press Release — Public Record</p>
   </div>
  </div>
 );
}
