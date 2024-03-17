import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const CreateLinksSchema = z.object({
  url: z.string(),
  slug: z.string(),
  description: z.string(),
})

const UpdateLinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  description: z.string()
})

const SingleLinkSchema = z.object({
  id: z.number(),
  url: z.string(),
  slug: z.string(),
  description: z.string()
})

export const linksRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `${input.text}`,
      };
    }),

  // Create Link 
  create: protectedProcedure
    .input(CreateLinksSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.create({
        data: {
          ...input,
          createdBy: { connect: { id: ctx.session.user.id } }
        }
      })
    }),

  // Get Links 
  getLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      where: {
        createdBy: { id: ctx.session.user.id }
      }
    })
  }),

  // Edit Links 
  updateLink: protectedProcedure
    .input(UpdateLinkSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.update({
        where: { id: input.id },
        data: {
          ...input,
          creatorId: ctx.session.user.id
        }
      })
    }),

  // Delete Links
  deleteLink: protectedProcedure
    .input(SingleLinkSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.delete({
        where: { id: input.id }
      })
    }),
})