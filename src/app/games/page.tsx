import Link from "next/link";
import { api } from "~/trpc/server";
export default async function Games() {
  const response = await api.game.getAll.query();
  return (
    <div>
      <div className="text-xl">Games</div>
      {response.map((item) => (
        <Link href={`games/${item.id}`} key={item.id}>
          {item.id}
        </Link>
      ))}
    </div>
  );
}
