import { api } from "~/trpc/server";

export default async function Game({ params }: { params: { slug: string } }) {
  const response = await api.game.getById.query({ id: params.slug });
  if (!response) {
    return <div>No data found</div>;
  }
  const {
    homeTeam: { name: homeTeamName },
    awayTeam: { name: awayTeamName },
  } = response;
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-4xl">
        {homeTeamName} vs {awayTeamName}
      </div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
