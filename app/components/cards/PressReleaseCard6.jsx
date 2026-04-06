'use client';

import { Baloo_2, Patrick_Hand } from 'next/font/google';
import { ChallengePdfShell } from './challengeShell';
import { Field, ImageField } from './utils';

const baloo2 = Baloo_2({
 subsets: ['latin'],
 weight: ['700', '800'],
});

const patrickHand = Patrick_Hand({
 subsets: ['latin'],
 weight: '400',
});

export default function PressReleaseCard({ card, fields, editable, onFieldChange }) {
 return (
  <ChallengePdfShell card={card}>
   <div className="relative h-full px-6 pb-6 pt-3">
    <div className="flex h-full w-full flex-col border-[2.5px] border-[#3a3d44] bg-white px-5 pb-4 pt-5">
     {/* Issuer + subtitle */}
     <div className="mb-2.5 text-center">
      <Field
       fields={fields}
       fieldKey="issuer"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${baloo2.className} block text-[24px] font-extrabold leading-tight text-[#1a3a6e]`}
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="title"
       editable={editable}
       onFieldChange={onFieldChange}
       className="block pt-0.5 text-[7.5px] font-bold leading-none tracking-widest text-[#444] uppercase"
       tag="p"
      />
     </div>

     {/* Map image */}
     <div className="mx-auto mb-3 aspect-[1.22/1] w-[70%] overflow-hidden bg-[#e8e4d8]">
      <ImageField
       fields={fields}
       fieldKey="map_image"
       editable={editable}
       onFieldChange={onFieldChange}
       className="h-full w-full"
       imageClassName="object-contain bg-[#e8e4d8]"
       placeholder="Click to add map image"
      />
     </div>

     {/* Body text bubble */}
     <div className="rounded-[22px] bg-[#ededed] px-3.5 py-3">
      <Field
       fields={fields}
       fieldKey="body"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${patrickHand.className} text-[12px] leading-[1.15] text-[#1e2a3e] whitespace-pre-line`}
       tag="p"
      />
     </div>
    </div>
   </div>
  </ChallengePdfShell>
 );
}
