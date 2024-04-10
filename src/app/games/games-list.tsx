"use client";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { deleteGame } from "./_actions";

export default function GameCard({
  id,
  homeTeam,
  awayTeam,
  createdAt,
}: {
  id: number;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
  createdAt: Date;
}) {
  async function handleClickDelete(id: number) {
    await deleteGame({ id });
  }
  return (
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
      <CardFooter className="flex w-full flex-col gap-4">
        <Button
          className="w-full"
          onClick={() => handleClickDelete(id)}
          variant="outline"
        >
          Delete
        </Button>

        <Link
          className={`${buttonVariants({ variant: "outline" })} w-full`}
          href={`games/${id}/advanced`}
        >
          View advanced
        </Link>

        <Link
          className={`${buttonVariants({ variant: "default" })} w-full`}
          href={`games/${id}/simple`}
        >
          View simple
        </Link>
      </CardFooter>
    </Card>
  );
}
