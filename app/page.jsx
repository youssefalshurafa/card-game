import Link from 'next/link';
import { getDefaultSetDeck, getProjectOverview, getSavedSetDecks } from '../lib/card-game-data';
import HomeDeckTabs from './components/HomeDeckTabs';

export const metadata = {
 title: 'Signal Management Card Game',
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

 const totalCards = project.decks.reduce((count, deck) => count + (deck.cards?.length ?? 0), 0);
 const defaultDeck = getDefaultSetDeck(project);
 const savedSets = getSavedSetDecks(project);

 return (
  <main className="min-h-screen bg-slate-900">
   {/* Header */}
   <header className="border-b border-white/10 bg-slate-950/80 px-6 py-6 backdrop-blur">
    <div className="mx-auto max-w-7xl">
     <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Signal Management Drill</p>
     <h1 className="mt-2 text-3xl font-bold text-white">{project.name}</h1>
     <p className="mt-1 max-w-2xl text-sm text-slate-400">{project.description}</p>
     <div className="mt-4 flex gap-3 text-xs text-slate-500">
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{totalCards} Total Cards</span>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Switch tabs to browse sets</span>
     </div>
    </div>
   </header>

   <HomeDeckTabs
    projectSlug={project.slug}
    defaultDeck={defaultDeck}
    savedSets={savedSets}
   />
  </main>
 );
}
