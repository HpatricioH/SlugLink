# Turso & Prisma

To create all the tables and run the Prisma client, please follow these steps:

1. Migrate the changes from the Prisma Schema (make sure you have the same Prisma schema as the original repository):

```shell
npx prisma migrate dev --name init
```

2. Once migrated, log in to Turso using the CLI:

```shell
turso auth login
```

3. Once logged in, check the database connection:

```shell
turso db slug-link
```

4. Then run the migration into the SQLite Turso DB:

```shell
turso db shell slug-link < ./prisma/migrations/20230922132717_init/migration.sql
```

Replace the migration number `/<replace this with your migration number>_init/migration.sql` with the corresponding migration number in your Prisma folder.
