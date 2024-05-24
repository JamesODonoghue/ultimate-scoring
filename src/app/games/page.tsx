import { db } from "~/server/db";
import GameCard from "./games-list";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
export const dynamic = 'force-dynamic'
export default async function Games() {
  const games = await db.game.findMany({
    include: { homeTeam: true, awayTeam: true },
    orderBy: [{ createdAt: "desc" }],
  });

  const users = await clerkClient.users.getUserList();
  const gamesWithUsers = games.map((game) => {
    const user = users.find((user) => user.id === game.createdBy);
    if (!user) {
      return { ...game, createdBy: "" };
    }
    return {
      ...game,
      createdBy: user.lastName ? `${user.firstName} ${user.lastName}` : ``,
    };
  });
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 p-4">
      <div className="flex justify-end">
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/games/new"
        >
          Create Game
        </Link>
      </div>
      {!gamesWithUsers.length && (
        <div className="flex justify-center">No games created</div>
      )}
      {gamesWithUsers.map(
        ({ id, homeTeam, awayTeam, createdAt, createdBy }) => (
          <GameCard
            key={id}
            id={id}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            createdAt={createdAt}
            createdBy={createdBy}
          />
        ),
      )}
    </div>
  );
}
