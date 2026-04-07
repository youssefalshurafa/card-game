import { NextResponse } from 'next/server';
import { duplicateCardToDeck } from '../../../../../lib/card-game-data';

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json().catch(() => ({}));
        const targetDeckSlug = typeof body?.targetDeckSlug === 'string' ? body.targetDeckSlug : '';
        const card = await duplicateCardToDeck(id, targetDeckSlug, body?.fields ?? {}, body?.metadata ?? {});

        return NextResponse.json(card, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to save card copy.';
        const status = message === 'Card not found.' || message === 'Deck not found.' ? 404 : 400;

        return NextResponse.json({ error: message }, { status });
    }
}