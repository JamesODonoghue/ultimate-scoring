"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../../server/db";

export async function incrementHomeTeamScore({ id }: { id: number }) {
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
export async function decrementHomeTeamScore({ id }: { id: number }) {
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

export async function incrementAwayTeamScore({ id }: { id: number }) {
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
export async function decrementAwayTeamScore({ id }: { id: number }) {
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

export async function startGame(formState: null | void, formData: FormData) {
  const startingOffense = formData.get("startingOffense") as string;
  const id = formData.get("id") as string;
  await db.game.update({
    where: { id: parseInt(id) },
    data: { status: "STARTED", startingOffense },
  });
  await db.point.create({
    data: { gameId: parseInt(id) },
  });
  revalidatePath("/game");
}

export async function createPlayer(formState: null | void, formData: FormData) {
  const name = formData.get("playerName") as string;
  const teamId = parseInt(formData.get("teamId") as string);
  const pointId = parseInt(formData.get("pointId") as string);
  const { id: playerId } = await db.player.create({
    data: { name, teamId },
  });
  await db.pointPlayer.create({
    data: { pointId, playerId },
  });
  revalidatePath("/game");
}

export async function deletePlayer(id: number) {
  await db.player.delete({
    where: { id },
  });
  revalidatePath("/player");
}

export async function startPoint(formState: null | void, formData: FormData) {
  const id = parseInt(formData.get("pointId") as string);
  await db.point.update({
    where: { id },
    data: { status: "STARTED" },
  });
  revalidatePath("/player");
}

export async function createPointPlayer({
  playerId,
  pointId,
}: {
  playerId: number;
  pointId: number;
}) {
  await db.pointPlayer.create({
    data: { playerId, pointId },
  });
  revalidatePath("/player");
}

export async function deletePointPlayer({ id }: { id: number }) {
  await db.pointPlayer.delete({
    where: { id },
  });
  revalidatePath("/player");
}
