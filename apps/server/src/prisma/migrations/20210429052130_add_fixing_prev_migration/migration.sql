/*
  Warnings:

  - You are about to drop the column `inquiryLogId` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `messageLogId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `inquiryTreeId` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageTreeId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_inquiryLogId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_messageLogId_fkey";

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "inquiryLogId",
ADD COLUMN     "inquiryTreeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "messageLogId",
ADD COLUMN     "messageTreeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("inquiryTreeId") REFERENCES "InquiryTree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("messageTreeId") REFERENCES "MessageTree"("id") ON DELETE CASCADE ON UPDATE CASCADE;
