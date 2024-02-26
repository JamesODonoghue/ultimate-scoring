import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { db } from "~/server/db";
export default async function Games() {
  const response = await db.game.findMany({
    include: { homeTeam: true, awayTeam: true },
  });
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 p-4">
      {response.map(({ id, homeTeam, awayTeam, createdAt }) => (
        <Link href={`games/${id}`} key={id}>
          <Card>
            <CardHeader>
              <CardTitle>
                {homeTeam.name} vs {awayTeam.name}
              </CardTitle>
              <CardDescription>
                {createdAt.toLocaleString("en-us", {
                  timeZone: "America/Los_Angeles",
                })}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
