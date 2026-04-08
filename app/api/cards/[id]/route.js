import { prisma } from '../../../../lib/prisma';

const EXTRA_EDITABLE_FIELDS = {
  'hotline-call': {
    avatar_image: { label: 'Avatar Image', type: 'image' },
  },
  bulletin: {
    map_image: { label: 'Map Image', type: 'image' },
  },
};

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
  const metadata = card.metadataJson ? JSON.parse(card.metadataJson) : {};
  const cardType = metadata.cardType ?? metadata.sourceKind ?? null;
  const extraFields = EXTRA_EDITABLE_FIELDS[cardType] ?? {};

  for (const face of card.faces) {
    const existingKeys = new Set(face.elements.map((element) => element.key));
    const nextSortOrder = face.elements.reduce((maxSortOrder, element) => Math.max(maxSortOrder, element.sortOrder ?? 0), -1) + 1;
    let appendedCount = 0;

    for (const element of face.elements) {
      if (Object.prototype.hasOwnProperty.call(fields, element.key)) {
        const currentValue = element.valueJson ? JSON.parse(element.valueJson) : {};
        let updatedValue;

        if (element.type === 'json') {
          const nextValue = fields[element.key];
          if (typeof nextValue === 'string') {
            try {
              updatedValue = JSON.parse(nextValue);
            } catch {
              updatedValue = currentValue;
            }
          } else if (nextValue && typeof nextValue === 'object') {
            updatedValue = nextValue;
          } else {
            updatedValue = currentValue;
          }
        } else {
          updatedValue = { ...currentValue, text: fields[element.key] };
        }

        updates.push(
          prisma.cardElement.update({
            where: { id: element.id },
            data: { valueJson: JSON.stringify(updatedValue) },
          })
        );
      }
    }

    for (const [fieldKey, definition] of Object.entries(extraFields)) {
      if (!Object.prototype.hasOwnProperty.call(fields, fieldKey) || existingKeys.has(fieldKey)) {
        continue;
      }

      updates.push(
        prisma.cardElement.create({
          data: {
            faceId: face.id,
            key: fieldKey,
            label: definition.label,
            type: definition.type,
            valueJson: JSON.stringify({ text: fields[fieldKey] }),
            sortOrder: nextSortOrder + appendedCount,
          },
        })
      );

      appendedCount += 1;
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

export async function DELETE(_request, { params }) {
  const { id } = await params;

  const card = await prisma.card.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!card) {
    return Response.json({ error: 'Card not found' }, { status: 404 });
  }

  await prisma.card.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
