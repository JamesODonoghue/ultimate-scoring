"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

export async function deleteGame({ id }: { id: string }) {
  await db.game.delete({ where: { id } });
  revalidatePath("/games");
}
