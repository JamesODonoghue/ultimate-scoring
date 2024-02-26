"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import {
  decrementAwayTeamScore,
  decrementHomeTeamScore,
  incrementAwayTeamScore,
  incrementHomeTeamScore,
} from "~/app/games/[slug]/_actions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ScoreCounter({
  id,
  homeTeamScore,
  awayTeamScore,
  homeTeam,
  awayTeam,
}: {
  id: string;
  homeTeamScore: number;
  awayTeamScore: number;
  homeTeam: string;
  awayTeam: string;
}) {
  const [localHomeTeamScore, setHomeTeamScore] =
    useState<number>(homeTeamScore);
  const [localAwayTeamScore, setAwayTeamScore] =
    useState<number>(awayTeamScore);
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{homeTeam}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-12 text-9xl font-bold">
            <Button
              onClick={async () => {
                setHomeTeamScore(localHomeTeamScore - 1);
                await decrementHomeTeamScore({ id });
              }}
              variant="outline"
              size="icon"
            >
              <Minus />
            </Button>
            <div>{localHomeTeamScore}</div>
            <Button
              onClick={async () => {
                setHomeTeamScore(localHomeTeamScore + 1);
                await incrementHomeTeamScore({ id });
              }}
              variant="outline"
              size="icon"
            >
              <Plus />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{awayTeam}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-12 text-9xl font-bold">
            <Button
              variant="outline"
              size="icon"
              onClick={async () => {
                setAwayTeamScore(localAwayTeamScore - 1);
                await decrementAwayTeamScore({ id });
              }}
            >
              <Minus />
            </Button>
            <div>{localAwayTeamScore}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={async () => {
                setAwayTeamScore(localAwayTeamScore + 1);
                await incrementAwayTeamScore({ id });
              }}
            >
              <Plus />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
