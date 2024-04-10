import {z} from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc"

const CreateQRCodeSchema = z.object({
  url: z.string(),
  bgColor: z.string(),
  fgColor: z.string(),
  margin: z.number()
})

export const qrcodeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string()}))
    .query(({ input }) => {
      return {
        greeting: `${input.text}`
      }
    }),

    // Create QR Code
    create: protectedProcedure
      .input(CreateQRCodeSchema)
      .mutation(async ({ ctx, input }) => {
        return ctx.db.qRCode.create({
          data: {
            ...input, 
            user: { connect: { id: ctx.session.user.id }}
          }
        })
      }),

      // Get Links 
      getQRCodes: protectedProcedure.query(({ ctx }) => {
        return ctx.db.qRCode.findMany({
          where: {
            user: { id: ctx.session.user.id }
          }
        })
      }), 

      
})