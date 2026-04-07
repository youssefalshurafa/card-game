'use client';

import { ChallengePdfShell, challengeDisplayFont } from './challengeShell';
import { Field, ImageField, getFieldJson } from './utils';

function getKeyData(fields, card) {
 const fieldValue = fields?.key_data;

 if (typeof fieldValue === 'string' && fieldValue.trim() !== '') {
  try {
   return JSON.parse(fieldValue)?.items ?? [];
  } catch {}
 }

 return getFieldJson(card, 'key_data')?.items ?? [];
}

export default function BulletinCard({ card, fields, editable, onFieldChange }) {
 const keyData = getKeyData(fields, card);

 return (
  <ChallengePdfShell card={card}>
   <div className="flex h-full flex-col px-6 pb-7 pt-4">
    <div className="flex h-full flex-col border-[3px] border-[#393d44] bg-white px-5 pb-5 pt-5 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
     <div className="text-center">
      <Field
       fields={fields}
       fieldKey="authority"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${challengeDisplayFont.className} block text-[18px] font-extrabold leading-none text-[#244c9d]`}
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="bulletin_title"
       editable={editable}
       onFieldChange={onFieldChange}
       className="block pt-3 text-[8px] font-extrabold leading-none tracking-[0.04em] text-[#493019] uppercase"
       tag="p"
      />
     </div>

     <div className="mx-auto mt-5 w-[46%] overflow-hidden border-[3px] border-[#51647f] bg-[#d8dde4]">
      <div className="aspect-[1/1.1] w-full">
       <ImageField
        fields={fields}
        fieldKey="map_image"
        editable={editable}
        onFieldChange={onFieldChange}
        className="h-full w-full"
        imageClassName="object-cover"
        placeholder="Click to add map image"
       />
      </div>
     </div>

     <div className="mt-5 rounded-[28px] bg-[#efefef] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
      <p className="text-[10px] font-extrabold leading-none text-[#6f6f73]">Summary:</p>
      <Field
       fields={fields}
       fieldKey="summary"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-1.5 whitespace-pre-line text-[10px] font-semibold leading-[1.35] text-[#6a6670]"
       tag="p"
      />

      {keyData.length > 0 ? (
       <div className="mt-3">
        <p className="text-[10px] font-extrabold leading-none text-[#6f6f73]">Key Data:</p>
        <ul className="mt-1.5 space-y-0.5 text-[10px] font-semibold leading-[1.3] text-[#6a6670]">
         {keyData.map((item, index) => (
          <li
           key={index}
           className="flex items-start gap-1"
          >
           <span className="mt-px text-[#6a6670]">•</span>
           <span>
            {item.label}: {item.value}
           </span>
          </li>
         ))}
        </ul>
       </div>
      ) : null}
     </div>
    </div>
   </div>
  </ChallengePdfShell>
 );
}
