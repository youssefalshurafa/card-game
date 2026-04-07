import { NextResponse } from 'next/server';
import { createSavedSet } from '../../../../../lib/card-game-data';

export async function POST(request, { params }) {
  try {
    const { projectSlug } = await params;
    const body = await request.json().catch(() => ({}));
    const deck = await createSavedSet(projectSlug, body ?? {});

    return NextResponse.json(deck, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create saved set.';
    const status = message === 'Project not found.' ? 404 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}