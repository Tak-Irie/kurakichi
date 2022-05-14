/*
  Warnings:

  - You are about to drop the column `send_flag` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `read_flag` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `send_flag` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Organization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[baseId]` on the table `Dialog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseId` to the `Dialog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MESSAGE_STATUS" AS ENUM ('READ', 'UNREAD', 'DRAFT');

-- AlterEnum
ALTER TYPE "INQUIRY_STATUS" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "Dialog" ADD COLUMN     "baseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "send_flag",
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "read_flag",
DROP COLUMN "send_flag",
ADD COLUMN     "status" "MESSAGE_STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "phone",
DROP COLUMN "icon",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "avatar" TEXT NOT NULL,
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "homePage" DROP DEFAULT,
ALTER COLUMN "image" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Dialog_baseId_unique" ON "Dialog"("baseId");

-- AddForeignKey
ALTER TABLE "Dialog" ADD FOREIGN KEY ("baseId") REFERENCES "SecureBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
