/*
  Warnings:

  - Added the required column `resource_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "resource_id" TEXT NOT NULL;
