"use server";
import { db } from "../../../server/db";

export async function incrementHomeTeamScore({ id }: { id: string }) {
  const response = await db.game.findUnique({ where: { id } });
  if (!response) {
    return new Error("Not found");
  }
  const { homeTeamScore } = response;
  await db.game.update({
    where: { id },
    data: { homeTeamScore: homeTeamScore + 1 },
  });
}
export async function decrementHomeTeamScore({ id }: { id: string }) {
  const response = await db.game.findUnique({ where: { id } });
  if (!response) {
    return new Error("Not found");
  }
  const { homeTeamScore } = response;
  await db.game.update({
    where: { id },
    data: { homeTeamScore: homeTeamScore - 1 },
  });
}

export async function incrementAwayTeamScore({ id }: { id: string }) {
  const response = await db.game.findUnique({ where: { id } });
  if (!response) {
    return new Error("Not found");
  }
  const { awayTeamScore } = response;
  await db.game.update({
    where: { id },
    data: { awayTeamScore: awayTeamScore + 1 },
  });
}
export async function decrementAwayTeamScore({ id }: { id: string }) {
  const response = await db.game.findUnique({ where: { id } });
  if (!response) {
    return new Error("Not found");
  }
  const { awayTeamScore } = response;
  await db.game.update({
    where: { id },
    data: { awayTeamScore: awayTeamScore - 1 },
  });
}
