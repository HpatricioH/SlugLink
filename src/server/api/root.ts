import { createTRPCRouter } from "~/server/api/trpc";
import { linksRouter } from "~/server/api/routers/links";
import { qrcodeRouter } from "./routers/qrcode";


export const appRouter = createTRPCRouter({
  link: linksRouter,
  qrCode: qrcodeRouter
});

export type AppRouter = typeof appRouter;
