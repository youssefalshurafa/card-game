const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PROJECT_SLUG = 'signal-management-card-game';

function s(v) {
    return v == null ? null : JSON.stringify(v);
}

/* ---------- Challenge card definitions (exact PDF content) ---------- */

const challengeCards = [
    {
        name: 'Challenge 1',
        slug: 'challenge-1',
        sortOrder: 0,
        metadata: { cardType: 'breaking-news', challengeNumber: '1A', challengeLabel: 'Challenge 1', difficulty: 1 },
        elements: [
            { key: 'channel', label: 'Channel', type: 'text', value: { text: 'Global 24' } },
            { key: 'time', label: 'Time', type: 'text', value: { text: '16:00' } },
            { key: 'news_image', label: 'News Photo', type: 'image', value: { text: '' } },
            { key: 'headline', label: 'Headline', type: 'text', value: { text: 'Update from Adama Region' } },
            { key: 'ticker', label: 'News Ticker', type: 'text', value: { text: 'A fire broke out in a group of huts in the Adama region. Local authorities have since controlled the situation, and all affected families are now in temporary shelters. Stay tuned for further updates' } },
            { key: 'summary', label: 'Summary', type: 'rich-text', value: { text: '"This is Global 24 News bringing you an update from Adama. Yesterday, due to the factory explosion in Adama, a fire broke out in nearby huts, injuring three individuals, one of them died. Local authorities have since controlled the situation, and all affected families are now in temporary shelters. Stay tuned for further updates."' } },
            { key: 'label', label: 'Label', type: 'text', value: { text: 'Breaking News Summary' } },
        ],
    },
    {
        name: 'Challenge 2',
        slug: 'challenge-2',
        sortOrder: 1,
        metadata: { cardType: 'facebook-live', challengeNumber: '2A', challengeLabel: 'Challenge 2', difficulty: 1 },
        elements: [
            { key: 'live_image', label: 'Live Stream Photo', type: 'image', value: { text: '' } },
            { key: 'viewer_count', label: 'Viewers', type: 'text', value: { text: '2382' } },
            { key: 'comments', label: 'Comments', type: 'json', value: { items: [{ name: 'Lauren Evans', text: '\u{1F64F}' }, { name: '\u12A5\u130D\u12DA\u12A0\u1265\u1214\u122D \u12ED\u122D\u12F3\u1295', text: '' }, { name: 'Alice_90', text: '\u1208\u1270\u1308\u12F1\u1275 \u1338\u120E\u1275! :)' }, { name: '\u1234\u1293\u12ED\u1275_121', text: '' }] } },
            { key: 'summary', label: 'Summary', type: 'rich-text', value: { text: 'Facebook live feeds from influencers: A stampede occurred as attendees exited the music festival in Addis Ababa. Reports suggest 1 death and 30 mild injuries. Currently the stampede is over, and most people have evacuated safely.\n\nFire And Emergency Service\'s official Facebook account reported that the situation has since calmed, and most attendees have safely evacuated.' } },
            { key: 'url', label: 'URL', type: 'text', value: { text: 'https://www.facebook.com/live69/' } },
        ],
    },
    {
        name: 'Challenge 3',
        slug: 'challenge-3',
        sortOrder: 2,
        metadata: { cardType: 'social-post', challengeNumber: '3A', challengeLabel: 'Challenge 3', difficulty: 2 },
        elements: [
            { key: 'author', label: 'Author', type: 'text', value: { text: '\u12A0\u1263\u12ED\u1290\u1205' } },
            { key: 'time_ago', label: 'Time', type: 'text', value: { text: '20 Minutes ago' } },
            { key: 'post_text', label: 'Post Text', type: 'rich-text', value: { text: 'The Baro River overflowed yesterday, devastating Gambella communities. Hundreds are dead, thousands injured, and tens of thousands displaced. Please share this widely to ensure authorities respond urgently.' } },
            { key: 'post_image', label: 'Post Photo', type: 'image', value: { text: '' } },
            { key: 'reactions', label: 'Reactions', type: 'text', value: { text: 'You and 99 others' } },
            { key: 'comment_count', label: 'Comments', type: 'text', value: { text: '100 Comments' } },
            { key: 'url', label: 'URL', type: 'text', value: { text: 'https://www.facebook.com/post33/' } },
        ],
    },
    {
        name: 'Challenge 4',
        slug: 'challenge-4',
        sortOrder: 3,
        metadata: { cardType: 'breaking-news', challengeNumber: '4A', challengeLabel: 'Challenge 4', difficulty: 2 },
        elements: [
            { key: 'channel', label: 'Channel', type: 'text', value: { text: 'Global 24' } },
            { key: 'time', label: 'Time', type: 'text', value: { text: '12:00' } },
            { key: 'news_image', label: 'News Photo', type: 'image', value: { text: '' } },
            { key: 'headline', label: 'Headline', type: 'text', value: { text: 'Emergency in Afar Region' } },
            { key: 'ticker', label: 'News Ticker', type: 'text', value: { text: 'Relief operations underway... Authorities urge caution for aftershocks... Immediate assistance needed' } },
            { key: 'summary', label: 'Summary', type: 'rich-text', value: { text: 'An earthquake of magnitude 6.8 struck the Afar region yesterday, resulting in 1,800 deaths, 7,000 injuries, and the displacement of 50,000 individuals. Emergency response teams are on-site, and the situation remains critical.' } },
            { key: 'label', label: 'Label', type: 'text', value: { text: 'Breaking News Summary' } },
        ],
    },
    {
        name: 'Challenge 5',
        slug: 'challenge-5',
        sortOrder: 4,
        metadata: { cardType: 'weekly-report', challengeNumber: '5A', challengeLabel: 'Challenge 5', difficulty: 2 },
        elements: [
            { key: 'agency', label: 'Agency', type: 'text', value: { text: 'National Agricultural Agency' } },
            { key: 'report_title', label: 'Report Title', type: 'text', value: { text: 'WEEKLY REPORT' } },
            { key: 'map_image', label: 'Map Image', type: 'image', value: { text: '' } },
            { key: 'bullets', label: 'Bullet Points', type: 'json', value: { items: ['A large swarm of locusts was spotted in Sudan.', 'The swarm\'s size and migration path remain unclear.', 'Potential agricultural damage has not yet been assessed.', 'Local farmers are reportedly concerned about possible crop losses.'] } },
        ],
    },
    {
        name: 'Challenge 6',
        slug: 'challenge-6',
        sortOrder: 5,
        metadata: { cardType: 'press-release', challengeNumber: '6A', challengeLabel: 'Challenge 6', difficulty: 3 },
        elements: [
            { key: 'issuer', label: 'Issuer', type: 'text', value: { text: 'Oromia Authorities' } },
            { key: 'title', label: 'Title', type: 'text', value: { text: 'PRESS RELEASE SUMMARY' } },
            { key: 'map_image', label: 'Map Image', type: 'image', value: { text: '' } },
            { key: 'body', label: 'Body', type: 'rich-text', value: { text: 'The Oromia Regional Authority has officially Disproven reports of lava eruption at Mount Fentale over the past few days. In a statement issued on Monday, officials confirmed that no volcanic activity has been recorded, describing the circulating rumors as baseless and unverified.\n\nAuthorities have reassured the public that the situation remains stable and that monitoring systems are in place to detect any potential volcanic activity. Residents and media outlets are urged to rely only on official sources for accurate information.' } },
        ],
    },
    {
        name: 'Challenge 7',
        slug: 'challenge-7',
        sortOrder: 6,
        metadata: { cardType: 'hotline-call', challengeNumber: '7A', challengeLabel: 'Challenge 7', difficulty: 4 },
        elements: [
            { key: 'caller_name', label: 'Caller', type: 'text', value: { text: 'Bezawilt' } },
            { key: 'caller_status', label: 'Status', type: 'text', value: { text: 'Calling...' } },
            { key: 'phone', label: 'Phone', type: 'text', value: { text: '+1-123-51231-23' } },
            { key: 'avatar_image', label: 'Avatar Image', type: 'image', value: { text: '' } },
            { key: 'caller_title', label: 'Caller Title', type: 'text', value: { text: 'Community Health Worker' } },
            { key: 'caller_location', label: 'Location', type: 'text', value: { text: 'Dire Dawa' } },
            { key: 'agency', label: 'Agency', type: 'text', value: { text: 'EPHI Call Centre' } },
            { key: 'agent_name', label: 'Agent', type: 'text', value: { text: 'Tigist' } },
            { key: 'transcript', label: 'Transcript', type: 'rich-text', value: { text: '"Several schools in remote villages were closed after many cases of fever and rash were reported among students over the past two weeks. I have already informed the State Ministry of Health, but the number of cases continues to rise."' } },
        ],
    },
    {
        name: 'Challenge 8',
        slug: 'challenge-8',
        sortOrder: 7,
        metadata: { cardType: 'email-alert', challengeNumber: '8A', challengeLabel: 'Challenge 8', difficulty: 4 },
        elements: [
            { key: 'subject', label: 'Subject', type: 'text', value: { text: 'Confirmation of Measles Cases' } },
            { key: 'from_name', label: 'From', type: 'text', value: { text: 'Dr. Mesfin' } },
            { key: 'from_email', label: 'Email', type: 'text', value: { text: 'mesfin@nphl.gov.et' } },
            { key: 'body', label: 'Email Body', type: 'rich-text', value: { text: 'Dear EOC Team,\n\nSamples collected from schools across Dire Dawa, were confirmed in the lab today as measles. Case management efforts are going. We also started RCCE campaigns in the affected areas.\n\nAfter conducting active surveillance in other schools in the region, new cases are being reported from 40% of the Dir Dawa primary schools, the attack rate is 75% higher than same period last year noting that our budget is very limited, and may need your support.' } },
            { key: 'signature_name', label: 'Signature Name', type: 'text', value: { text: 'Dr. Mesfin' } },
            { key: 'signature_title', label: 'Signature Title', type: 'text', value: { text: 'Disease Surveillance, Dire Dawa' } },
            { key: 'signature_email', label: 'Signature Email', type: 'text', value: { text: 'mesfin@nphl.gov.et' } },
            { key: 'signature_phone', label: 'Signature Phone', type: 'text', value: { text: '+251 11 123 4567' } },
        ],
    },
    {
        name: 'Challenge 9',
        slug: 'challenge-9',
        sortOrder: 8,
        metadata: { cardType: 'chat-update', challengeNumber: '9A', challengeLabel: 'Challenge 9', difficulty: 4 },
        elements: [
            { key: 'contact_name', label: 'Contact', type: 'text', value: { text: 'Senait' } },
            { key: 'contact_phone', label: 'Phone', type: 'text', value: { text: '+254  4567 8908' } },
            { key: 'messages', label: 'Messages', type: 'json', value: { items: [{ sender: 'them', text: 'Hellow, Bos' }, { sender: 'them', text: 'Congrats for the position, you will be the best IM ever' }, { sender: 'me', text: 'Thanks Dear, and hopefully we will make a good team. here is the updates' }, { sender: 'them', text: 'Hey Dear, Just got an update from the Malaria Program in Gambella. They\'re saying in the IDSR monthly bulletin we should expect a surge in malaria cases this month. The rainy season has started, so conditions are perfect for an increase.' }, { sender: 'me', text: 'Understood. We need to ramp up preventive measures and be ready for more cases.' }] } },
        ],
    },
    {
        name: 'Challenge 10',
        slug: 'challenge-10',
        sortOrder: 9,
        metadata: { cardType: 'bulletin', challengeNumber: '10A', challengeLabel: 'Challenge 10', difficulty: 4 },
        elements: [
            { key: 'authority', label: 'Authority', type: 'text', value: { text: 'Gambella Public Health Authorities' } },
            { key: 'bulletin_title', label: 'Bulletin Title', type: 'text', value: { text: 'IDSR MONTHLY BULLETIN' } },
            { key: 'map_image', label: 'Map Image', type: 'image', value: { text: '' } },
            { key: 'summary', label: 'Summary', type: 'rich-text', value: { text: 'The IDSR monthly bulletin for this Month indicates a notable 30% increase in the malaria attack rate in Gambella compared to last month. This increase has resulted in a reported total of 1,500 suspected malaria cases.' } },
            { key: 'key_data', label: 'Key Data', type: 'json', value: { items: [{ label: 'Suspected Cases', value: '1,500' }, { label: 'Attack Rate Increase', value: '30% compared to the previous month' }] } },
            { key: 'footer', label: 'Footer', type: 'text', value: { text: 'End of Bulletin.' } },
        ],
    },
];

/* ---------- Main ---------- */

async function main() {
    const existingProject = await prisma.gameProject.findUnique({
        where: { slug: PROJECT_SLUG },
        select: { id: true },
    });

    const fallbackProject = existingProject
        ? null
        : await prisma.gameProject.findFirst({
            orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
            select: { id: true, slug: true },
        });

    const project = fallbackProject
        ? await prisma.gameProject.update({
            where: { id: fallbackProject.id },
            data: {
                name: 'Signal Management Card Game',
                slug: PROJECT_SLUG,
                description: 'A card-based training game for public health emergency signal management.',
                settingsJson: s({ defaultCardSize: { width: 750, height: 1050 }, editingMode: 'in-place' }),
            },
        })
        : await prisma.gameProject.upsert({
            where: { slug: PROJECT_SLUG },
            update: {
                name: 'Signal Management Card Game',
                description: 'A card-based training game for public health emergency signal management.',
                settingsJson: s({ defaultCardSize: { width: 750, height: 1050 }, editingMode: 'in-place' }),
            },
            create: {
                name: 'Signal Management Card Game',
                slug: PROJECT_SLUG,
                description: 'A card-based training game for public health emergency signal management.',
                settingsJson: s({ defaultCardSize: { width: 750, height: 1050 }, editingMode: 'in-place' }),
            },
        });

    const deck = await prisma.deck.upsert({
        where: { projectId_slug: { projectId: project.id, slug: 'signal-challenges' } },
        update: {
            name: 'Default Set',
            description: 'The default challenge card set with the 10 seeded scenarios.',
        },
        create: {
            projectId: project.id,
            name: 'Default Set',
            slug: 'signal-challenges',
            description: 'The default challenge card set with the 10 seeded scenarios.',
            themeJson: s({ frameColor: '#1f6f78', textColor: '#111827', accentColor: '#f59e0b' }),
        },
    });

    await prisma.deck.upsert({
        where: { projectId_slug: { projectId: project.id, slug: 'my-saved-sets' } },
        update: {
            name: 'My Saved Sets',
            description: 'Your saved custom cards and sets appear here.',
        },
        create: {
            projectId: project.id,
            name: 'My Saved Sets',
            slug: 'my-saved-sets',
            description: 'Your saved custom cards and sets appear here.',
            themeJson: s({ frameColor: '#1f6f78', textColor: '#111827', accentColor: '#f59e0b' }),
        },
    });

    for (const def of challengeCards) {
        const existing = await prisma.card.findFirst({
            where: { deckId: deck.id, slug: def.slug },
        });

        if (existing) {
            console.log(`  skip ${def.name} (exists)`);
            continue;
        }

        await prisma.card.create({
            data: {
                deckId: deck.id,
                name: def.name,
                slug: def.slug,
                status: 'challenge',
                sortOrder: def.sortOrder,
                metadataJson: s(def.metadata),
                faces: {
                    create: [
                        {
                            side: 'front',
                            elements: {
                                create: def.elements.map((el, i) => ({
                                    key: el.key,
                                    label: el.label,
                                    type: el.type,
                                    valueJson: s(el.value),
                                    sortOrder: i,
                                })),
                            },
                        },
                    ],
                },
                revisions: {
                    create: {
                        version: 1,
                        snapshotJson: s({ source: 'pdf-seed', challengeNumber: def.metadata.challengeNumber }),
                        changeNote: 'Seeded from the signal management card design PDF',
                    },
                },
            },
        });

        console.log(`  created ${def.name}`);
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
