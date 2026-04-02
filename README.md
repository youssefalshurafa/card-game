# Card Game Generator

Next.js 16 starter for a card game generator where card content is edited directly inside the card canvas.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run start
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Database

The project now includes Prisma with a local SQLite database for development.

- Schema: prisma/schema.prisma
- Seed script: prisma/seed.js
- Prisma client helper: lib/prisma.js
- Local database file: prisma/dev.db

The initial schema is designed around editable card composition:

- Game projects own decks and assets.
- Decks own cards and templates.
- Templates define front and back faces plus editable element slots.
- Cards store their own face data, positioned elements, and revisions.

## Current Scope

The database bootstrap is complete for local development:

- Prisma packages are installed.
- The initial migration has been created and applied.
- Seed data creates a starter project, deck, template, and sample card.

## Implementation Roadmap

1. Build server-side data access for projects, decks, cards, templates, and assets using Prisma.
2. Add route handlers or server actions for create, update, duplicate, delete, reorder, and publish flows.
3. Design the card editor surface so text, images, and rich content can be edited in place on the card.
4. Implement an element system for text, image, icon, stat, badge, and rich-text blocks with drag, resize, and layering.
5. Add template editing so users can define reusable front and back layouts for an entire deck.
6. Add asset management for uploaded artwork, card backs, icons, and frame textures.
7. Add validation rules for required fields, layout bounds, deck rules, and export readiness.
8. Add autosave and revision history using the CardRevision model.
9. Add export generation for printable cards, PNG previews, and deck-level bundles.
10. Add authentication and project ownership once multi-user workflows are needed.

## Notes

- The homepage currently remains the starter screen in app/page.jsx.
- If port 3000 is already occupied, the dev server will automatically move to the next available port.
