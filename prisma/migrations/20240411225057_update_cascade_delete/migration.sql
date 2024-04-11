-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PointPlayer" DROP CONSTRAINT "PointPlayer_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointPlayer" ADD CONSTRAINT "PointPlayer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
