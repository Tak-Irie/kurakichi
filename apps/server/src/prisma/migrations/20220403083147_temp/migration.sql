-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_orgId_fkey";

-- DropForeignKey
ALTER TABLE "Dialog" DROP CONSTRAINT "Dialog_baseId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_inquiryTreeId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_receivedOrgId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Karte" DROP CONSTRAINT "Karte_baseId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_messageTreeId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_adminId_fkey";

-- DropForeignKey
ALTER TABLE "SecureBase" DROP CONSTRAINT "SecureBase_adminId_fkey";

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageTreeId_fkey" FOREIGN KEY ("messageTreeId") REFERENCES "MessageTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_receivedOrgId_fkey" FOREIGN KEY ("receivedOrgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_inquiryTreeId_fkey" FOREIGN KEY ("inquiryTreeId") REFERENCES "InquiryTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecureBase" ADD CONSTRAINT "SecureBase_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dialog" ADD CONSTRAINT "Dialog_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "SecureBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karte" ADD CONSTRAINT "Karte_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "SecureBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Dialog_baseId_unique" RENAME TO "Dialog_baseId_key";

-- RenameIndex
ALTER INDEX "Karte_baseId_unique" RENAME TO "Karte_baseId_key";

-- RenameIndex
ALTER INDEX "Organization.name_unique" RENAME TO "Organization_name_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";
