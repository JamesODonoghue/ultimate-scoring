import { test as setup } from "@playwright/test";
import { db } from "~/server/db";

setup("create new database", async ({}) => {
  console.log("seeding database...");
  await db.pointPlayer.deleteMany();
  await db.player.deleteMany();
  await db.point.deleteMany();
  await db.game.deleteMany();
  await db.team.deleteMany();
  const { id } = await db.team.create({
    data: {
      name: "Alameda Taurus",
    },
  });
  await db.team.create({
    data: {
      name: "Seawolves",
    },
  });
  await db.player.createMany({
    data: [
      { name: "Grand Shaddon", teamId: id },
      { name: "Arlo Henrikson", teamId: id },
      { name: "Beckett Yap", teamId: id },
      { name: "Cameron Gambino", teamId: id },
      { name: "Charmain Tran", teamId: id },
      { name: "Christopher Gordon", teamId: id },
      { name: "Hailey Jordan", teamId: id },
      { name: "Lucas Strosahl-Ortega", teamId: id },
      { name: "Miles Bullock-Humphrey", teamId: id },
    ],
  });
});
