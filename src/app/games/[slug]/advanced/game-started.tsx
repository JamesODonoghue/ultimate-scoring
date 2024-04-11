"use client";
import { Button } from "../../../../components/ui/button";
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
  createPlayer,
  createPointPlayer,
  deletePlayer,
  deletePointPlayer,
} from "../_actions";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

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
  players,
  points,
}: GameWithTeamsAndPoints & { players: Player[] }) {
  const form = useForm();
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
                action={addPlayerFormAction}
                onSubmit={addPlayerOnSubmit}
                className="flex flex-col"
              >
                <input hidden defaultValue={homeTeamId} name="teamId" />
                <FormField
                  control={form.control}
                  name="playerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit">Add Player</Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
