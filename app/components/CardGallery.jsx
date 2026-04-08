'use client';

import Link from 'next/link';
import CardRenderer from './cards/CardRenderer';
import { buildFieldsFromCard } from './cards/utils';

export default function CardGallery({ cards, onDeleteCard, deletingCardId = null }) {
 return (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {cards.map((card) => (
    <div
     key={card.id}
     className="group relative"
    >
     {onDeleteCard ? (
      <button
       type="button"
       onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDeleteCard(card);
       }}
       disabled={deletingCardId === card.id}
       className="absolute right-2 top-2 z-10 rounded-full border border-rose-500/30 bg-slate-950/85 p-2 text-rose-300 opacity-0 shadow-lg transition-opacity hover:bg-rose-500/20 group-hover:opacity-100 disabled:opacity-60"
       title="Delete card"
       aria-label={`Delete ${card.name}`}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4"
       >
        <path
         fillRule="evenodd"
         d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
         clipRule="evenodd"
        />
       </svg>
      </button>
     ) : null}
     <Link
      href={`/cards/${card.id}`}
      className="block"
     >
      <div className="aspect-5/7 overflow-hidden shadow-lg transition-all duration-200 group-hover:scale-[1.02] group-hover:ring-2 group-hover:ring-blue-400/50 group-hover:shadow-blue-500/20">
       <CardRenderer
        card={card}
        fields={buildFieldsFromCard(card)}
       />
      </div>
     </Link>
    </div>
   ))}
  </div>
 );
}
