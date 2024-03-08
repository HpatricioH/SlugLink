import { createTRPCRouter } from "~/server/api/trpc";
import { linksRouter } from "~/server/api/routers/links";


export const appRouter = createTRPCRouter({
  link: linksRouter,
});

export type AppRouter = typeof appRouter;
