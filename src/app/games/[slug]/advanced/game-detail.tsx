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
export default function GameDetail({
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
          <CardTitle>
            {homeTeamName} vs {awayTeamName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} onSubmit={onSubmit}>
              <div className="flex flex-col gap-8">
                <input hidden name="id" defaultValue={id} />
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="startingOffense"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-4">
                        <FormLabel>Starting Offense</FormLabel>
                        <FormControl>
                          <RadioGroup
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value as string}
                            className="flex flex-col gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={homeTeamName} />
                              </FormControl>
                              <FormLabel>{homeTeamName}</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={awayTeamName} />
                              </FormControl>
                              <FormLabel>{awayTeamName}</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <Button type="submit" className="w-full">
                  Start Game
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
