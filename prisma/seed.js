const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function ensureTemplate(deckId) {
    const existingTemplate = await prisma.cardTemplate.findFirst({
        where: {
            deckId,
            name: 'Default Template',
        },
    });

    if (existingTemplate) {
        return existingTemplate;
    }

    return prisma.cardTemplate.create({
        data: {
            deckId,
            name: 'Default Template',
            description: 'Editable front and back faces with positioned content blocks.',
            layoutJson: JSON.stringify({ mode: 'freeform-grid', columns: 6 }),
            styleJson: JSON.stringify({ borderRadius: 24, padding: 24 }),
            faces: {
                create: [
                    {
                        side: 'front',
                        elements: {
                            create: [
                                {
                                    key: 'title',
                                    label: 'Title',
                                    type: 'text',
                                    contentJson: JSON.stringify({ text: 'Untitled Card' }),
                                    positionJson: JSON.stringify({ x: 32, y: 32, w: 686, h: 72 }),
                                    styleJson: JSON.stringify({ fontSize: 42, fontWeight: 700 }),
                                },
                                {
                                    key: 'art',
                                    label: 'Artwork',
                                    type: 'image',
                                    contentJson: JSON.stringify({ src: '', fit: 'cover' }),
                                    positionJson: JSON.stringify({ x: 32, y: 124, w: 686, h: 420 }),
                                },
                                {
                                    key: 'rules',
                                    label: 'Rules Text',
                                    type: 'rich-text',
                                    contentJson: JSON.stringify({ text: 'Describe the card effect here.' }),
                                    positionJson: JSON.stringify({ x: 32, y: 568, w: 686, h: 280 }),
                                },
                            ],
                        },
                    },
                    {
                        side: 'back',
                        elements: {
                            create: [
                                {
                                    key: 'back-title',
                                    label: 'Back Title',
                                    type: 'text',
                                    contentJson: JSON.stringify({ text: 'Card Back' }),
                                    positionJson: JSON.stringify({ x: 32, y: 32, w: 686, h: 72 }),
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
}

async function main() {
    const project = await prisma.gameProject.upsert({
        where: { slug: 'ethiopia-card-game' },
        update: {
            name: 'Ethiopia Card Game',
            description: 'Starter project for a fully editable card game generator.',
        },
        create: {
            name: 'Ethiopia Card Game',
            slug: 'ethiopia-card-game',
            description: 'Starter project for a fully editable card game generator.',
            settingsJson: JSON.stringify({
                defaultCardSize: { width: 750, height: 1050 },
                editingMode: 'in-place',
            }),
        },
    });

    const deck = await prisma.deck.upsert({
        where: {
            projectId_slug: {
                projectId: project.id,
                slug: 'starter-deck',
            },
        },
        update: {
            name: 'Starter Deck',
        },
        create: {
            projectId: project.id,
            name: 'Starter Deck',
            slug: 'starter-deck',
            description: 'A seed deck for building the editable generator UI.',
            themeJson: JSON.stringify({
                frameColor: '#1f6f78',
                textColor: '#111827',
                accentColor: '#f59e0b',
            }),
        },
    });

    const template = await ensureTemplate(deck.id);

    const existingCard = await prisma.card.findFirst({
        where: {
            deckId: deck.id,
            slug: 'sample-card',
        },
    });

    if (!existingCard) {
        await prisma.card.create({
            data: {
                deckId: deck.id,
                templateId: template.id,
                name: 'Sample Card',
                slug: 'sample-card',
                status: 'draft',
                metadataJson: JSON.stringify({ rarity: 'common' }),
                faces: {
                    create: [
                        {
                            side: 'front',
                            elements: {
                                create: [
                                    {
                                        key: 'title',
                                        label: 'Title',
                                        type: 'text',
                                        valueJson: JSON.stringify({ text: 'Sample Card' }),
                                        positionJson: JSON.stringify({ x: 32, y: 32, w: 686, h: 72 }),
                                        styleJson: JSON.stringify({ fontSize: 42, fontWeight: 700 }),
                                    },
                                    {
                                        key: 'rules',
                                        label: 'Rules Text',
                                        type: 'rich-text',
                                        valueJson: JSON.stringify({ text: 'This area is editable directly on the card.' }),
                                        positionJson: JSON.stringify({ x: 32, y: 568, w: 686, h: 280 }),
                                    },
                                ],
                            },
                        },
                        {
                            side: 'back',
                            elements: {
                                create: [
                                    {
                                        key: 'back-title',
                                        label: 'Back Title',
                                        type: 'text',
                                        valueJson: JSON.stringify({ text: 'Sample Card Back' }),
                                        positionJson: JSON.stringify({ x: 32, y: 32, w: 686, h: 72 }),
                                    },
                                ],
                            },
                        },
                    ],
                },
                revisions: {
                    create: {
                        version: 1,
                        snapshotJson: JSON.stringify({
                            note: 'Initial generated sample card',
                        }),
                        changeNote: 'Seeded starter card',
                    },
                },
            },
        });
    }

    console.log('Seed complete');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });