/*
  Warnings:

  - You are about to drop the column `visiblity` on the `posts` table. All the data in the column will be lost.
  - Added the required column `visibility` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "visibility" "Visibility" NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "visiblity",
ADD COLUMN     "visibility" "Visibility" NOT NULL;
