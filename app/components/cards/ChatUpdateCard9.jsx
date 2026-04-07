'use client';

import EditableText from '../EditableText';
import { ChallengePdfShell } from './challengeShell';
import { Field, getFieldJson } from './utils';

function getMessages(fields, card) {
 const fieldValue = fields?.messages;

 if (typeof fieldValue === 'string' && fieldValue.trim() !== '') {
  try {
   return JSON.parse(fieldValue)?.items ?? [];
  } catch {}
 }

 return getFieldJson(card, 'messages')?.items ?? [];
}

function EditableMessage({ value, onSave, className }) {
 return (
  <EditableText
   value={value}
   fieldKey="message"
   onSave={(_, nextValue) => onSave(nextValue)}
   className={className}
   tag="p"
  />
 );
}

function MessageBubble({ msg, editable, onSave }) {
 const isMe = msg.sender === 'me';

 return (
  <div className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}>
   <div className="relative max-w-full">
    <div
     className={`rounded-xl px-3 py-2 text-[8.4px] font-semibold leading-[1.38] text-[#4f5b74] shadow-[0_1px_0_rgba(255,255,255,0.14)] ${isMe ? 'bg-[#7cd197]' : 'bg-[#eceef3]'}`}
    >
     {editable ? (
      <EditableMessage
       value={msg.text}
       onSave={onSave}
       className="whitespace-pre-wrap outline-none"
      />
     ) : (
      msg.text
     )}
    </div>
    <div
     className={`absolute top-2.75 h-4 w-3 ${isMe ? '-left-2' : '-right-2'}`}
     style={{
      backgroundColor: isMe ? '#7cd197' : '#eceef3',
      clipPath: isMe ? 'polygon(100% 0,100% 100%,0 42%)' : 'polygon(0 0,100% 42%,0 100%)',
     }}
    />
   </div>
  </div>
 );
}

function PhonePlaceholderBubbles() {
 return (
  <div className="space-y-2 px-2 pt-2">
   <div className="ml-3 h-8 rounded-md bg-[#74d198]" />
   <div className="mr-3 h-8 rounded-md bg-[#dfe3e9]" />
   <div className="ml-3 h-8 rounded-md bg-[#74d198]" />
   <div className="ml-3 h-10 rounded-md bg-[#74d198]" />
   <div className="mr-3 h-8 rounded-md bg-[#dfe3e9]" />
  </div>
 );
}

export default function ChatUpdateCard({ card, fields, editable, onFieldChange }) {
 const messages = getMessages(fields, card);

 const handleMessageChange = (index, nextText) => {
  const nextMessages = messages.map((msg, messageIndex) => (messageIndex === index ? { ...msg, text: nextText } : msg));

  onFieldChange?.('messages', JSON.stringify({ items: nextMessages }));
 };

 return (
  <ChallengePdfShell card={card}>
   <div className="flex h-full flex-col px-4 pb-6 pt-8">
    <div className="mt-9 flex flex-1 items-start gap-5 px-1">
     <div className="relative mt-16 w-[44%] shrink-0 rounded-3xl bg-[#232743] p-0.75 shadow-[0_8px_18px_rgba(15,23,42,0.3)]">
      <div className="overflow-hidden rounded-[21px] bg-[#c9f0c9]">
       <div className="relative flex items-center justify-between bg-[#68b482] px-3 pb-2 pt-3 text-white">
        <div className="absolute left-1/2 top-0 h-2 w-14 -translate-x-1/2 rounded-b-lg bg-[#1d203a]" />
        <div className="text-[12px] leading-none">‹</div>
        <div className="min-w-0 flex-1 px-2 leading-none">
         <Field
          fields={fields}
          fieldKey="contact_name"
          editable={editable}
          onFieldChange={onFieldChange}
          className="block text-[8px] font-extrabold text-white"
          tag="p"
         />
         <Field
          fields={fields}
          fieldKey="contact_phone"
          editable={editable}
          onFieldChange={onFieldChange}
          className="mt-1 block text-[5.2px] font-bold text-[#d4f1d8]"
          tag="p"
         />
        </div>
        <div className="text-[10px] leading-none">⚙</div>
       </div>

       <PhonePlaceholderBubbles />

       <div className="mt-2 flex items-center gap-2 bg-[#b2efbc] px-2 py-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#84d3a0] text-[14px] font-bold leading-none text-[#f0fff0]">+</div>
        <div className="flex-1 rounded-full bg-[#d8f7d4] px-3 py-1 text-[6px] text-[#8fb497]" />
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#84d3a0] text-[9px] text-[#f0fff0]">➤</div>
       </div>
      </div>
     </div>

     <div className="flex min-w-0 flex-1 flex-col gap-2 pt-8">
      {messages.map((msg, i) => (
       <MessageBubble
        key={i}
        msg={msg}
        editable={editable}
        onSave={(nextText) => handleMessageChange(i, nextText)}
       />
      ))}

      <div className="mt-auto flex justify-end pr-1">
       <div className="flex h-4 w-16 items-center justify-center gap-1 rounded-full bg-[#76cf93] text-[10px] leading-none text-[#eaf9ee]">
        <span>•</span>
        <span>•</span>
        <span>•</span>
       </div>
      </div>
     </div>
    </div>
   </div>
  </ChallengePdfShell>
 );
}
