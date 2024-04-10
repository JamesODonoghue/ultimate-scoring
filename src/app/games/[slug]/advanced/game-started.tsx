"use client";
import { Minus, Plus } from "lucide-react";
import { Button, buttonVariants } from "../../../../components/ui/button";
import { useState } from "react";
import {
  decrementAwayTeamScore,
  decrementHomeTeamScore,
  incrementAwayTeamScore,
  incrementHomeTeamScore,
  startGame,
} from "~/app/games/[slug]/_actions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useClerk, useUser } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Game, Team } from "@prisma/client";

import { Prisma } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { useForm } from "react-hook-form";
import { useFormCustom } from "~/hooks/useForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

type GameWithTeamsAndPoints = Prisma.GameGetPayload<{
  include: { homeTeam: true; awayTeam: true; points: true };
}>;
export default function GameStarted({
  homeTeam: { name: homeTeamName },
  awayTeam: { name: awayTeamName },
  homeTeamScore,
  awayTeamScore,
  status,
  id,
  points,
}: GameWithTeamsAndPoints) {
  const form = useForm();
  const { isPending, formAction, onSubmit } = useFormCustom(startGame, null);

  // const [localHomeTeamScore, setHomeTeamScore] =
  //   useState<number>(homeTeamScore);
  // const [localAwayTeamScore, setAwayTeamScore] =
  //   useState<number>(awayTeamScore);
  // const user = useUser();
  // const clerk = useClerk();
  // function handleButtonClick() {
  //   if (!user.isSignedIn) {
  //     clerk.openSignIn();
  //   }
  // }
  // async function handleClickStartGame({ id, startingOffense }) {
  //   await startGame({ id });
  // }
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

            <Form>
              <form></form>
            </Form>
            <Button>Add Player</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
