-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("receiverId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
