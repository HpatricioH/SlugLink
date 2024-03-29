import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

import { env } from "~/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const initializePrisma = (): PrismaClient => {
  const libsql = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
  });

  const adapter = new PrismaLibSQL(libsql);
  return new PrismaClient({adapter});
}

export const db = globalForPrisma.prisma ?? initializePrisma();
  

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
