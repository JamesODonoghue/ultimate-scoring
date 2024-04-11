/*
  Warnings:

  - Added the required column `gameId` to the `PointPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointPlayer" ADD COLUMN     "gameId" INTEGER NOT NULL,
ALTER COLUMN "assists" DROP NOT NULL,
ALTER COLUMN "goals" DROP NOT NULL,
ALTER COLUMN "blocks" DROP NOT NULL,
ALTER COLUMN "turnovers" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PointPlayer" ADD CONSTRAINT "PointPlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
