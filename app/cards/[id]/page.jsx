import Link from 'next/link';
import { getCard } from '../../../lib/card-game-data';
import CardEditor from '../../components/CardEditor';

export default async function CardEditorPage({ params }) {
 const { id } = await params;
 const card = await getCard(id);

 if (!card) {
  return (
   <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
    <div className="text-center">
     <h1 className="text-2xl font-bold">Card not found</h1>
     <Link
      href="/"
      className="mt-4 inline-block text-sm text-blue-400 hover:underline"
     >
      ← Back to Cards
     </Link>
    </div>
   </main>
  );
 }

 return <CardEditor card={card} />;
}
