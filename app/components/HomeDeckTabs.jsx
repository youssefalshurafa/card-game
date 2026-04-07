'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardGallery from './CardGallery';

function sortSavedSets(decks) {
 return [...decks].sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name));
}

export default function HomeDeckTabs({ projectSlug, defaultDeck, savedSets }) {
 const router = useRouter();
 const [activeTab, setActiveTab] = useState('default');
 const [localSavedSets, setLocalSavedSets] = useState(() => sortSavedSets(savedSets));
 const [activeSavedSetSlug, setActiveSavedSetSlug] = useState(savedSets[0]?.slug ?? null);
 const [newSetName, setNewSetName] = useState('');
 const [isCreating, setIsCreating] = useState(false);
 const [createError, setCreateError] = useState('');
 const [renamingId, setRenamingId] = useState(null);
 const [renameValue, setRenameValue] = useState('');
 const [isRenaming, setIsRenaming] = useState(false);
 const [isDeletingId, setIsDeletingId] = useState(null);

 const orderedSavedSets = useMemo(() => sortSavedSets(localSavedSets), [localSavedSets]);
 const activeSavedSet = orderedSavedSets.find((deck) => deck.slug === activeSavedSetSlug) ?? orderedSavedSets[0] ?? null;
 const activeCards = activeTab === 'default' ? (defaultDeck?.cards ?? []) : (activeSavedSet?.cards ?? []);

 async function handleCreateSet(event) {
  event.preventDefault();
  setCreateError('');
  setIsCreating(true);

  try {
   const res = await fetch(`/api/projects/${projectSlug}/saved-sets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newSetName }),
   });

   const data = await res.json().catch(() => null);

   if (!res.ok) {
    throw new Error(data?.error || 'Unable to create saved set.');
   }

   setLocalSavedSets((prev) => sortSavedSets([...prev, data]));
   setActiveTab('saved');
   setActiveSavedSetSlug(data.slug);
   setNewSetName('');
   router.refresh();
  } catch (error) {
   setCreateError(error instanceof Error ? error.message : 'Unable to create saved set.');
  } finally {
   setIsCreating(false);
  }
 }

 function startRename(deck) {
  setRenamingId(deck.id);
  setRenameValue(deck.name);
 }

 async function handleRename(event, deck) {
  event.preventDefault();
  setIsRenaming(true);

  try {
   const res = await fetch(`/api/projects/${projectSlug}/saved-sets/${deck.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: renameValue }),
   });

   const data = await res.json().catch(() => null);

   if (!res.ok) {
    throw new Error(data?.error || 'Unable to rename saved set.');
   }

   setLocalSavedSets((prev) => prev.map((s) => (s.id === deck.id ? { ...s, name: data.name } : s)));
   setRenamingId(null);
   router.refresh();
  } catch (error) {
   setCreateError(error instanceof Error ? error.message : 'Unable to rename saved set.');
  } finally {
   setIsRenaming(false);
  }
 }

 async function handleDelete(deck) {
  if (!window.confirm(`Delete "${deck.name}"? This will also delete all cards saved in this set.`)) {
   return;
  }

  setIsDeletingId(deck.id);

  try {
   const res = await fetch(`/api/projects/${projectSlug}/saved-sets/${deck.id}`, { method: 'DELETE' });

   if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || 'Unable to delete saved set.');
   }

   setLocalSavedSets((prev) => prev.filter((s) => s.id !== deck.id));

   if (activeSavedSetSlug === deck.slug) {
    const remaining = orderedSavedSets.filter((s) => s.slug !== deck.slug);
    setActiveSavedSetSlug(remaining[0]?.slug ?? null);
   }

   router.refresh();
  } catch (error) {
   setCreateError(error instanceof Error ? error.message : 'Unable to delete saved set.');
  } finally {
   setIsDeletingId(null);
  }
 }

 return (
  <div>
   <div className="border-b border-white/10">
    <div className="mx-auto flex max-w-7xl gap-2 px-6 pt-4">
     <button
      type="button"
      onClick={() => setActiveTab('default')}
      className={`rounded-t-2xl border border-b-0 px-5 py-3 text-sm font-semibold transition-colors ${
       activeTab === 'default' ? 'border-white/15 bg-slate-900 text-white' : 'border-transparent bg-slate-950/60 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
      }`}
     >
      Default Set
     </button>
     <button
      type="button"
      onClick={() => setActiveTab('saved')}
      className={`rounded-t-2xl border border-b-0 px-5 py-3 text-sm font-semibold transition-colors ${
       activeTab === 'saved' ? 'border-white/15 bg-slate-900 text-white' : 'border-transparent bg-slate-950/60 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
      }`}
     >
      My Saved Sets
     </button>
    </div>
   </div>

   <div className="mx-auto max-w-7xl px-6 py-8">
    {activeTab === 'default' ? (
     <>
      <div className="mb-6 flex items-end justify-between gap-4">
       <div>
        <h2 className="text-xl font-semibold text-white">Default Set</h2>
        <p className="mt-1 text-sm text-slate-400">{defaultDeck?.description}</p>
       </div>
       <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
        {activeCards.length} {activeCards.length === 1 ? 'card' : 'cards'}
       </span>
      </div>

      {activeCards.length > 0 ? (
       <CardGallery cards={activeCards} />
      ) : (
       <div className="rounded-3xl border border-dashed border-white/15 bg-slate-950/40 px-8 py-14 text-center">
        <h3 className="text-lg font-semibold text-white">No cards in the default set</h3>
        <p className="mt-2 text-sm text-slate-400">This set is empty right now.</p>
       </div>
      )}
     </>
    ) : (
     <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
       <div>
        <h2 className="text-xl font-semibold text-white">My Saved Sets</h2>
        <p className="mt-1 text-sm text-slate-400">Create named sets and save edited cards into any one you choose.</p>
       </div>
       <form
        onSubmit={handleCreateSet}
        className="flex flex-wrap items-center gap-2"
       >
        <input
         type="text"
         value={newSetName}
         onChange={(event) => setNewSetName(event.target.value)}
         placeholder="New set name"
         className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
        />
        <button
         type="submit"
         disabled={isCreating || newSetName.trim() === ''}
         className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-500 disabled:opacity-40"
        >
         {isCreating ? 'Creating...' : 'Create a New Set'}
        </button>
       </form>
      </div>

      {createError ? <p className="mb-4 text-sm text-rose-400">{createError}</p> : null}

      {orderedSavedSets.length > 0 ? (
       <>
        <div className="mb-6 flex flex-wrap gap-2">
         {orderedSavedSets.map((deck) => (
          <div
           key={deck.id}
           className={`flex items-center gap-1 rounded-full border text-sm font-medium transition-colors ${
            deck.slug === activeSavedSet?.slug ? 'border-teal-400 bg-teal-500/15 text-teal-200' : 'border-white/10 bg-white/5 text-slate-300'
           }`}
          >
           {renamingId === deck.id ? (
            <form
             onSubmit={(e) => handleRename(e, deck)}
             className="flex items-center gap-1 px-2 py-1"
            >
             <input
              autoFocus
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="w-36 rounded border border-white/20 bg-slate-900 px-2 py-0.5 text-sm text-white outline-none focus:border-teal-400"
             />
             <button
              type="submit"
              disabled={isRenaming || renameValue.trim() === ''}
              className="rounded px-2 py-0.5 text-xs text-teal-300 hover:text-teal-100 disabled:opacity-40"
             >
              {isRenaming ? '…' : 'Save'}
             </button>
             <button
              type="button"
              onClick={() => setRenamingId(null)}
              className="rounded px-1 py-0.5 text-xs text-slate-400 hover:text-slate-200"
             >
              Cancel
             </button>
            </form>
           ) : (
            <>
             <button
              type="button"
              onClick={() => setActiveSavedSetSlug(deck.slug)}
              className="pl-4 pr-2 py-2"
             >
              {deck.name}
             </button>
             <button
              type="button"
              title="Rename set"
              onClick={() => startRename(deck)}
              className="rounded-full p-1 text-slate-400 hover:text-slate-200"
             >
              <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16"
               fill="currentColor"
               className="h-3.5 w-3.5"
              >
               <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L2.317 11.21a1.75 1.75 0 0 0-.455.84l-.538 2.703a.75.75 0 0 0 .887.887l2.703-.538a1.75 1.75 0 0 0 .84-.455l8.697-8.696a1.75 1.75 0 0 0 0-2.474Z" />
              </svg>
             </button>
             <button
              type="button"
              title="Delete set"
              onClick={() => handleDelete(deck)}
              disabled={isDeletingId === deck.id}
              className="mr-1 rounded-full p-1 text-slate-400 hover:text-rose-400 disabled:opacity-40"
             >
              <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16"
               fill="currentColor"
               className="h-3.5 w-3.5"
              >
               <path
                fillRule="evenodd"
                d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                clipRule="evenodd"
               />
              </svg>
             </button>
            </>
           )}
          </div>
         ))}
        </div>

        {activeSavedSet ? (
         <div className="mb-6 flex items-end justify-between gap-4">
          <div>
           <h3 className="text-lg font-semibold text-white">{activeSavedSet.name}</h3>
           <p className="mt-1 text-sm text-slate-400">{activeSavedSet.description}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
           {activeSavedSet.cards.length} {activeSavedSet.cards.length === 1 ? 'card' : 'cards'}
          </span>
         </div>
        ) : null}

        {activeCards.length > 0 ? (
         <CardGallery cards={activeCards} />
        ) : (
         <div className="rounded-3xl border border-dashed border-white/15 bg-slate-950/40 px-8 py-14 text-center">
          <h3 className="text-lg font-semibold text-white">This saved set is empty</h3>
          <p className="mt-2 text-sm text-slate-400">Pick a card from the default set, edit it, then save it into this set from the editor.</p>
         </div>
        )}
       </>
      ) : (
       <div className="rounded-3xl border border-dashed border-white/15 bg-slate-950/40 px-8 py-14 text-center">
        <h3 className="text-lg font-semibold text-white">No saved sets yet</h3>
        <p className="mt-2 text-sm text-slate-400">Create your first empty set above, then save cards into it from the editor.</p>
       </div>
      )}
     </>
    )}
   </div>
  </div>
 );
}
