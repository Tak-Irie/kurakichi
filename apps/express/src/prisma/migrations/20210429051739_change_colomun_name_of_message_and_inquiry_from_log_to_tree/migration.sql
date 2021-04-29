/*
  Warnings:

  - You are about to drop the `InquiryLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_inquiryLogId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_messageLogId_fkey";

-- DropTable
DROP TABLE "InquiryLog";

-- DropTable
DROP TABLE "MessageLog";

-- CreateTable
CREATE TABLE "MessageTree" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InquiryTree" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inquiry" ADD FOREIGN KEY ("inquiryLogId") REFERENCES "InquiryTree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("messageLogId") REFERENCES "MessageTree"("id") ON DELETE CASCADE ON UPDATE CASCADE;
