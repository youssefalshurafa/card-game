import Link from 'next/link';
import { getProjectOverview } from '../lib/card-game-data';
import CardGallery from './components/CardGallery';

export const metadata = {
 title: 'Ethiopia Signal Management Card Game',
 description: 'Challenge cards for public health emergency signal management training.',
};

export default async function Home() {
 const project = await getProjectOverview();

 if (!project) {
  return (
   <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
    <div className="text-center">
     <h1 className="text-3xl font-bold">No project found</h1>
     <p className="mt-2 text-slate-400">
      Run <code className="rounded bg-white/10 px-2 py-0.5">npm run db:seed</code> to populate the database.
     </p>
    </div>
   </main>
  );
 }

 const deck = project.decks[0];
 const cards = deck?.cards ?? [];

 return (
  <main className="min-h-screen bg-slate-900">
   {/* Header */}
   <header className="border-b border-white/10 bg-slate-950/80 px-6 py-6 backdrop-blur">
    <div className="mx-auto max-w-7xl">
     <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Signal Management Drill</p>
     <h1 className="mt-2 text-3xl font-bold text-white">{project.name}</h1>
     <p className="mt-1 max-w-2xl text-sm text-slate-400">{project.description}</p>
     <div className="mt-4 flex gap-3 text-xs text-slate-500">
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{cards.length} Challenge Cards</span>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Click a card to edit</span>
     </div>
    </div>
   </header>

   {/* Card gallery */}
   <div className="mx-auto max-w-7xl px-6 py-8">
    <CardGallery cards={cards} />
   </div>
  </main>
 );
}
