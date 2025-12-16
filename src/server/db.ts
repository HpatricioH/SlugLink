import { PrismaClient } from "../../prisma/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from "@libsql/client";

import { env } from "~/env";

const DATABASE_URL = String(env.DATABASE_URL);
const DATABASE_TOKEN: string | undefined =
  env.DATABASE_TOKEN ? String(env.DATABASE_TOKEN) : undefined;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const libsql = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN,
});

const adapter = new PrismaBetterSqlite3(libsql);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
