/*
  Warnings:

  - The `category` column on the `Inquiry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('USER', 'PRO');

-- CreateEnum
CREATE TYPE "INQUIRY_CATEGORY" AS ENUM ('COUNSEL', 'INQUIRY', 'CONTACT', 'APPLICATION', 'OTHERS');

-- CreateEnum
CREATE TYPE "INQUIRY_STATUS" AS ENUM ('UNREAD', 'WORKING', 'DONE');

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "status" "INQUIRY_STATUS" NOT NULL DEFAULT E'UNREAD',
DROP COLUMN "category",
ADD COLUMN     "category" "INQUIRY_CATEGORY" NOT NULL DEFAULT E'COUNSEL';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "USER_ROLE" NOT NULL DEFAULT E'USER';

-- DropEnum
DROP TYPE "CATEGORY";

-- DropEnum
DROP TYPE "Role";
