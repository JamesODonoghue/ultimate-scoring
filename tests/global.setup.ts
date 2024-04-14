/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { test as setup } from "@playwright/test";
import { db } from "~/server/db";
import type Clerk from "@clerk/clerk-js";

setup("create new database", async () => {
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

type ClerkType = typeof Clerk;

const authFile = "state.json";

setup("Setup Auth", async ({ page }) => {
  await page.goto("/");
  // await expect(page.getByText(/ulti score/i)).toBeVisible();

  // some quick check to see if the dom has loaded
  // const logo = page.getByRole("img", { name: "Logo" });
  // await expect(logo).toBeVisible();

  // ENV variables generated using The Clerk Dashboard
  const data = {
    userId: process.env.PLAYWRIGHT_E2E_USER_ID ?? "",
    loginPayload: {
      strategy: "password",
      identifier: process.env.PLAYWRIGHT_E2E_USER_EMAIL ?? "",
      password: process.env.PLAYWRIGHT_E2E_USER_PASSWORD ?? "",
    },
  };

  //here is where the magic happens
  const result = await page.evaluate(async (data) => {
    // wait function as promise
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const wdw = window as Window & typeof globalThis & { Clerk: ClerkType };

    /** clear the cookies */
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    const clerkIsReady = (
      window: Window & typeof globalThis & { Clerk: ClerkType },
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return window.Clerk.isReady();
    };

    while (!clerkIsReady(wdw)) {
      await wait(100);
    }

    /** if the session is still valid just return true */
    if (
      wdw.Clerk.session?.expireAt &&
      wdw.Clerk.session.expireAt > new Date()
    ) {
      console.log("session is still valid");
      return true;
    }

    /** if its a different user currently logged in sign out */
    if (wdw.Clerk.user?.id !== data.userId) {
      await wdw.Clerk.signOut();
    }

    /**
     * otherwise signin
     */
    const res = await wdw.Clerk.client?.signIn.create(data.loginPayload);

    if (!res) {
      return false;
    }

    /** set the session as active */
    await wdw.Clerk.setActive({
      session: res.createdSessionId,
    });

    return true;
  }, data);

  if (!result) {
    throw new Error("Failed to sign in");
  }

  const pageContext = page.context();

  let cookies = await pageContext.cookies();

  // clerk polls the session cookie, so we have to set a wait
  while (!cookies.some((c) => c.name === "__session")) {
    cookies = await pageContext.cookies();
  }

  // store the cookies in the state.json
  await pageContext.storageState({ path: authFile });
});
