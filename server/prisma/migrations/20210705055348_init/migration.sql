/*
  Warnings:

  - Added the required column `link_source` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "link_source" VARCHAR(100) NOT NULL;
