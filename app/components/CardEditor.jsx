'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import CardRenderer from './cards/CardRenderer';
import { buildFieldsFromCard } from './cards/utils';

export default function CardEditor({ card }) {
 const [fields, setFields] = useState(() => buildFieldsFromCard(card));
 const [dirty, setDirty] = useState(false);
 const [saving, setSaving] = useState(false);
 const [lastSaved, setLastSaved] = useState(null);

 const handleFieldChange = useCallback((key, value) => {
  setFields((prev) => ({ ...prev, [key]: value }));
  setDirty(true);
 }, []);

 const handleSave = useCallback(async () => {
  setSaving(true);
  try {
   const res = await fetch(`/api/cards/${card.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
   });
   if (res.ok) {
    setDirty(false);
    setLastSaved(new Date().toLocaleTimeString());
   }
  } finally {
   setSaving(false);
  }
 }, [card.id, fields]);

 const editableCard = {
  ...card,
  faces: card.faces.map((face) => ({
   ...face,
   elements: face.elements.map((el) => ({
    ...el,
    value: fields[el.key] !== undefined ? { ...el.value, text: fields[el.key] } : el.value,
   })),
  })),
 };

 return (
  <div className="flex min-h-screen flex-col bg-slate-900">
   {/* Toolbar */}
   <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-6 py-3 backdrop-blur">
    <Link
     href="/"
     className="text-sm text-slate-400 transition-colors hover:text-white"
    >
     ← Back to Cards
    </Link>
    <div className="text-center">
     <p className="text-sm font-semibold text-white">{card.name}</p>
     <p className="text-[10px] text-slate-500">{card.metadata?.cardType} — Click any text to edit</p>
    </div>
    <div className="flex items-center gap-3">
     {lastSaved && !dirty && <span className="text-[10px] text-green-400">Saved at {lastSaved}</span>}
     {dirty && <span className="text-xs text-amber-400">Unsaved changes</span>}
     <button
      onClick={handleSave}
      disabled={!dirty || saving}
      className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-40"
     >
      {saving ? 'Saving...' : 'Save'}
     </button>
    </div>
   </div>

   {/* Card canvas */}
   <div className="flex flex-1 items-center justify-center p-8">
    <div className="aspect-[5/7] w-full max-w-md">
     <CardRenderer
      card={editableCard}
      fields={fields}
      editable
      onFieldChange={handleFieldChange}
     />
    </div>
   </div>
  </div>
 );
}
