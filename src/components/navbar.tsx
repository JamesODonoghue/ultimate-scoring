"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start justify-between gap-4 p-4">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold">Ulti score</h1>
        <UserButton />
      </div>
      <div className="flex w-full flex-wrap justify-between gap-4">
        <Button variant="outline">
          <Link href="/game/new">Create new game</Link>
        </Button>
        <Button variant="outline">
          <Link href="/team/new">Create new team</Link>
        </Button>
        <Button variant="outline">
          <Link href="/games">View games</Link>
        </Button>
      </div>
    </div>
  );
}
