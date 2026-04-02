import { getProjectOverview } from '../lib/card-game-data';

function getFaceElementText(card, key) {
 const frontFace = card.faces.find((face) => face.side === 'front');
 const element = frontFace?.elements.find((item) => item.key === key);
 return element?.value?.text ?? '';
}

function DeckPanel({ deck }) {
 return (
  <section className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur">
   <div className="flex items-start justify-between gap-4">
    <div>
     <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-700">Deck</p>
     <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{deck.name}</h2>
     <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{deck.description}</p>
    </div>
    <div className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
     {deck.cardSize.width} x {deck.cardSize.height}
    </div>
   </div>

   <div className="mt-6 grid gap-4 sm:grid-cols-3">
    <div className="rounded-2xl bg-slate-950 p-4 text-white">
     <p className="text-xs uppercase tracking-[0.24em] text-teal-300">Cards</p>
     <p className="mt-2 text-3xl font-semibold">{deck.counts.cards}</p>
    </div>
    <div className="rounded-2xl bg-amber-100 p-4 text-slate-950">
     <p className="text-xs uppercase tracking-[0.24em] text-amber-800">Templates</p>
     <p className="mt-2 text-3xl font-semibold">{deck.counts.templates}</p>
    </div>
    <div className="rounded-2xl bg-teal-100 p-4 text-slate-950">
     <p className="text-xs uppercase tracking-[0.24em] text-teal-800">Frame Color</p>
     <p className="mt-2 text-lg font-semibold">{deck.theme.frameColor ?? 'Not set'}</p>
    </div>
   </div>

   <div className="mt-8 grid gap-5 lg:grid-cols-2">
    {deck.cards.map((card) => (
     <article
      key={card.id}
      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 p-5 text-white"
     >
      <div className="flex items-center justify-between gap-3">
       <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-teal-200/90">{card.status}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{card.name}</h3>
       </div>
       <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/80">{card.metadata.rarity ?? 'draft'}</div>
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/8 p-5">
       <p className="text-[0.68rem] uppercase tracking-[0.24em] text-amber-200">Card Surface Preview</p>
       <div className="mt-4 aspect-[5/7] rounded-[1.5rem] bg-gradient-to-b from-white/95 via-teal-50 to-amber-50 p-5 text-slate-950 shadow-inner">
        <div
         className="flex h-full flex-col rounded-[1.2rem] border-4 p-4"
         style={{ borderColor: deck.theme.frameColor ?? '#1f6f78' }}
        >
         <p className="text-2xl font-semibold tracking-tight">{getFaceElementText(card, 'title') || card.name}</p>
         <div className="mt-4 flex-1 rounded-[1rem] border border-dashed border-slate-300 bg-white/70 p-3 text-sm text-slate-500">Artwork slot</div>
         <p className="mt-4 text-sm leading-6 text-slate-700">{getFaceElementText(card, 'rules') || 'Rules text will render from editable elements.'}</p>
        </div>
       </div>
      </div>
     </article>
    ))}
   </div>
  </section>
 );
}

export default async function Home() {
 const project = await getProjectOverview();

 if (!project) {
  return (
   <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
     <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Database</p>
     <h1 className="mt-4 text-4xl font-semibold tracking-tight">No seeded project found</h1>
     <p className="mt-4 text-slate-300">Run npm run db:seed to create the initial card game data.</p>
    </div>
   </main>
  );
 }

 return (
  <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.28),_transparent_30%),linear-gradient(180deg,_#fffaf0_0%,_#f8fafc_44%,_#e2e8f0_100%)] px-6 py-8 text-slate-950">
   <div className="mx-auto flex max-w-7xl flex-col gap-8">
    <section className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_120px_rgba(15,23,42,0.24)] sm:px-8 lg:px-10">
     <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
      <div>
       <p className="text-xs font-semibold uppercase tracking-[0.36em] text-teal-300">Card Game Generator</p>
       <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{project.name}</h1>
       <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{project.description}</p>
       <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
        <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2">In-card editing</span>
        <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2">Prisma + SQLite</span>
        <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2">App Router</span>
       </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
       <div className="rounded-[1.8rem] bg-white px-5 py-4 text-slate-950">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Decks</p>
        <p className="mt-2 text-4xl font-semibold">{project.counts.decks}</p>
       </div>
       <div className="rounded-[1.8rem] bg-teal-300 px-5 py-4 text-slate-950">
        <p className="text-xs uppercase tracking-[0.22em] text-teal-900">Assets</p>
        <p className="mt-2 text-4xl font-semibold">{project.counts.assets}</p>
       </div>
       <div className="rounded-[1.8rem] bg-amber-300 px-5 py-4 text-slate-950">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-900">Default Size</p>
        <p className="mt-2 text-2xl font-semibold">
         {project.settings.defaultCardSize?.width} x {project.settings.defaultCardSize?.height}
        </p>
       </div>
      </div>
     </div>
    </section>

    <section className="grid gap-4 rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:grid-cols-3">
     <div className="rounded-[1.5rem] bg-slate-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Project API</p>
      <p className="mt-3 text-sm text-slate-700">GET /api/projects/{project.slug}</p>
     </div>
     <div className="rounded-[1.5rem] bg-slate-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Deck Cards API</p>
      <p className="mt-3 text-sm text-slate-700">GET /api/decks/{project.decks[0]?.slug}/cards</p>
     </div>
     <div className="rounded-[1.5rem] bg-slate-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Create Card API</p>
      <p className="mt-3 text-sm text-slate-700">POST /api/decks/{project.decks[0]?.slug}/cards</p>
     </div>
    </section>

    <div className="grid gap-8">
     {project.decks.map((deck) => (
      <DeckPanel
       key={deck.id}
       deck={deck}
      />
     ))}
    </div>
   </div>
  </main>
 );
}
