"use client";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type Prisma } from "@prisma/client";

type GameWithTeamsAndPoints = Prisma.GameGetPayload<{
  include: { homeTeam: true; awayTeam: true; points: true };
}>;
export default function GameStarted({
  homeTeam: { name: homeTeamName },
  awayTeam: { name: awayTeamName },
  homeTeamScore,
  awayTeamScore,
}: GameWithTeamsAndPoints) {
  return (
    <div className=" mx-auto flex max-w-xl flex-col gap-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            <div className="flex gap-4">
              <div>{homeTeamName}</div>
              <div>{homeTeamScore}</div>
            </div>
            <div className="flex gap-4">
              <div>{awayTeamName}</div>
              <div>{awayTeamScore}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <CardTitle>{homeTeamName}</CardTitle>
            <Button>Add Player</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
