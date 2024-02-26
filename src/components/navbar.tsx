"use client";
import { navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-xl items-start justify-between p-4">
      <div className="flex gap-4">
        <Link href="/game/new" className={navigationMenuTriggerStyle()}>
          Create new game
        </Link>
        <Link href="/team/new" className={navigationMenuTriggerStyle()}>
          Create new team
        </Link>
        <Link href="/games" className={navigationMenuTriggerStyle()}>
          View games
        </Link>
      </div>
      <UserButton />
    </div>
  );
}
