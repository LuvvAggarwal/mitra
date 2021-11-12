/*
  Warnings:

  - Added the required column `visiblity` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "visiblity" "Visibility" NOT NULL;
