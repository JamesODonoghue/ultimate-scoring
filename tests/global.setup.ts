import { test as setup } from "@playwright/test";
import { db } from "~/server/db";

setup("create new database", async ({}) => {
  console.log("seeding database...");
  await db.game.deleteMany();
  await db.team.deleteMany();
  await db.team.createMany({
    data: [
      {
        name: "Alameda Taurus",
      },
      { name: "Seawolves" },
    ],
  });
});
