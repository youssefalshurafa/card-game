import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = await params;

  const card = await prisma.card.findUnique({
    where: { id },
    include: {
      faces: {
        orderBy: { side: 'asc' },
        include: {
          elements: { orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }] },
        },
      },
    },
  });

  if (!card) {
    return Response.json({ error: 'Card not found' }, { status: 404 });
  }

  return Response.json(card);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const { fields } = body;

  if (!fields || typeof fields !== 'object') {
    return Response.json({ error: 'fields object is required' }, { status: 400 });
  }

  const card = await prisma.card.findUnique({
    where: { id },
    include: {
      faces: {
        include: { elements: true },
      },
    },
  });

  if (!card) {
    return Response.json({ error: 'Card not found' }, { status: 404 });
  }

  const updates = [];
  for (const face of card.faces) {
    for (const element of face.elements) {
      if (Object.prototype.hasOwnProperty.call(fields, element.key)) {
        const currentValue = element.valueJson ? JSON.parse(element.valueJson) : {};
        const updatedValue = { ...currentValue, text: fields[element.key] };
        updates.push(
          prisma.cardElement.update({
            where: { id: element.id },
            data: { valueJson: JSON.stringify(updatedValue) },
          })
        );
      }
    }
  }

  updates.push(
    prisma.card.update({
      where: { id },
      data: { updatedAt: new Date() },
    })
  );

  await prisma.$transaction(updates);

  return Response.json({ success: true });
}
