import { NextResponse } from 'next/server';
import { createCardForDeck, getDeckCards } from '../../../../../lib/card-game-data';

export async function GET(_request, { params }) {
 const deck = await getDeckCards(params.deckSlug);

 if (!deck) {
  return NextResponse.json({ error: 'Deck not found.' }, { status: 404 });
 }

 return NextResponse.json(deck);
}

export async function POST(request, { params }) {
 try {
  const body = await request.json();
  const card = await createCardForDeck(params.deckSlug, body);

  return NextResponse.json(card, { status: 201 });
 } catch (error) {
  const message = error instanceof Error ? error.message : 'Unable to create card.';
  const status = message === 'Deck not found.' ? 404 : 400;

  return NextResponse.json({ error: message }, { status });
 }
}