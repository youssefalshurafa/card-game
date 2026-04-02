'use client';

import { useRef, useCallback, useEffect } from 'react';

export default function EditableText({ value, fieldKey, onSave, className, tag: Tag = 'span' }) {
 const ref = useRef(null);
 const lastValue = useRef(value);

 useEffect(() => {
  if (ref.current) {
   ref.current.textContent = value || '';
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 useEffect(() => {
  if (ref.current && value !== lastValue.current) {
   ref.current.textContent = value || '';
   lastValue.current = value;
  }
 }, [value]);

 const handleBlur = useCallback(() => {
  const newValue = ref.current?.textContent ?? '';
  if (newValue !== lastValue.current) {
   lastValue.current = newValue;
   onSave?.(fieldKey, newValue);
  }
 }, [fieldKey, onSave]);

 return (
  <Tag
   ref={ref}
   className={`${className || ''} outline-none focus:ring-2 focus:ring-blue-400/50 rounded px-0.5 -mx-0.5 cursor-text`}
   contentEditable
   suppressContentEditableWarning
   onBlur={handleBlur}
  />
 );
}
