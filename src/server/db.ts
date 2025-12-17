import "server-only";
import { PrismaClient } from "./../../prisma/prisma/client";
import { PrismaLibSql } from '@prisma/adapter-libsql'

import { env } from "~/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}; 

const adapter = new PrismaLibSql({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_TOKEN ?? undefined,
});

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
