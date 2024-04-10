import { db } from "~/server/db";
import GameDetail from "./game-detail";
import GameStarted from "./game-started";
export default async function Game({ params }: { params: { slug: string } }) {
  const response = await db.game.findFirst({
    where: { id: parseInt(params.slug) },
    include: { homeTeam: true, awayTeam: true, points: true },
  });
  if (!response) {
    return <div>No data found</div>;
  }
  if (response.status === "READY") {
    return <GameDetail {...response} />;
  }
  if (response.status === "STARTED") {
    return <GameStarted {...response} />;
  }
}
