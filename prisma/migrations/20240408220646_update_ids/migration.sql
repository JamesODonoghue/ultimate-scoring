/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `homeTeamId` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `awayTeamId` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gameId` on the `Point` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "homeTeamId",
ADD COLUMN     "homeTeamId" INTEGER NOT NULL,
DROP COLUMN "awayTeamId",
ADD COLUMN     "awayTeamId" INTEGER NOT NULL,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "gameId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Game_homeTeamId_idx" ON "Game"("homeTeamId");

-- CreateIndex
CREATE INDEX "Game_awayTeamId_idx" ON "Game"("awayTeamId");

-- CreateIndex
CREATE INDEX "Team_id_idx" ON "Team"("id");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
