# Deployment Checklist

## Develop Now

1. Keep Prisma as the only way the app touches the database.
2. Avoid raw SQL unless absolutely necessary.
3. If raw SQL is needed later, avoid SQLite-specific syntax.
4. Keep schema changes going through Prisma migrations, not manual DB edits.
5. Use consistent IDs and relations exactly as Prisma defines them.
6. Keep testing core flows against real persisted data, not only mock state.

## Avoid Local-Only Traps

1. Do not build features that assume the database is a single local file forever.
2. Do not rely on filesystem persistence for critical app data.
3. Treat `public/uploads` as temporary for development, not final production storage.
4. Avoid workflows that depend on one machine owning the database file.
5. Do not assume only one app instance will ever exist.

## Before Switching To Postgres

1. Reduce frequent schema churn first.
2. Review all fields for types that may behave differently across databases.
3. Check uniqueness constraints and indexes carefully.
4. Make sure timestamps, defaults, and nullable fields are intentional.
5. Remove any SQLite-specific assumptions in code or scripts.
6. Make sure seed data can recreate a usable environment cleanly.

## When Ready To Switch

1. Provision a Postgres database.
2. Change the Prisma datasource from `sqlite` to `postgresql`.
3. Update `DATABASE_URL`.
4. Regenerate the Prisma client.
5. Create and run the proper migration flow for Postgres.
6. Import or reseed data.
7. Test create, edit, delete, copy, and upload flows on the new database.
8. Run staging before production.

## Production Readiness

1. Use `prisma migrate deploy`, not `prisma migrate dev`.
2. Add automated backups for the production database.
3. Move uploads to object storage, not local disk.
4. Store secrets in deployment environment variables, not local-only files.
5. Test one full deploy from scratch on a fresh environment.
6. Verify rollback and recovery steps before launch.

## Rule Of Thumb

1. SQLite is fine while building.
2. Postgres should happen before real production use.
3. File uploads and database strategy should be upgraded together, not separately.

## Safe Migration Path

1. Finish the current feature batch before changing databases.
2. Make sure the Prisma schema in `prisma/schema.prisma` is the source of truth.
3. Stop adding any hand-written SQL or SQLite-specific behavior before the switch.
4. Back up the current SQLite file `prisma/dev.db` before making any changes.
5. Export or preserve any important user-created data from SQLite.
6. Provision a Postgres database for staging first, not production first.
7. Change the Prisma datasource provider from `sqlite` to `postgresql`.
8. Update `DATABASE_URL` to the Postgres connection string.
9. Run `prisma generate` to regenerate the client for Postgres.
10. Create the Postgres schema from Prisma instead of trying to reuse the old SQLite SQL file directly.
11. Use Prisma migrations for Postgres going forward; do not assume the existing SQLite migration SQL can be applied as-is.
12. Reseed the database with `prisma/seed.js` if seeded data is enough.
13. If existing user data matters, write a one-time migration script that reads from SQLite and inserts through Prisma into Postgres.
14. Test the full app on Postgres in staging: create sets, rename/delete sets, create cards, edit cards, save to default set, save copies, uploads.
15. Switch file uploads off local disk before production if the deployment will be multi-instance or serverless.
16. For deployment, use `prisma migrate deploy` instead of `prisma migrate dev`.
17. Take a fresh backup before the production cutover.
18. Cut production over only after staging passes with the Postgres database.
19. Keep the old SQLite file until production has been stable long enough to roll back if needed.

## Project-Specific Notes

1. This repo currently uses Prisma model APIs in app code, which makes the database switch safer.
2. The existing file `prisma/migrations/20260402115902_init_card_generator/migration.sql` is SQLite-specific migration output.
3. The safest path is to treat that file as historical SQLite migration output, not as reusable Postgres SQL.
4. Current uploads are stored under `public/uploads`, so database migration and file-storage migration should be planned together before launch.
