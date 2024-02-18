import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        homeTeamId: z.string(),
        awayTeamId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { homeTeamId, awayTeamId } }) => {
      const game = await ctx.db.game.create({
        data: { homeTeamId, awayTeamId, createdBy: ctx.auth.userId },
      });
      return game;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany();
  }),
});
