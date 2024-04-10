/*
  Warnings:

  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('READY', 'STARTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "startingOffense" TEXT DEFAULT '',
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'READY';

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
