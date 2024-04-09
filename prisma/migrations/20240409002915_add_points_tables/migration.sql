/*
  Warnings:

  - Added the required column `updatedAt` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PointStatus" AS ENUM ('READY', 'STARTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "scoringTeam" TEXT,
ADD COLUMN     "status" "PointStatus" NOT NULL DEFAULT 'READY',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "PointPlayer" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "blocks" INTEGER NOT NULL,
    "turnovers" INTEGER NOT NULL,
    "pointId" INTEGER,

    CONSTRAINT "PointPlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointPlayer" ADD CONSTRAINT "PointPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointPlayer" ADD CONSTRAINT "PointPlayer_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE SET NULL ON UPDATE CASCADE;
