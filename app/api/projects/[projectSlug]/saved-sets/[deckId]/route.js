import { NextResponse } from 'next/server';
import { renameSavedSet, deleteSavedSet } from '../../../../../../lib/card-game-data';

export async function PATCH(request, { params }) {
  try {
    const { deckId } = await params;
    const body = await request.json().catch(() => ({}));
    const deck = await renameSavedSet(deckId, body?.name);

    return NextResponse.json(deck);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to rename saved set.';
    const status = message === 'Saved set not found.' ? 404 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { deckId } = await params;
    await deleteSavedSet(deckId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to delete saved set.';
    const status = message === 'Saved set not found.' ? 404 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
