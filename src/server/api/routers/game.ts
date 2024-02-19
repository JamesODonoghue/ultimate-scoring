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
    console.log("get all");
    return ctx.db.game.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input: { id } }) =>
      ctx.db.game.findUnique({
        where: { id },
        include: { homeTeam: true, awayTeam: true },
      }),
    ),
});
