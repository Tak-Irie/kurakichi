-- CreateTable
CREATE TABLE "_requestedMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_requestedMember_AB_unique" ON "_requestedMember"("A", "B");

-- CreateIndex
CREATE INDEX "_requestedMember_B_index" ON "_requestedMember"("B");

-- AddForeignKey
ALTER TABLE "_requestedMember" ADD FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_requestedMember" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
