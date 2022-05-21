/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `sentAt` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inquiryLogId` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageLogId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "createdAt",
ADD COLUMN     "sentAt" BIGINT NOT NULL,
ADD COLUMN     "inquiryLogId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "messageLogId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MessageLog" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InquiryLog" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("inquiryLogId") REFERENCES "InquiryLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("messageLogId") REFERENCES "MessageLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
