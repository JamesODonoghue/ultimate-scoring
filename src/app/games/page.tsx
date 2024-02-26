import Link from "next/link";
import { db } from "~/server/db";
export default async function Games() {
  const response = await db.game.findMany();
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
