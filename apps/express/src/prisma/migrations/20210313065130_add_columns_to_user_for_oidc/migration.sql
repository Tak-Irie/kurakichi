-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ssoSub" TEXT,
ADD COLUMN     "picture" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
