/*
  Warnings:

  - A unique constraint covering the columns `[post,user_id]` on the table `like_post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_user_unique" ON "like_post"("post", "user_id");
