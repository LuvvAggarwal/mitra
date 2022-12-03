/*
  Warnings:

  - Added the required column `rating` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "rating" TEXT NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL;
