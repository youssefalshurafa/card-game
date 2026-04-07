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
          <button
           key={deck.id}
           type="button"
           onClick={() => setActiveSavedSetSlug(deck.slug)}
           className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            deck.slug === activeSavedSet?.slug ? 'border-teal-400 bg-teal-500/15 text-teal-200' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
           }`}
          >
           {deck.name}
          </button>
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
