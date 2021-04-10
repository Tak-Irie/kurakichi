/*
  Warnings:

  - You are about to drop the column `roomId` on the `Karte` table. All the data in the column will be lost.
  - You are about to drop the `_roomMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[baseId]` on the table `Karte` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseId` to the `Karte` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_roomMember" DROP CONSTRAINT "_roomMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_roomMember" DROP CONSTRAINT "_roomMember_B_fkey";

-- DropForeignKey
ALTER TABLE "Karte" DROP CONSTRAINT "Karte_roomId_fkey";

-- DropIndex
DROP INDEX "Karte.roomId_unique";

-- AlterTable
ALTER TABLE "Karte" DROP COLUMN "roomId",
ADD COLUMN     "baseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_roomMember";

-- CreateTable
CREATE TABLE "_baseMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_baseMember_AB_unique" ON "_baseMember"("A", "B");

-- CreateIndex
CREATE INDEX "_baseMember_B_index" ON "_baseMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Karte.baseId_unique" ON "Karte"("baseId");

-- AddForeignKey
ALTER TABLE "_baseMember" ADD FOREIGN KEY ("A") REFERENCES "SecureBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_baseMember" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karte" ADD FOREIGN KEY ("baseId") REFERENCES "SecureBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
