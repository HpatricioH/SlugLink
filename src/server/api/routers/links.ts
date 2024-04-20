import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const CreateLinksSchema = z.object({
  url: z.string().url(),
  slug: z.string(),
  description: z.string(),
})

const UpdateLinkSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  slug: z.string(),
  description: z.string()
})

const GetLinkSchema = z.object({
  id: z.number(),
})

const GetLinkRedirectSchema = z.object({
  slug: z.string(),
})

const DeleteLinkSchema = z.object({
  id: z.number(),
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

  // Get one Link 
  getLink: protectedProcedure
    .input(GetLinkSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.link.findUnique({
        where: { id: input.id }
      })
    }),

  // Get One Link for Redirect function 
  getRedirectLink: protectedProcedure
    .input(GetLinkRedirectSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.link.findUnique({
        where: { slug: input.slug }
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
    .input(DeleteLinkSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.delete({
        where: { id: input.id }
      })
    }),
})