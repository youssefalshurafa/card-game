'use client';

import { ChallengeHeader, Field } from './utils';

export default function SocialPostCard({ card, fields, editable, onFieldChange }) {
 return (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-950 text-white">
   <ChallengeHeader card={card} />

   {/* Phone frame */}
   <div className="mx-3 mt-2 flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-black">
    {/* Status bar */}
    <div className="flex items-center justify-between bg-slate-900 px-3 py-1 text-[9px]">
     <span className="font-semibold text-red-500">RED</span>
     <span className="text-gray-400">10:01</span>
     <span className="text-gray-400">100%</span>
    </div>

    {/* Post content */}
    <div className="flex-1 bg-white px-3 py-2 text-black">
     {/* Author */}
     <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
      <div>
       <Field
        fields={fields}
        fieldKey="author"
        editable={editable}
        onFieldChange={onFieldChange}
        className="text-xs font-bold text-black"
       />
       <Field
        fields={fields}
        fieldKey="time_ago"
        editable={editable}
        onFieldChange={onFieldChange}
        className="text-[9px] text-gray-500"
        tag="p"
       />
      </div>
     </div>

     {/* Post text */}
     <Field
      fields={fields}
      fieldKey="post_text"
      editable={editable}
      onFieldChange={onFieldChange}
      className="mt-2 text-[11px] leading-relaxed text-gray-900"
      tag="p"
     />

     {/* Reactions */}
     <div className="mt-3 border-t border-gray-200 pt-2">
      <div className="flex items-center gap-1">
       <span className="text-[10px]">👍❤️</span>
       <Field
        fields={fields}
        fieldKey="reactions"
        editable={editable}
        onFieldChange={onFieldChange}
        className="text-[9px] text-gray-500"
       />
      </div>
      <Field
       fields={fields}
       fieldKey="comment_count"
       editable={editable}
       onFieldChange={onFieldChange}
       className="text-right text-[9px] text-gray-500"
       tag="p"
      />
     </div>

     {/* Action buttons */}
     <div className="mt-1 flex justify-around border-t border-gray-200 pt-2 text-[9px] font-semibold text-gray-500">
      <button className="flex items-center gap-1">👍 Like</button>
      <button className="flex items-center gap-1">💬 Comment</button>
      <button className="flex items-center gap-1">↗ Share</button>
     </div>
    </div>
   </div>

   {/* URL */}
   <div className="px-4 py-2">
    <Field
     fields={fields}
     fieldKey="url"
     editable={editable}
     onFieldChange={onFieldChange}
     className="text-[9px] text-blue-400 underline"
     tag="p"
    />
   </div>
  </div>
 );
}
