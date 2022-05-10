/*
  Warnings:

  - You are about to drop the column `text` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Dialog` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Dialog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dialog" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;
