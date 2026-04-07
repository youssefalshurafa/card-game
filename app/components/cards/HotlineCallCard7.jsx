'use client';

import { ChallengePdfShell, challengeHandFont } from './challengeShell';
import { Field, ImageField } from './utils';

const AVATAR_PRESETS = [
 { label: 'Black man', src: '/avatars/blackman1.png' },
 { label: 'Blonde woman', src: '/avatars/blondewoman.png' },
 { label: 'Hijab woman', src: '/avatars/hijab1.png' },
 { label: 'White man 1', src: '/avatars/whiteman1.png' },
 { label: 'White man 2', src: '/avatars/whiteman2.png' },
];

const DEFAULT_AVATAR = AVATAR_PRESETS[0].src;

function CallerBubble({ fields, editable, onFieldChange }) {
 return (
  <div className="relative">
   <div
    className="border-2 bg-white px-3 py-2 shadow-[0_2px_0_rgba(0,0,0,0.06)]"
    style={{ width: 162, borderRadius: 24, borderColor: '#aeb2b7' }}
   >
    <div className="flex items-start gap-2">
     <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#8b8f94] bg-[#f0f2f4] text-[#6d7278]">
      <svg
       viewBox="0 0 24 24"
       className="h-5 w-5"
       fill="currentColor"
      >
       <path d="M7 2h7a2 2 0 0 1 2 2v3h1a2 2 0 0 1 2 2v8h1v2h-3v-2h0v-1H7v1h0v2H4v-2h1V5a3 3 0 0 1 2-3zm0 2a1 1 0 0 0-1 1v7h10V4H7zm10 5H9v5h8V9zm-8 9h8v-2H9v2z" />
      </svg>
     </div>
     <div className="min-w-0 flex-1 leading-none text-[#5d646c]">
      <Field
       fields={fields}
       fieldKey="caller_name"
       editable={editable}
       onFieldChange={onFieldChange}
       className="block text-[12px] font-extrabold text-[#5f6670]"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="caller_status"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-1 block text-[6.4px] font-semibold text-[#8b9096]"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="phone"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-0.5 block text-[6px] font-semibold text-[#858b93]"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="caller_title"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-1 block text-[7.3px] font-bold text-[#717780]"
       tag="p"
      />
      <Field
       fields={fields}
       fieldKey="caller_location"
       editable={editable}
       onFieldChange={onFieldChange}
       className="mt-0.5 block text-[7px] font-bold text-[#747a82]"
       tag="p"
      />
     </div>
    </div>
   </div>
   <div
    className="absolute bg-white"
    style={{
     left: 26,
     bottom: -12,
     height: 18,
     width: 18,
     clipPath: 'polygon(0 0, 100% 0, 38% 100%)',
     borderLeft: '2px solid #aeb2b7',
     borderBottom: '2px solid #aeb2b7',
     transform: 'skewX(-10deg)',
    }}
   />
  </div>
 );
}

function AvatarPresetPicker({ currentValue, onFieldChange }) {
 return (
  <div
   className="absolute z-30 flex flex-col gap-1 rounded-[18px] bg-white/90 px-1.5 py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.18)] backdrop-blur"
   style={{ left: -52, top: 44 }}
  >
   {AVATAR_PRESETS.map((preset) => {
    const isActive = currentValue === preset.src;

    return (
     <button
      key={preset.src}
      type="button"
      onClick={() => onFieldChange?.('avatar_image', preset.src)}
      className={`overflow-hidden rounded-full border-2 transition-all ${isActive ? 'scale-105 border-[#d22050]' : 'border-white/70 hover:border-slate-300'}`}
      title={preset.label}
     >
      <img
       src={preset.src}
       alt={preset.label}
       className="h-8 w-8 object-cover"
      />
     </button>
    );
   })}
  </div>
 );
}

function AgentAvatar({ fields, editable, onFieldChange }) {
 const avatarSrc = fields?.avatar_image || DEFAULT_AVATAR;

 return (
  <div
   className="relative mx-auto"
   style={{ height: 300, width: 235 }}
  >
   <div
    className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
    style={{ top: 18, height: 220, width: 170 }}
   >
    {editable ? (
     <ImageField
      fields={{ ...fields, avatar_image: avatarSrc }}
      fieldKey="avatar_image"
      editable={editable}
      onFieldChange={onFieldChange}
      className="h-full w-full"
      imageClassName="object-contain object-center"
      placeholder="Click to add avatar"
     />
    ) : (
     <img
      src={avatarSrc}
      alt="Hotline operator avatar"
      className="h-full w-full object-contain object-center"
     />
    )}
   </div>

   {editable ? (
    <AvatarPresetPicker
     currentValue={avatarSrc}
     onFieldChange={onFieldChange}
    />
   ) : null}

   {/* <div
    className="absolute flex flex-col items-center justify-center border bg-white text-center shadow-[0_1px_0_rgba(0,0,0,0.08)]"
    style={{ right: 46, bottom: 38, height: 36, width: 24, borderRadius: 4, borderColor: '#91969c' }}
   >
    <Field
     fields={fields}
     fieldKey="agency"
     editable={editable}
     onFieldChange={onFieldChange}
     className="px-0.5 text-[4.4px] font-black uppercase leading-[1.05] text-[#20242a]"
     tag="p"
    />
    <Field
     fields={fields}
     fieldKey="agent_name"
     editable={editable}
     onFieldChange={onFieldChange}
     className="mt-0.5 px-0.5 text-[5px] font-black leading-none text-[#d22050]"
     tag="p"
    />
   </div> */}
  </div>
 );
}

export default function HotlineCallCard({ card, fields, editable, onFieldChange }) {
 return (
  <ChallengePdfShell card={card}>
   <div className="relative flex h-full flex-col px-6 pb-5 pt-3">
    <div className="relative flex-1">
     <div
      className="absolute z-20"
      style={{ right: 6, top: 6 }}
     >
      <CallerBubble
       fields={fields}
       editable={editable}
       onFieldChange={onFieldChange}
      />
     </div>

     <div style={{ paddingTop: 66 }}>
      <AgentAvatar
       fields={fields}
       editable={editable}
       onFieldChange={onFieldChange}
      />
     </div>

     <div
      className="absolute inset-x-0 bg-[#d0d2d8] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      style={{ bottom: 8, borderRadius: 22 }}
     >
      <Field
       fields={fields}
       fieldKey="transcript"
       editable={editable}
       onFieldChange={onFieldChange}
       className={`${challengeHandFont.className} text-[16px] leading-[1.2] text-[#4d5b74] whitespace-pre-line`}
       tag="p"
      />
     </div>
    </div>
   </div>
  </ChallengePdfShell>
 );
}
