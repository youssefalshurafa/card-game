'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CardRenderer from './cards/CardRenderer';
import { buildFieldsFromCard } from './cards/utils';

export default function CardEditor({ card, savedSets = [] }) {
 const router = useRouter();
 const [fields, setFields] = useState(() => buildFieldsFromCard(card));
 const [dirty, setDirty] = useState(false);
 const [saving, setSaving] = useState(false);
 const [savingCopy, setSavingCopy] = useState(false);
 const [lastSaved, setLastSaved] = useState(null);
 const [copyError, setCopyError] = useState('');
 const [targetSetSlug, setTargetSetSlug] = useState(() => savedSets.find((set) => set.id === card.deckId)?.slug ?? savedSets[0]?.slug ?? '');

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

 const handleSaveCopy = useCallback(async () => {
  setSavingCopy(true);
  setCopyError('');

  try {
   if (!targetSetSlug) {
    throw new Error('Create a saved set first, then choose it from the list.');
   }

   const res = await fetch(`/api/cards/${card.id}/save-copy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     targetDeckSlug: targetSetSlug,
     fields,
    }),
   });

   if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || 'Unable to save card copy.');
   }

   const savedCard = await res.json();
   router.push(`/cards/${savedCard.id}`);
   router.refresh();
  } catch (error) {
   setCopyError(error instanceof Error ? error.message : 'Unable to save card copy.');
  } finally {
   setSavingCopy(false);
  }
 }, [card.id, fields, router, targetSetSlug]);

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
     {copyError ? <p className="mt-1 text-[10px] text-rose-400">{copyError}</p> : null}
    </div>
    <div className="flex items-center gap-3">
     {lastSaved && !dirty && <span className="text-[10px] text-green-400">Saved at {lastSaved}</span>}
     {dirty && <span className="text-xs text-amber-400">Unsaved changes</span>}
     <select
      value={targetSetSlug}
      onChange={(event) => setTargetSetSlug(event.target.value)}
      disabled={savedSets.length === 0 || savingCopy}
      className="rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-sm text-white outline-none disabled:opacity-40"
     >
      {savedSets.length === 0 ? <option value="">No saved sets</option> : null}
      {savedSets.map((set) => (
       <option
        key={set.id}
        value={set.slug}
       >
        {set.name}
       </option>
      ))}
     </select>
     <button
      onClick={handleSaveCopy}
      disabled={savingCopy || targetSetSlug === ''}
      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 disabled:opacity-40"
     >
      {savingCopy ? 'Saving Copy...' : 'Save to Selected Set'}
     </button>
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
    <div className="aspect-5/7 w-full max-w-md">
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
