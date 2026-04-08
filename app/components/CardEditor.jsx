'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CardRenderer from './cards/CardRenderer';
import { buildFieldsFromCard } from './cards/utils';

export default function CardEditor({ card, savedSets = [] }) {
 const router = useRouter();
 const [fields, setFields] = useState(() => buildFieldsFromCard(card));
 const [difficulty, setDifficulty] = useState(card.metadata?.difficulty ?? 1);
 const [savingCopy, setSavingCopy] = useState(false);
 const [deleting, setDeleting] = useState(false);
 const [copyError, setCopyError] = useState('');
 const [targetSetSlug, setTargetSetSlug] = useState(() => savedSets.find((set) => set.id === card.deckId)?.slug ?? savedSets[0]?.slug ?? '');

 const handleFieldChange = useCallback((key, value) => {
  setFields((prev) => ({ ...prev, [key]: value }));
 }, []);

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
     metadata: { difficulty },
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
 }, [card.id, difficulty, fields, router, targetSetSlug]);

 const handleDelete = useCallback(async () => {
  const confirmed = window.confirm(`Delete "${card.name}" from its set? This cannot be undone.`);

  if (!confirmed) {
   return;
  }

  setDeleting(true);
  setCopyError('');

  try {
   const res = await fetch(`/api/cards/${card.id}`, {
    method: 'DELETE',
   });

   if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || 'Unable to delete card.');
   }

   router.push('/');
   router.refresh();
  } catch (error) {
   setCopyError(error instanceof Error ? error.message : 'Unable to delete card.');
  } finally {
   setDeleting(false);
  }
 }, [card.id, card.name, router]);

 const editableCard = {
  ...card,
  metadata: { ...card.metadata, difficulty },
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
     <div className="mt-1 flex items-center justify-center gap-1">
      <span className="text-[10px] text-slate-500">Difficulty:</span>
      {[1, 2, 3, 4].map((n) => (
       <button
        key={n}
        type="button"
        onClick={() => setDifficulty(n)}
        className={`text-sm transition-opacity ${n <= difficulty ? 'opacity-100' : 'opacity-20'} hover:opacity-80`}
       >
        ⭐
       </button>
      ))}
     </div>
     {copyError ? <p className="mt-1 text-[10px] text-rose-400">{copyError}</p> : null}
    </div>
    <div className="flex items-center gap-3">
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
      disabled={savingCopy || deleting || targetSetSlug === ''}
      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 disabled:opacity-40"
     >
      {savingCopy ? 'Saving Copy...' : 'Save to Selected Set'}
     </button>
     <button
      onClick={handleDelete}
      disabled={savingCopy || deleting}
      className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm font-medium text-rose-300 transition-colors hover:bg-rose-500/20 disabled:opacity-40"
     >
      {deleting ? 'Deleting...' : 'Delete Card'}
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
