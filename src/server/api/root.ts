import { createTRPCRouter } from "~/server/api/trpc";
import { linksRouter } from "~/server/api/routers/links";
import { qrcodeRouter } from "./routers/qrcode";
import { userRouter } from "./routers/user";


export const appRouter = createTRPCRouter({
  link: linksRouter,
  qrCode: qrcodeRouter, 
  user: userRouter
});

export type AppRouter = typeof appRouter;
