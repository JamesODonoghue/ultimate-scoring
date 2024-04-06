"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start justify-between gap-4 p-4">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold">Ulti score</h1>
        <UserButton />
      </div>
      <Tabs
        defaultValue="/games"
        value={pathname.split("/")[1]}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="games">
            <Link className="w-full" href="/games">
              Games
            </Link>
          </TabsTrigger>
          <TabsTrigger value="teams">
            <Link className="w-full" href="/teams">
              Teams
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
