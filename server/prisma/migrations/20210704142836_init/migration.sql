/*
  Warnings:

  - You are about to drop the column `type` on the `atachment_post_map` table. All the data in the column will be lost.
  - Added the required column `mime_type` to the `atachment_post_map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atachment_post_map" DROP COLUMN "type",
ADD COLUMN     "mime_type" VARCHAR(150) NOT NULL;
