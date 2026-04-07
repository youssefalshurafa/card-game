'use client';

import { ChallengePdfShell } from './challengeShell';
import { Field } from './utils';

function FooterIcon({ children }) {
 return <span className="inline-flex h-3.5 w-3.5 items-center justify-center text-[8px] font-bold text-[#857a79]">{children}</span>;
}

export default function EmailAlertCard({ card, fields, editable, onFieldChange }) {
 return (
  <ChallengePdfShell card={card}>
   <div className="flex h-full flex-col px-4 pb-7 pt-8">
    <div className="mt-9 flex flex-1 items-start justify-center">
     <div className="w-full rounded-2xl bg-[#f3ecdf] p-0.75 shadow-[0_10px_18px_rgba(0,0,0,0.14)]">
      <div className="overflow-hidden rounded-[14px] bg-[#f7f2e9]">
       <div className="flex items-center justify-between bg-[#0a6772] px-5 py-2.5 text-white">
        <span className="text-[11px] font-extrabold leading-none tracking-[0.01em] text-[#e9f2ef]">Inbox</span>
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#d0e5e1]">
         <span>−</span>
         <span>□</span>
         <span>×</span>
        </div>
       </div>

       <div className="px-5 pb-4 pt-3">
        <div className="space-y-1.5">
         <div className="rounded-full bg-[#e6ded0] px-4 py-1">
          <div className="flex items-start gap-1.5 text-[8px] leading-none text-[#746e68]">
           <span className="shrink-0 font-extrabold">Subject:</span>
           <Field
            fields={fields}
            fieldKey="subject"
            editable={editable}
            onFieldChange={onFieldChange}
            className="min-w-0 flex-1 text-[8px] font-bold text-[#66615b]"
           />
          </div>
         </div>

         <div className="w-[48%] rounded-full bg-[#e6ded0] px-4 py-1.5">
          <div className="flex items-start gap-1.5 text-[8px] leading-none text-[#746e68]">
           <span className="shrink-0 font-extrabold">From:</span>
           <div className="min-w-0 flex-1">
            <Field
             fields={fields}
             fieldKey="from_name"
             editable={editable}
             onFieldChange={onFieldChange}
             className="block text-[8px] font-bold text-[#66615b]"
             tag="p"
            />
            <Field
             fields={fields}
             fieldKey="from_email"
             editable={editable}
             onFieldChange={onFieldChange}
             className="mt-0.75 block text-[6px] font-semibold text-[#7b756f]"
             tag="p"
            />
           </div>
          </div>
         </div>
        </div>

        <div className="mt-3 rounded-t-sm rounded-b-[18px] bg-[#dfd6c8] px-4 pb-5 pt-3 text-[#5f5a55] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
         <Field
          fields={fields}
          fieldKey="body"
          editable={editable}
          onFieldChange={onFieldChange}
          className="whitespace-pre-line text-[6.5px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#5c5954]"
          tag="p"
         />

         <div className="mt-5 text-[6.5px] font-semibold leading-[1.35] text-[#5d5954]">
          <p>Regards,</p>
          <Field
           fields={fields}
           fieldKey="signature_name"
           editable={editable}
           onFieldChange={onFieldChange}
           className="block"
           tag="p"
          />
          <Field
           fields={fields}
           fieldKey="signature_title"
           editable={editable}
           onFieldChange={onFieldChange}
           className="block"
           tag="p"
          />
          <Field
           fields={fields}
           fieldKey="signature_email"
           editable={editable}
           onFieldChange={onFieldChange}
           className="block"
           tag="p"
          />
          <div className="flex gap-1">
           <span>Phone:</span>
           <Field
            fields={fields}
            fieldKey="signature_phone"
            editable={editable}
            onFieldChange={onFieldChange}
            className="block"
            tag="span"
           />
          </div>
         </div>
        </div>
       </div>

       <div className="flex items-center justify-between px-5 pb-4 pt-1 text-[#857a79]">
        <div className="flex items-center gap-2">
         <FooterIcon>A</FooterIcon>
         <FooterIcon>i</FooterIcon>
         <FooterIcon>◎</FooterIcon>
         <FooterIcon>◩</FooterIcon>
         <FooterIcon>≡</FooterIcon>
        </div>

        <div className="flex items-center gap-2">
         <div className="h-4 w-10 rounded-full bg-[#7b6a67]" />
         <div className="h-4 w-10 rounded-full bg-[#f1e6d6]" />
         <div className="h-4 w-10 rounded-full bg-[#f1e6d6]" />
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </ChallengePdfShell>
 );
}
