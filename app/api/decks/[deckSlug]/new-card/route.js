import { NextResponse } from 'next/server';
import { createBlankCardFromType } from '../../../../../lib/card-game-data';

export async function POST(request, { params }) {
  try {
    const { deckSlug } = await params;
    const body = await request.json().catch(() => ({}));
    const { cardType, name } = body ?? {};

    const card = await createBlankCardFromType(deckSlug, cardType, name);

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create card.';
    const status = message === 'Deck not found.' ? 404 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
