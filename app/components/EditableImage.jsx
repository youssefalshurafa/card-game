'use client';

import { useRef, useCallback } from 'react';

export default function EditableImage({ value, fieldKey, onSave, className, imageClassName, placeholder }) {
 const inputRef = useRef(null);

 function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.onload = () => resolve(reader.result);
   reader.onerror = () => reject(reader.error);
   reader.readAsDataURL(file);
  });
 }

 const handleClick = useCallback(() => {
  if (inputRef.current) {
   inputRef.current.click();
  }
 }, []);

 const handleChange = useCallback(
  async (e) => {
   const file = e.target.files?.[0];
   if (!file) return;

   try {
    const previewUrl = await readFileAsDataUrl(file);
    onSave?.(fieldKey, previewUrl);
   } catch {
    e.target.value = '';
    return;
   }

   const formData = new FormData();
   formData.append('file', file);

   try {
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (res.ok) {
     const data = await res.json();
     onSave?.(fieldKey, data.url);
    }
   } catch {}

   // Reset input so same file can be re-selected
   e.target.value = '';
  },
  [fieldKey, onSave],
 );

 const hasImage = value && value !== '' && !value.startsWith('{');

 return (
  <div
   className={`${className || ''} group relative cursor-pointer overflow-hidden`}
   onClick={handleClick}
   role="button"
   tabIndex={0}
   onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
     e.preventDefault();
     handleClick();
    }
   }}
  >
   {hasImage ? (
    <img
     src={value}
     alt=""
     className={`h-full w-full object-cover ${imageClassName || ''}`}
    />
   ) : (
    <div className="flex h-full w-full items-center justify-center bg-slate-700/50 text-xs text-slate-400">{placeholder || 'Click to add image'}</div>
   )}

   {/* Hover overlay */}
   <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
    <div className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">Change Image</div>
   </div>

   <input
    ref={inputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleChange}
   />
  </div>
 );
}
