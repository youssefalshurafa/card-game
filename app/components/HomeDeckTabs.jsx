'use client';

import { useState } from 'react';
import CardGallery from './CardGallery';

const TAB_ORDER = ['signal-challenges', 'my-saved-sets'];

function getTabLabel(deck) {
 if (deck.slug === 'signal-challenges') {
  return 'Default Set';
 }

 if (deck.slug === 'my-saved-sets') {
  return 'My Saved Sets';
 }

 return deck.name;
}

function sortDecks(decks) {
 return [...decks].sort((left, right) => {
  const leftIndex = TAB_ORDER.indexOf(left.slug);
  const rightIndex = TAB_ORDER.indexOf(right.slug);

  if (leftIndex === -1 && rightIndex === -1) {
   return left.sortOrder - right.sortOrder;
  }

  if (leftIndex === -1) {
   return 1;
  }

  if (rightIndex === -1) {
   return -1;
  }

  return leftIndex - rightIndex;
 });
}

export default function HomeDeckTabs({ decks }) {
 const orderedDecks = sortDecks(decks);
 const [activeDeckSlug, setActiveDeckSlug] = useState(orderedDecks[0]?.slug ?? null);
 const activeDeck = orderedDecks.find((deck) => deck.slug === activeDeckSlug) ?? orderedDecks[0] ?? null;
 const cards = activeDeck?.cards ?? [];
 const emptyTitle = activeDeck?.slug === 'my-saved-sets' ? 'No saved sets yet' : 'No cards in this set';
 const emptyDescription = activeDeck?.slug === 'my-saved-sets' ? 'This tab is ready for your custom saved cards and sets.' : 'This set is empty right now.';

 return (
  <div>
   <div className="border-b border-white/10">
    <div className="mx-auto flex max-w-7xl gap-2 px-6 pt-4">
     {orderedDecks.map((deck) => {
      const isActive = deck.slug === activeDeck?.slug;

      return (
       <button
        key={deck.id}
        type="button"
        onClick={() => setActiveDeckSlug(deck.slug)}
        className={`rounded-t-2xl border border-b-0 px-5 py-3 text-sm font-semibold transition-colors ${
         isActive ? 'border-white/15 bg-slate-900 text-white' : 'border-transparent bg-slate-950/60 text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
        }`}
       >
        {getTabLabel(deck)}
       </button>
      );
     })}
    </div>
   </div>

   <div className="mx-auto max-w-7xl px-6 py-8">
    {activeDeck ? (
     <div className="mb-6 flex items-end justify-between gap-4">
      <div>
       <h2 className="text-xl font-semibold text-white">{getTabLabel(activeDeck)}</h2>
       <p className="mt-1 text-sm text-slate-400">{activeDeck.description}</p>
      </div>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
       {cards.length} {cards.length === 1 ? 'card' : 'cards'}
      </span>
     </div>
    ) : null}

    {cards.length > 0 ? (
     <CardGallery cards={cards} />
    ) : (
     <div className="rounded-3xl border border-dashed border-white/15 bg-slate-950/40 px-8 py-14 text-center">
      <h3 className="text-lg font-semibold text-white">{emptyTitle}</h3>
      <p className="mt-2 text-sm text-slate-400">{emptyDescription}</p>
     </div>
    )}
   </div>
  </div>
 );
}
