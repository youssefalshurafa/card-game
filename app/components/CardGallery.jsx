'use client';

import Link from 'next/link';
import CardRenderer from './cards/CardRenderer';
import { buildFieldsFromCard } from './cards/utils';

export default function CardGallery({ cards }) {
 return (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {cards.map((card) => (
    <Link
     key={card.id}
     href={`/cards/${card.id}`}
     className="group block"
    >
     <div className="aspect-[5/7] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 transition-all duration-200 group-hover:scale-[1.02] group-hover:ring-2 group-hover:ring-blue-400/50 group-hover:shadow-blue-500/20">
      <CardRenderer
       card={card}
       fields={buildFieldsFromCard(card)}
      />
     </div>
     <div className="mt-2 flex items-center justify-between px-1">
      <p className="text-sm font-medium text-slate-300">{card.name}</p>
      <span className="text-xs text-slate-500">{card.metadata?.cardType}</span>
     </div>
    </Link>
   ))}
  </div>
 );
}
