'use client';

import { ChallengeHeader, Field } from './utils';

export default function EmailAlertCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-950 text-white">
   <ChallengeHeader card={card} />

   {/* Email client frame */}
   <div className="mx-3 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-white text-slate-900">
    {/* Email toolbar */}
    <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-3 py-1.5">
     <div className="flex gap-1">
      <div className="h-2 w-2 rounded-full bg-red-400" />
      <div className="h-2 w-2 rounded-full bg-yellow-400" />
      <div className="h-2 w-2 rounded-full bg-green-400" />
     </div>
     <span className="text-[9px] font-semibold text-gray-500">Inbox</span>
    </div>

    {/* Subject and from */}
    <div className="border-b border-gray-200 px-3 py-2">
     <div className="flex items-start gap-1">
      <span className="shrink-0 text-[9px] font-semibold text-gray-500">Subject:</span>
      <Field
       fields={fields}
       fieldKey="subject"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-xs font-bold text-slate-900"
      />
     </div>
     <div className="mt-1 flex items-center gap-1">
      <span className="shrink-0 text-[9px] font-semibold text-gray-500">From:</span>
      <Field
       fields={fields}
       fieldKey="from_name"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-[10px] font-semibold text-slate-800"
      />
     </div>
     <div className="ml-8">
      <Field
       fields={fields}
       fieldKey="from_email"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-[9px] text-blue-600"
      />
     </div>
    </div>

    {/* Email body */}
    <div className="flex-1 px-3 py-3">
     <Field
      fields={fields}
      fieldKey="body"
      editable={editable}
      onFieldChange={onFieldChange}
      className="whitespace-pre-line text-[10px] leading-relaxed text-slate-700"
      tag="p"
     />
    </div>

    {/* Signature */}
    <div className="border-t border-gray-200 bg-gray-50 px-3 py-2">
     <p className="text-[9px] text-gray-400">—</p>
     <Field
      fields={fields}
      fieldKey="signature_name"
      editable={editable}
      onFieldChange={onFieldChange}
      className="text-[9px] font-semibold text-gray-700"
      tag="p"
     />
     <Field
      fields={fields}
      fieldKey="signature_title"
      editable={editable}
      onFieldChange={onFieldChange}
      className="text-[9px] text-gray-500"
      tag="p"
     />
     <div className="mt-0.5 flex gap-2 text-[8px] text-gray-400">
      <Field
       fields={fields}
       fieldKey="signature_email"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-blue-500"
      />
      <Field
       fields={fields}
       fieldKey="signature_phone"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-gray-400"
      />
     </div>
    </div>
   </div>

   <div className="h-2" />
  </div>
 );
}
