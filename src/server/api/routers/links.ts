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

export const linksRouter = createTRPCRouter({
  hello: publicProcedure 
    .input(z.object({ text: z.string() }))
    .query(({ input}) => {
      return {
        greeting: `${input.text}`,
      };
    }),

  // Create Link 
  create: protectedProcedure 
    .input( CreateLinksSchema )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.create({
        data: {
          ...input,
          createdBy: { connect: {id: ctx.session.user.id }}
        }
      })
    })

})