/*
  Warnings:

  - Added the required column `member_count` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_count` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like_count` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `share_count` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_count` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_count` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "member_count" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "comment_count" BIGINT NOT NULL,
ADD COLUMN     "like_count" BIGINT NOT NULL,
ADD COLUMN     "share_count" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "follower_count" BIGINT NOT NULL,
ADD COLUMN     "following_count" BIGINT NOT NULL;
