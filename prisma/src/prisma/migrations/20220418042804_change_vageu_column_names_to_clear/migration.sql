ALTER TABLE "Article" RENAME COLUMN "image" TO "imageUrl";

ALTER TABLE "Organization" RENAME COLUMN "avatar" TO "avatarUrl";
ALTER TABLE "Organization" RENAME COLUMN "homePage" TO "homePageUrl";
ALTER TABLE "Organization" RENAME COLUMN "image" TO "heroImageUrl";

ALTER TABLE "User" RENAME COLUMN "description" TO "selfIntro";
ALTER TABLE "User" RENAME COLUMN "avatar" TO "avatarUrl";
ALTER TABLE "User" RENAME COLUMN "image" TO "heroImageUrl";

