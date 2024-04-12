import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc"

const CreateQRCodeSchema = z.object({
  url: z.string().url(),
  bgColor: z.string(),
  fgColor: z.string(),
  margin: z.number()
})

const GetQRCodeSchema = z.object({
  id: z.number()
})

const UpdateQRCodeSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  bgColor: z.string(),
  fgColor: z.string(),
  margin: z.number()
})

const DeleteQRCodeSchema = z.object({
  id: z.number()
})

export const qrcodeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
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
          user: { connect: { id: ctx.session.user.id } }
        }
      })
    }),

  // Get QR Codes 
  getQRCodes: protectedProcedure.query(({ ctx }) => {
    return ctx.db.qRCode.findMany({
      where: {
        user: { id: ctx.session.user.id }
      }
    })
  }),

  // Get One QR Code
  getQRCode: protectedProcedure
    .input(GetQRCodeSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.qRCode.findUnique({
        where: { id: input.id }
      })
    }),

  // Edit QR Codes 
  updateQRCode: protectedProcedure
    .input(UpdateQRCodeSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.qRCode.update({
        where: { id: input.id },
        data: {
          ...input,
          userId: ctx.session.user.id
        }
      })
    }),

  // Delete QR Codes 
  deleteQRCode: protectedProcedure
    .input(DeleteQRCodeSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.qRCode.delete({
        where: { id: input.id }
      })
    })
})