import { test as setup } from "@playwright/test";
import { db } from "~/server/db";

setup("create new database", async ({}) => {
  console.log("seeding database...");
  await db.game.deleteMany();
});
