import { db } from "~/server/db";
import GameCard from "./games-list";
export default async function Games() {
  const response = await db.game.findMany({
    include: { homeTeam: true, awayTeam: true },
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 p-4">
      {!response.length && <div>No games</div>}
      {response.map(({ id, homeTeam, awayTeam, createdAt }) => (
        <GameCard
          key={id}
          id={id}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          createdAt={createdAt}
        />
      ))}
    </div>
  );
}
