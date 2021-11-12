/*
  Warnings:

  - Made the column `updated_by` on table `groups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "updated_by" SET NOT NULL;
