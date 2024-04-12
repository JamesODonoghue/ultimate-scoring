import NewGameForm from "./new-game-form";
import { db } from "~/server/db";
export default async function NewGame() {
  const response = await db.team.findMany();
  return <NewGameForm teams={response} />;
}
