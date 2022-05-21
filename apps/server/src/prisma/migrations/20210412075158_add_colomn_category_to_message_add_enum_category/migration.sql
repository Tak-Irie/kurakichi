-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('COUNSEL', 'INQUIRY', 'CONTACT', 'APPLICATION', 'OTHERS');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "category" "CATEGORY" NOT NULL DEFAULT E'COUNSEL',
ADD COLUMN     "send_flag" BOOLEAN NOT NULL DEFAULT false;
