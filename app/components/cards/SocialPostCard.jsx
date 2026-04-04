'use client';

import { ChallengePdfShell } from './challengeShell';
import { Field, ImageField } from './utils';

export default function SocialPostCard({ card, fields, editable, onFieldChange }) {
 return (
  <ChallengePdfShell card={card}>
   <div className="flex flex-1 flex-col items-center px-5 pb-4 pt-2">
    <div className="flex w-[76%] flex-col overflow-hidden bg-white shadow-[0_18px_36px_rgba(0,0,0,0.32)]">
     {/* Status bar */}
     <div className="flex items-center justify-between bg-[#3b5998] px-3 py-0.75 text-[8px] text-white">
      <div className="flex items-center gap-1">
       <svg
        viewBox="0 0 16 10"
        className="h-1.75 w-2.5 fill-white"
       >
        <rect
         x="0"
         y="6"
         width="2.5"
         height="4"
        />
        <rect
         x="3.5"
         y="4"
         width="2.5"
         height="6"
        />
        <rect
         x="7"
         y="2"
         width="2.5"
         height="8"
        />
        <rect
         x="10.5"
         y="0"
         width="2.5"
         height="10"
        />
       </svg>
       <span className="font-semibold">RED</span>
       <svg
        viewBox="0 0 20 14"
        className="h-1.75 w-2.5 fill-white"
       >
        <path d="M10 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-4a5.5 5.5 0 0 1 3.9 1.61l-1.42 1.42a3.5 3.5 0 0 0-4.96 0L6.1 9.11A5.5 5.5 0 0 1 10 7.5zm0-4a9.5 9.5 0 0 1 6.72 2.78L15.3 7.7A7.5 7.5 0 0 0 4.7 7.7L3.28 6.28A9.5 9.5 0 0 1 10 3.5z" />
       </svg>
      </div>
      <span className="font-medium">10:01</span>
      <div className="flex items-center gap-1">
       <span>100%</span>
       <svg
        viewBox="0 0 22 11"
        className="h-1.75 w-3.25"
       >
        <rect
         x="0"
         y="0"
         width="19"
         height="11"
         rx="2"
         fill="none"
         stroke="white"
         strokeWidth="1.4"
        />
        <rect
         x="19.5"
         y="3"
         width="2"
         height="5"
         rx="1"
         fill="white"
        />
        <rect
         x="1.5"
         y="1.5"
         width="15.5"
         height="8"
         rx="1"
         fill="white"
        />
       </svg>
      </div>
     </div>

     {/* Browser bar */}
     <div className="flex items-center gap-2 bg-[#3b5998] px-3 pb-1 pt-0.5">
      <svg
       viewBox="0 0 24 24"
       className="h-3.5 w-3.5 shrink-0 fill-white"
      >
       <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm6.5-2H19l-1.5-2h-11L5 5h.5A2.5 2.5 0 0 0 3 7.5v9A2.5 2.5 0 0 0 5.5 19h13a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 18.5 5z" />
      </svg>
      <div className="flex flex-1 items-center gap-1 overflow-hidden rounded-full bg-white/20 px-2.5 py-0.5">
       <svg
        viewBox="0 0 24 24"
        className="h-2 w-2 shrink-0 fill-white/80"
       >
        <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
       </svg>
       <span className="truncate text-[7.5px] text-white leading-none">{fields?.url ?? 'https://www.facebook.com/post'}</span>
      </div>
      <svg
       viewBox="0 0 36 36"
       className="h-3.5 w-3.5 shrink-0 fill-white"
      >
       <path d="M18 2C9.16 2 2 8.71 2 17c0 4.5 1.9 8.55 4.97 11.43V33l4.87-2.68C13.16 30.74 15.52 31 18 31c8.84 0 16-6.71 16-15S26.84 2 18 2zm1.77 20.27-4.07-4.34-7.95 4.34 8.74-9.27 4.17 4.34 7.85-4.34-8.74 9.27z" />
      </svg>
     </div>

     {/* Post content */}
     <div className="flex flex-1 flex-col bg-white">
      {/* Author row */}
      <div className="flex items-center justify-between px-3 pb-1.5 pt-2">
       <div className="flex items-center gap-2">
        <div className="h-8 w-8 shrink-0 rounded-full bg-gray-300" />
        <div>
         <Field
          fields={fields}
          fieldKey="author"
          editable={editable}
          onFieldChange={onFieldChange}
          className="block text-[10px] font-bold leading-tight text-black"
         />
         <div className="flex items-center gap-0.5">
          <Field
           fields={fields}
           fieldKey="time_ago"
           editable={editable}
           onFieldChange={onFieldChange}
           className="text-[8px] text-gray-500 leading-none"
          />
          <span className="text-[8px] text-gray-400">🌐</span>
         </div>
        </div>
       </div>
       <span className="text-[14px] font-bold text-gray-400 leading-none">···</span>
      </div>

      {/* Post text */}
      <Field
       fields={fields}
       fieldKey="post_text"
       editable={editable}
       onFieldChange={onFieldChange}
       className="px-3 pb-2 text-[9px] leading-[1.75] text-gray-900"
       tag="p"
      />

      {/* Post image */}
      <div className="aspect-4/3 w-full overflow-hidden bg-gray-200">
       <ImageField
        fields={fields}
        fieldKey="post_image"
        editable={editable}
        onFieldChange={onFieldChange}
        className="h-full w-full"
        placeholder="Click to add post photo"
       />
      </div>

      {/* Reactions count row */}
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-1.5">
       <div className="flex items-center gap-1">
        <span className="text-[12px]">👍❤️😮</span>
        <Field
         fields={fields}
         fieldKey="reactions"
         editable={editable}
         onFieldChange={onFieldChange}
         className="text-[8px] text-gray-500 leading-none"
        />
       </div>
       <Field
        fields={fields}
        fieldKey="comment_count"
        editable={editable}
        onFieldChange={onFieldChange}
        className="text-[8px] text-gray-500 leading-none"
       />
      </div>

      {/* Action buttons */}
      <div className="flex items-center divide-x divide-gray-200">
       <button className="flex flex-1 items-center justify-center gap-1 py-2">
        <svg
         viewBox="0 0 24 24"
         className="h-3 w-3 fill-gray-500"
        >
         <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
        </svg>
        <span className="text-[9px] font-semibold text-gray-500">Like</span>
       </button>
       <button className="flex flex-1 items-center justify-center gap-1 py-2">
        <svg
         viewBox="0 0 24 24"
         className="h-3 w-3 fill-gray-500"
        >
         <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span className="text-[9px] font-semibold text-gray-500">Comment</span>
       </button>
      </div>
     </div>
     {/* /post content */}
    </div>
   </div>
  </ChallengePdfShell>
 );
}
