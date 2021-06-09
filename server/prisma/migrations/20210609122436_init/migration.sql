/*
  Warnings:

  - You are about to alter the column `profile_photo` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `cover_photo` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `bio` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropIndex
DROP INDEX "users.access_token_unique";

-- DropIndex
DROP INDEX "users.bio_unique";

-- DropIndex
DROP INDEX "users.cover_photo_unique";

-- DropIndex
DROP INDEX "users.profile_photo_unique";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender" DEFAULT E'MALE',
ALTER COLUMN "profile_photo" SET DEFAULT E'',
ALTER COLUMN "profile_photo" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "cover_photo" SET DEFAULT E'',
ALTER COLUMN "cover_photo" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "bio" SET DEFAULT E'',
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(200);
