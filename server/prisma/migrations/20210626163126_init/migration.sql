/*
  Warnings:

  - You are about to drop the column `keyword` on the `posts` table. All the data in the column will be lost.
  - Added the required column `category` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "keyword",
ADD COLUMN     "category" UUID NOT NULL;

-- CreateTable
CREATE TABLE "post_category" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "value" SMALLINT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY ("category") REFERENCES "post_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
