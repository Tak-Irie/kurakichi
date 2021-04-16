/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ALTER COLUMN "password" DROP DEFAULT,
ALTER COLUMN "ssoSub" DROP DEFAULT,
ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "avatar" DROP DEFAULT,
ALTER COLUMN "image" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT;
