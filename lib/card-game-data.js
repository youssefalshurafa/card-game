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

function getTemplateMetadata(template) {
  const layout = parseJson(template.layoutJson, {});
  const style = parseJson(template.styleJson, {});

  return {
    layout,
    style,
    category: layout.templateCategory ?? 'generic',
    sourceKind: layout.sourceKind ?? null,
  };
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
  const metadata = getTemplateMetadata(template);

  return {
    id: template.id,
    deckId: template.deckId,
    name: template.name,
    description: template.description,
    layout: metadata.layout,
    style: metadata.style,
    category: metadata.category,
    sourceKind: metadata.sourceKind,
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

function isSystemDeckSlug(slug) {
  return slug === 'signal-challenges' || slug === 'my-saved-sets';
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

function buildCardFacesFromTemplate(template, overrides = {}) {
  return template.faces.map((face) => ({
    side: face.side,
    backgroundJson: face.backgroundJson,
    elements: {
      create: face.elements.map((element) => {
        const baseValue = parseJson(element.contentJson, {});
        const nextValue = Object.prototype.hasOwnProperty.call(overrides, element.key)
          ? overrides[element.key]
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

function normalizeElementValue(type, nextValue, fallbackValue) {
  if (type === 'json') {
    if (typeof nextValue === 'string') {
      try {
        return JSON.parse(nextValue);
      } catch {
        return fallbackValue;
      }
    }

    if (nextValue && typeof nextValue === 'object') {
      return nextValue;
    }

    return fallbackValue;
  }

  if (typeof nextValue === 'undefined') {
    return fallbackValue;
  }

  return {
    ...(fallbackValue && typeof fallbackValue === 'object' ? fallbackValue : {}),
    text: nextValue,
  };
}

function selectTemplate(deck, input) {
  if (input?.templateId) {
    return deck.templates.find((template) => template.id === input.templateId) ?? null;
  }

  if (input?.templateName) {
    const normalizedName = String(input.templateName).trim().toLowerCase();
    return deck.templates.find((template) => template.name.toLowerCase() === normalizedName) ?? null;
  }

  return deck.templates.find((template) => getTemplateMetadata(template).category === 'challenge') ?? deck.templates[0] ?? null;
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

async function getNextUniqueDeckSlug(projectId, name) {
  const baseSlug = slugify(name) || 'saved-set';

  for (let index = 0; index < 1000; index += 1) {
    const candidate = index === 0 ? baseSlug : `${baseSlug}-${index + 1}`;
    const existingDeck = await prisma.deck.findFirst({
      where: {
        projectId,
        slug: candidate,
      },
      select: {
        id: true,
      },
    });

    if (!existingDeck) {
      return candidate;
    }
  }

  throw new Error('Unable to generate a unique set slug.');
}

const projectOverviewInclude = {
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
};

export async function getProjectOverview(projectSlug) {
  const project = projectSlug
    ? await prisma.gameProject.findUnique({
      where: { slug: projectSlug },
      include: projectOverviewInclude,
    })
    : await prisma.gameProject.findFirst({
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
      include: projectOverviewInclude,
    });

  return serializeProject(project);
}

export async function createSavedSet(projectSlug, input) {
  const name = typeof input?.name === 'string' ? input.name.trim() : '';

  if (!name) {
    throw new Error('Set name is required.');
  }

  const project = projectSlug
    ? await prisma.gameProject.findUnique({
      where: { slug: projectSlug },
      select: {
        id: true,
        decks: {
          select: {
            id: true,
            sortOrder: true,
          },
        },
      },
    })
    : await prisma.gameProject.findFirst({
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        decks: {
          select: {
            id: true,
            sortOrder: true,
          },
        },
      },
    });

  if (!project) {
    throw new Error('Project not found.');
  }

  const slug = await getNextUniqueDeckSlug(project.id, name);
  const sortOrder = project.decks.reduce((maxSortOrder, deck) => Math.max(maxSortOrder, deck.sortOrder ?? 0), -1) + 1;

  const deck = await prisma.deck.create({
    data: {
      projectId: project.id,
      name,
      slug,
      description: `${name} saved set.`,
      sortOrder,
      themeJson: JSON.stringify({ frameColor: '#1f6f78', textColor: '#111827', accentColor: '#f59e0b' }),
    },
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
  });

  return serializeDeck(deck);
}

export function getSavedSetDecks(project) {
  return (project?.decks ?? []).filter((deck) => !isSystemDeckSlug(deck.slug));
}

export function getDefaultSetDeck(project) {
  return (project?.decks ?? []).find((deck) => deck.slug === 'signal-challenges') ?? null;
}

export async function getCard(cardId) {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: {
      faces: {
        orderBy: { side: 'asc' },
        include: {
          elements: {
            orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
          },
        },
      },
      revisions: {
        orderBy: { version: 'desc' },
        take: 1,
      },
    },
  });

  return card ? serializeCard(card) : null;
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

  const template = selectTemplate(deck, input);

  if (!template) {
    throw new Error('A template is required before creating cards in this deck.');
  }

  const slug = await getNextUniqueCardSlug(deck.id, name);
  const sortOrder = deck._count.cards;
  const templateLayout = getTemplateMetadata(template).layout;
  const elementOverrides = {
    title: { text: name },
  };

  if (templateLayout.primaryLabel) {
    elementOverrides.primary_label = { text: templateLayout.primaryLabel };
  }

  const card = await prisma.card.create({
    data: {
      deckId: deck.id,
      templateId: template.id,
      name,
      slug,
      status: 'draft',
      sortOrder,
      metadataJson: JSON.stringify({
        rarity: 'common',
        cardKind: templateLayout.templateCategory ?? 'generic',
        sourceKind: templateLayout.sourceKind ?? null,
        difficulty: input?.difficulty ?? templateLayout.difficulty ?? null,
      }),
      faces: {
        create: buildCardFacesFromTemplate(template, elementOverrides),
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

export async function duplicateCardToDeck(cardId, deckSlug, fields = {}) {
  const sourceCard = await prisma.card.findUnique({
    where: { id: cardId },
    include: {
      faces: {
        orderBy: { side: 'asc' },
        include: {
          elements: {
            orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }],
          },
        },
      },
      revisions: {
        orderBy: { version: 'desc' },
        take: 1,
      },
    },
  });

  if (!sourceCard) {
    throw new Error('Card not found.');
  }

  const targetDeck = await prisma.deck.findFirst({
    where: { slug: deckSlug },
    include: {
      _count: {
        select: {
          cards: true,
        },
      },
    },
  });

  if (!targetDeck) {
    throw new Error('Deck not found.');
  }

  if (isSystemDeckSlug(targetDeck.slug)) {
    throw new Error('Select a saved set before saving this card.');
  }

  const slug = await getNextUniqueCardSlug(targetDeck.id, sourceCard.name);
  const sortOrder = targetDeck._count.cards;
  const metadata = parseJson(sourceCard.metadataJson, {});

  const copiedCard = await prisma.card.create({
    data: {
      deckId: targetDeck.id,
      templateId: sourceCard.templateId,
      name: sourceCard.name,
      slug,
      status: sourceCard.status === 'challenge' ? 'saved' : sourceCard.status,
      sortOrder,
      metadataJson: JSON.stringify(metadata),
      faces: {
        create: sourceCard.faces.map((face) => ({
          side: face.side,
          name: face.name,
          backgroundJson: face.backgroundJson,
          backgroundAssetId: face.backgroundAssetId,
          elements: {
            create: face.elements.map((element) => {
              const currentValue = parseJson(element.valueJson, {});
              const nextValue = normalizeElementValue(element.type, fields[element.key], currentValue);

              return {
                key: element.key,
                label: element.label,
                type: element.type,
                valueJson: JSON.stringify(nextValue),
                styleJson: element.styleJson,
                positionJson: element.positionJson,
                bindingJson: element.bindingJson,
                isEditable: element.isEditable,
                sortOrder: element.sortOrder,
              };
            }),
          },
        })),
      },
      revisions: {
        create: {
          version: 1,
          snapshotJson: JSON.stringify({
            copiedFromCardId: sourceCard.id,
            copiedFromDeckId: sourceCard.deckId,
            originalChallengeNumber: metadata.challengeNumber ?? null,
            savedToDeckSlug: targetDeck.slug,
          }),
          changeNote: `Copied to saved set: ${targetDeck.name}`,
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

  return serializeCard(copiedCard);
}