/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Karte" DROP CONSTRAINT "Karte_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_roomMember" DROP CONSTRAINT "_roomMember_A_fkey";

-- DropTable
DROP TABLE "Room";

-- CreateTable
CREATE TABLE "SecureBase" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SecureBase" ADD FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karte" ADD FOREIGN KEY ("roomId") REFERENCES "SecureBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roomMember" ADD FOREIGN KEY ("A") REFERENCES "SecureBase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
