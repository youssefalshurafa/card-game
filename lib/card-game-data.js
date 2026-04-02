import { prisma } from './prisma';

function parseJson(value, fallback = null) {
 if (!value) {
  return fallback;
 }

 try {
  return JSON.parse(value);
 } catch {
  return fallback;
 }
}

function slugify(value) {
 return value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 48);
}

function serializeElement(element, valueField = 'valueJson') {
 return {
  id: element.id,
  key: element.key,
  label: element.label,
  type: element.type,
  value: parseJson(element[valueField], {}),
  style: parseJson(element.styleJson, {}),
  position: parseJson(element.positionJson, {}),
  binding: parseJson(element.bindingJson, {}),
  isEditable: element.isEditable,
  sortOrder: element.sortOrder,
 };
}

function serializeCard(card) {
 return {
  id: card.id,
  deckId: card.deckId,
  templateId: card.templateId,
  name: card.name,
  slug: card.slug,
  status: card.status,
  metadata: parseJson(card.metadataJson, {}),
  sortOrder: card.sortOrder,
  createdAt: card.createdAt.toISOString(),
  updatedAt: card.updatedAt.toISOString(),
  faces: (card.faces ?? []).map((face) => ({
   id: face.id,
   side: face.side,
   name: face.name,
   background: parseJson(face.backgroundJson, {}),
   elements: (face.elements ?? []).map((element) => serializeElement(element)),
  })),
  revisions: (card.revisions ?? []).map((revision) => ({
   id: revision.id,
   version: revision.version,
   snapshot: parseJson(revision.snapshotJson, {}),
   changeNote: revision.changeNote,
   createdAt: revision.createdAt.toISOString(),
  })),
 };
}

function serializeTemplate(template) {
 return {
  id: template.id,
  deckId: template.deckId,
  name: template.name,
  description: template.description,
  layout: parseJson(template.layoutJson, {}),
  style: parseJson(template.styleJson, {}),
  sortOrder: template.sortOrder,
  faces: (template.faces ?? []).map((face) => ({
   id: face.id,
   side: face.side,
   background: parseJson(face.backgroundJson, {}),
   elements: (face.elements ?? []).map((element) => serializeElement(element, 'contentJson')),
  })),
 };
}

function serializeDeck(deck) {
 return {
  id: deck.id,
  projectId: deck.projectId,
  name: deck.name,
  slug: deck.slug,
  description: deck.description,
  cardSize: {
   width: deck.cardWidth,
   height: deck.cardHeight,
  },
  theme: parseJson(deck.themeJson, {}),
  sortOrder: deck.sortOrder,
  counts: {
   cards: deck._count?.cards ?? 0,
   templates: deck._count?.templates ?? 0,
  },
  templates: (deck.templates ?? []).map(serializeTemplate),
  cards: (deck.cards ?? []).map(serializeCard),
 };
}

function serializeProject(project) {
 if (!project) {
  return null;
 }

 return {
  id: project.id,
  name: project.name,
  slug: project.slug,
  description: project.description,
  settings: parseJson(project.settingsJson, {}),
  createdAt: project.createdAt.toISOString(),
  updatedAt: project.updatedAt.toISOString(),
  counts: {
   decks: project._count?.decks ?? 0,
   assets: project._count?.assets ?? 0,
  },
  decks: (project.decks ?? []).map(serializeDeck),
 };
}

export async function getProjectOverview(projectSlug = 'ethiopia-card-game') {
 const project = await prisma.gameProject.findUnique({
  where: { slug: projectSlug },
  include: {
   _count: {
    select: {
     decks: true,
     assets: true,
    },
   },
   decks: {
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
     _count: {
      select: {
       cards: true,
       templates: true,
      },
     },
     templates: {
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
       faces: {
        orderBy: { side: 'asc' },
        include: {
         elements: {
          orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
         },
        },
       },
      },
     },
     cards: {
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
       revisions: {
        orderBy: { version: 'desc' },
        take: 1,
       },
       faces: {
        orderBy: { side: 'asc' },
        include: {
         elements: {
          orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
         },
        },
       },
      },
     },
    },
   },
  },
 });

 return serializeProject(project);
}

export async function getDeckCards(deckSlug) {
 const deck = await prisma.deck.findFirst({
  where: { slug: deckSlug },
  include: {
   _count: {
    select: {
     cards: true,
     templates: true,
    },
   },
   cards: {
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
     revisions: {
      orderBy: { version: 'desc' },
      take: 1,
     },
     faces: {
      orderBy: { side: 'asc' },
      include: {
       elements: {
        orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
       },
      },
     },
    },
   },
  },
 });

 return deck ? serializeDeck(deck) : null;
}

async function getNextUniqueCardSlug(deckId, name) {
 const baseSlug = slugify(name) || 'untitled-card';

 for (let index = 0; index < 1000; index += 1) {
  const candidate = index === 0 ? baseSlug : `${baseSlug}-${index + 1}`;
  const existingCard = await prisma.card.findFirst({
   where: {
    deckId,
    slug: candidate,
   },
   select: {
    id: true,
   },
  });

  if (!existingCard) {
   return candidate;
  }
 }

 throw new Error('Unable to generate a unique card slug.');
}

function buildCardFacesFromTemplate(template, cardName) {
 return template.faces.map((face) => ({
  side: face.side,
  backgroundJson: face.backgroundJson,
  elements: {
   create: face.elements.map((element) => {
    const baseValue = parseJson(element.contentJson, {});
    const nextValue =
     element.key === 'title' && typeof baseValue === 'object'
      ? { ...baseValue, text: cardName }
      : baseValue;

    return {
     key: element.key,
     label: element.label,
     type: element.type,
     valueJson: JSON.stringify(nextValue),
     styleJson: element.styleJson,
     positionJson: element.positionJson,
     bindingJson: JSON.stringify({ templateElementId: element.id }),
     sortOrder: element.sortOrder,
    };
   }),
  },
 }));
}

export async function createCardForDeck(deckSlug, input) {
 const name = typeof input?.name === 'string' ? input.name.trim() : '';

 if (!name) {
  throw new Error('Card name is required.');
 }

 const deck = await prisma.deck.findFirst({
  where: { slug: deckSlug },
  include: {
   templates: {
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
     faces: {
      orderBy: { side: 'asc' },
      include: {
       elements: {
        orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
       },
      },
     },
    },
   },
   _count: {
    select: {
     cards: true,
    },
   },
  },
 });

 if (!deck) {
  throw new Error('Deck not found.');
 }

 const template = deck.templates[0];

 if (!template) {
  throw new Error('A template is required before creating cards in this deck.');
 }

 const slug = await getNextUniqueCardSlug(deck.id, name);
 const sortOrder = deck._count.cards;

 const card = await prisma.card.create({
  data: {
   deckId: deck.id,
   templateId: template.id,
   name,
   slug,
   status: 'draft',
   sortOrder,
   metadataJson: JSON.stringify({ rarity: 'common' }),
   faces: {
    create: buildCardFacesFromTemplate(template, name),
   },
   revisions: {
    create: {
     version: 1,
     snapshotJson: JSON.stringify({
      createdFromTemplateId: template.id,
      cardName: name,
     }),
     changeNote: 'Card created from template',
    },
   },
  },
  include: {
   revisions: {
    orderBy: { version: 'desc' },
    take: 1,
   },
   faces: {
    orderBy: { side: 'asc' },
    include: {
     elements: {
      orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
     },
    },
   },
  },
 });

 return serializeCard(card);
}