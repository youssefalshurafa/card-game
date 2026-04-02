import { NextResponse } from 'next/server';
import { getProjectOverview } from '../../../../lib/card-game-data';

export async function GET(_request, { params }) {
 const project = await getProjectOverview(params.projectSlug);

 if (!project) {
  return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
 }

 return NextResponse.json(project);
}