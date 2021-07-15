/*
  Warnings:

  - You are about to drop the column `comment_count` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `like_count` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `share_count` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `follower_count` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `following_count` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "comment_count",
DROP COLUMN "like_count",
DROP COLUMN "share_count";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "follower_count",
DROP COLUMN "following_count";
