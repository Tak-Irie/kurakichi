/*
  Warnings:

  - You are about to drop the `_baseMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_baseMember" DROP CONSTRAINT "_baseMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_baseMember" DROP CONSTRAINT "_baseMember_B_fkey";

-- DropTable
DROP TABLE "_baseMember";

-- CreateTable
CREATE TABLE "_baseFellow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_baseFellow_AB_unique" ON "_baseFellow"("A", "B");

-- CreateIndex
CREATE INDEX "_baseFellow_B_index" ON "_baseFellow"("B");

-- AddForeignKey
ALTER TABLE "_baseFellow" ADD FOREIGN KEY ("A") REFERENCES "Base"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_baseFellow" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
