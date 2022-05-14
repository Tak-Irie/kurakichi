-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
