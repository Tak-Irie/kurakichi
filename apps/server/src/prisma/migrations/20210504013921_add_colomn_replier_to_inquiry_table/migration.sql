/*
  Warnings:

  - Added the required column `replierId` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "replierId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("replierId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
