'use client';

import { Baloo_2, Patrick_Hand } from 'next/font/google';
import { Field, ImageField, getDifficulty } from './utils';

const baloo2 = Baloo_2({
 subsets: ['latin'],
 weight: ['700', '800'],
});

const patrickHand = Patrick_Hand({
 subsets: ['latin'],
 weight: '400',
});

function HeaderStars({ level }) {
 return (
  <div className="flex items-center gap-1 text-[22px] leading-none text-[#ffd24a] [text-shadow:0_1px_0_rgba(0,0,0,0.18)]">
   {Array.from({ length: level }).map((_, index) => (
    <span key={index}>★</span>
   ))}
  </div>
 );
}

export default function PressReleaseCard({ card, fields, editable, onFieldChange }) {
 const difficulty = getDifficulty(card);

 return (
  <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] border-4 border-[#0e7aa4] bg-[#d7d8dc] text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.28)]">
   <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -left-10 top-20 h-80 w-24 rotate-30 bg-white/20" />
    <div className="absolute left-16 top-0 h-full w-px bg-white/15" />
    <div className="absolute left-1/2 top-8 h-[85%] w-24 -translate-x-1/2 rotate-30 bg-white/18" />
    <div className="absolute right-12 top-14 h-24 w-24 rounded-full bg-[#f5d8d8]/28" />
    <div className="absolute right-4 top-52 h-14 w-14 rounded-full bg-[#f1c3cb]/22" />
    <div className="absolute left-4 top-28 h-56 w-56 rounded-full border border-[#bad6bf]/18" />
   </div>

   <div className="relative px-3 pt-3">
    <div className="relative overflow-hidden rounded-tl-[14px] rounded-tr-[10px] rounded-br-lg rounded-bl-[54px] bg-[#09a2a6] px-5 pb-3 pt-2 shadow-[inset_0_-3px_0_rgba(255,255,255,0.08)]">
     <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_60%)]" />
     <div className="relative flex items-start justify-between gap-3">
      <div className="pt-2 text-white">
       <p className={`${baloo2.className} text-[37px] font-extrabold leading-none tracking-[0.01em] [text-shadow:0_2px_0_rgba(255,255,255,0.14)]`}>
        {card.metadata?.challengeLabel ?? ''}
       </p>
      </div>
      <div className="flex flex-col items-end gap-1">
       <HeaderStars level={difficulty} />
       <span className={`${baloo2.className} text-[27px] font-extrabold leading-none text-white`}>{card.metadata?.challengeNumber ?? ''}</span>
      </div>
     </div>
    </div>
   </div>

   <div className="relative flex flex-1 px-8 pb-7 pt-3">
    <div className="flex w-full flex-1 flex-col border-[3px] border-[#33363c] bg-white px-5 pb-5 pt-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
     <div className="mb-3 text-center">
      <Field
       fields={fields}
       fieldKey="issuer"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${baloo2.className} block text-[18px] font-extrabold leading-none text-[#244c9d]`}
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="title"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${baloo2.className} block pt-1 text-[8px] font-extrabold leading-none tracking-[0.08em] text-[#3b2a16] uppercase`}
       tag="p"
      />
     </div>

     <div className="mx-auto mb-4 aspect-[1.7/1] w-[88%] overflow-hidden bg-[#ece8dd] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
      <ImageField
       fields={fields}
       fieldKey="map_image"
       editable={editable}
       onFieldChange={onFieldChange}
       className="h-full w-full"
       placeholder="Click to add map image"
      />
     </div>

     <div className="mx-1 rounded-3xl bg-[#efefef] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]">
      <Field
       fields={fields}
       fieldKey="body"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${patrickHand.className} text-[7.4px] leading-[1.05] text-[#24314a] whitespace-pre-line`}
       tag="p"
      />
     </div>
    </div>
   </div>
  </div>
 );
}
