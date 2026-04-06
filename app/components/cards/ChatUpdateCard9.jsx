'use client';

import { ChallengeHeader, Field, getFieldJson } from './utils';

export default function ChatUpdateCard({ card, fields, editable, onFieldChange }) {
 const messages = getFieldJson(card, 'messages')?.items ?? [];

 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-950 text-white">
   <ChallengeHeader card={card} />

   {/* Chat app frame */}
   <div className="mx-3 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-b from-emerald-900 to-teal-950">
    {/* Chat header */}
    <div className="flex items-center gap-2 border-b border-white/10 bg-emerald-800 px-3 py-2">
     <div className="h-7 w-7 rounded-full bg-emerald-500/40 ring-1 ring-emerald-400/50" />
     <div>
      <Field
       fields={fields}
       fieldKey="contact_name"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-xs font-bold text-white"
      />
      <Field
       fields={fields}
       fieldKey="contact_phone"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-[9px] text-emerald-200/70"
       tag="p"
      />
     </div>
    </div>

    {/* Messages */}
    <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-3">
     {messages.map((msg, i) => (
      <div
       key={i}
       className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
      >
       <div
        className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-[10px] leading-relaxed ${
         msg.sender === 'me' ? 'rounded-br-sm bg-emerald-600 text-white' : 'rounded-bl-sm bg-white/15 text-emerald-50'
        }`}
       >
        {msg.text}
       </div>
      </div>
     ))}
    </div>

    {/* Input area */}
    <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-3 py-2">
     <div className="flex-1 rounded-full bg-white/10 px-3 py-1 text-[9px] text-white/40">Type a message...</div>
     <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600">
      <svg
       className="h-3 w-3 text-white"
       fill="currentColor"
       viewBox="0 0 24 24"
      >
       <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
     </div>
    </div>
   </div>

   <div className="h-2" />
  </div>
 );
}
