"use client";
import { Button, buttonVariants } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type Player, type Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useFormCustom } from "~/hooks/useForm";
import {
  addAssist,
  addGoal,
  createPlayer,
  createPointPlayer,
  deletePlayer,
  deletePointPlayer,
  endPoint,
  incrementAwayTeamScore,
  incrementHomeTeamScore,
  resetPointPlayerStats,
  startPoint,
} from "../_actions";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Badge } from "~/components/ui/badge";

type GameWithTeamsAndPoints = Prisma.GameGetPayload<{
  include: {
    homeTeam: true;
    awayTeam: true;
    points: { include: { players: true } };
  };
}>;
export default function GameStarted({
  homeTeam: { name: homeTeamName },
  awayTeam: { name: awayTeamName },
  homeTeamScore,
  awayTeamScore,
  homeTeamId,
  awayTeamId,
  players,
  points,
  id: gameId,
}: GameWithTeamsAndPoints & { players: Player[] }) {
  const form = useForm();
  const ref = useRef<HTMLFormElement>(null);

  const { formAction: addPlayerFormAction, onSubmit: addPlayerOnSubmit } =
    useFormCustom(createPlayer, null);

  const latestPoint = points.at(-1);

  if (!latestPoint) {
    return <div>No point exists</div>;
  }
  const { players: currentPointPlayers } = latestPoint;
  const gamePlayers = players.map((player) => {
    return {
      ...player,
      pointPlayerId: currentPointPlayers.find(
        (currentPointPlayer) => currentPointPlayer.playerId === player.id,
      )?.id,
    };
  });

  const latestPointPlayers = currentPointPlayers
    .map((currentPointPlayer) => {
      return {
        ...currentPointPlayer,
        gamePlayer: gamePlayers.find(
          (gamePlayer) => gamePlayer.id === currentPointPlayer.playerId,
        ),
      };
    })
    .sort((prev, curr) => {
      if (!prev.gamePlayer) {
        return -1;
      }
      if (!curr.gamePlayer) {
        return -1;
      }
      return prev.gamePlayer.name.localeCompare(curr.gamePlayer.name);
    });

  async function handleChangePlayerCheckbox({
    checked,
    id,
    pointId,
    pointPlayerId,
  }: {
    checked: string | boolean;
    id: number;
    pointId: number;
    pointPlayerId: number | undefined;
  }) {
    if (checked) {
      return await createPointPlayer({ playerId: id, pointId });
    }
    if (pointPlayerId) {
      await deletePointPlayer({ id: pointPlayerId });
    }
  }

  async function handleClickStartPoint({ id }: { id: number }) {
    await startPoint(id);
  }

  async function handleClickAwayTeamAddGoal({
    pointId,
    gameId,
  }: {
    pointId: number;
    gameId: number;
  }) {
    await incrementAwayTeamScore({ id: gameId });
    await endPoint({ id: pointId, gameId });
  }

  async function handleChangePlayerStat({
    event,
    id,
    gameId,
  }: {
    event: string;
    id: number;
    gameId: number;
  }) {
    if (event === "assist") {
      return await addAssist({ id });
    }
    if (event === "goal") {
      await incrementHomeTeamScore({ id: gameId });
      return await addGoal({ id });
    }
    return await resetPointPlayerStats({ id });
  }

  async function handleClickEndPoint({
    id,
    gameId,
  }: {
    id: number;
    gameId: number;
  }) {
    await endPoint({ id, gameId });
  }

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
          <div>
            {latestPoint.status === "READY" ? (
              <Badge>Point Ready</Badge>
            ) : latestPoint.status === "STARTED" ? (
              <Badge>Point In Progress</Badge>
            ) : (
              <></>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {latestPoint.status === "READY" ? (
            <div className="flex flex-col gap-4">
              <CardTitle>{homeTeamName}</CardTitle>
              <div>Select players for this point</div>
              {gamePlayers.map(({ name, id, pointPlayerId }) => (
                <div className="flex items-center justify-between" key={id}>
                  <div className="flex gap-4">
                    <Checkbox
                      value={id}
                      id={id.toString()}
                      className="flex items-center justify-between"
                      checked={!!pointPlayerId}
                      onCheckedChange={(event) =>
                        handleChangePlayerCheckbox({
                          checked: event,
                          id,
                          pointId: latestPoint.id,
                          pointPlayerId,
                        })
                      }
                    />
                    <Label htmlFor={id.toString()}>{name}</Label>
                  </div>
                  <div>
                    <Button onClick={() => deletePlayer(id)} variant="outline">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              <Form {...form}>
                <form
                  ref={ref}
                  action={addPlayerFormAction}
                  onSubmit={addPlayerOnSubmit}
                  className="flex flex-col gap-4"
                >
                  <input hidden defaultValue={homeTeamId} name="teamId" />
                  <FormField
                    control={form.control}
                    name="playerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Player Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            value={(field.value as string) ?? ""}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                  <Button variant="secondary" type="submit">
                    Add Player
                  </Button>
                </form>
              </Form>
              <Button
                onClick={() => handleClickStartPoint({ id: latestPoint.id })}
              >
                Start Point
              </Button>
            </div>
          ) : latestPoint.status === "STARTED" ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Drawer>
                  <CardTitle>{homeTeamName}</CardTitle>
                  <DrawerTrigger
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Add Goal
                  </DrawerTrigger>
                  {latestPointPlayers.map(({ gamePlayer, id }) => (
                    <div className="flex items-center justify-between" key={id}>
                      <div className="flex gap-4">
                        <div>{gamePlayer?.name}</div>
                      </div>
                    </div>
                  ))}
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Add Goal</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 p-4">
                      {latestPointPlayers.map(
                        ({ gamePlayer, id, assists, goals }) => (
                          <div
                            className="flex items-center justify-between"
                            key={id}
                          >
                            <div className="flex w-full items-center justify-between gap-4">
                              <div>{gamePlayer?.name}</div>
                              <ToggleGroup
                                className="flex gap-2"
                                type="single"
                                defaultValue={
                                  !!assists ? "assist" : !!goals ? "goal" : ""
                                }
                                onValueChange={(event) =>
                                  handleChangePlayerStat({
                                    event,
                                    id,
                                    gameId,
                                  })
                                }
                              >
                                <ToggleGroupItem
                                  variant="outline"
                                  value="assist"
                                >
                                  Assist
                                </ToggleGroupItem>
                                <ToggleGroupItem variant="outline" value="goal">
                                  Goal
                                </ToggleGroupItem>
                              </ToggleGroup>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                    <DrawerFooter>
                      <DrawerClose
                        className={buttonVariants({ variant: "default" })}
                        onClick={() =>
                          handleClickEndPoint({ id: latestPoint.id, gameId })
                        }
                      >
                        End Point
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="flex w-full flex-col gap-4">
                <CardTitle>{awayTeamName}</CardTitle>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleClickAwayTeamAddGoal({
                      gameId,
                      pointId: latestPoint.id,
                    })
                  }
                >
                  Add Goal
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
