"use server";

import { db } from "~/server/db";

export async function createTeam(formData: FormData) {
  const teamName = formData.get("teamName") as string;
  if (!teamName) {
    throw new Error("Team name must be defined");
  }
  const response = await db.team.create({
    data: { name: teamName },
  });
  return response;
}
