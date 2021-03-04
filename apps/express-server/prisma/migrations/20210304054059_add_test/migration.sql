/*
  Warnings:

  - The migration will change the primary key for the `Test` table. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Test" DROP CONSTRAINT "Test_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
