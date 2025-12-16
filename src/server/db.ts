import { PrismaClient } from "../../prisma/prisma/client";
import { PrismaLibSql } from '@prisma/adapter-libsql'

import { env } from "~/env";

const DATABASE_URL = env.DATABASE_URL;
const DATABASE_TOKEN =env.DATABASE_TOKEN || undefined;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}; 

const adapter = new PrismaLibSql({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN
})

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
