/*
  Warnings:

  - The values [PRO] on the enum `USER_ROLE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `SecureBase` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLE_new" AS ENUM ('USER', 'EXPERT', 'CLIENT');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "USER_ROLE_new" USING ("role"::text::"USER_ROLE_new");
ALTER TYPE "USER_ROLE" RENAME TO "USER_ROLE_old";
ALTER TYPE "USER_ROLE_new" RENAME TO "USER_ROLE";
DROP TYPE "USER_ROLE_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Dialog" DROP CONSTRAINT "Dialog_baseId_fkey";

-- DropForeignKey
ALTER TABLE "Karte" DROP CONSTRAINT "Karte_baseId_fkey";

-- DropForeignKey
ALTER TABLE "SecureBase" DROP CONSTRAINT "SecureBase_adminId_fkey";

-- DropForeignKey
ALTER TABLE "_baseMember" DROP CONSTRAINT "_baseMember_A_fkey";

-- DropTable
DROP TABLE "SecureBase";

-- CreateTable
CREATE TABLE "Base" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dialog" ADD CONSTRAINT "Dialog_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karte" ADD CONSTRAINT "Karte_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_baseMember" ADD FOREIGN KEY ("A") REFERENCES "Base"("id") ON DELETE CASCADE ON UPDATE CASCADE;
