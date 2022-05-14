/*
  Warnings:

  - You are about to drop the column `category` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey1";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "CATEGORY" NOT NULL DEFAULT E'COUNSEL',
    "send_flag" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("receiverId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER INDEX "Karte.baseId_unique" RENAME TO "Karte_baseId_unique";
