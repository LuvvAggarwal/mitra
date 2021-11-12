/*
  Warnings:

  - You are about to alter the column `ph_number` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "ph_number" DROP NOT NULL,
ALTER COLUMN "ph_number" SET DATA TYPE VARCHAR(15);
