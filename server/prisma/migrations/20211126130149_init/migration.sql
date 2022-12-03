/*
  Warnings:

  - Added the required column `meeting_link` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "meeting_link" TEXT NOT NULL;
