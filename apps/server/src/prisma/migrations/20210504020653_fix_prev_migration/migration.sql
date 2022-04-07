/*
  Warnings:

  - You are about to drop the column `replierId` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `receivedOrgId` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_replierId_fkey";

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "replierId",
ADD COLUMN     "receivedOrgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("receivedOrgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
