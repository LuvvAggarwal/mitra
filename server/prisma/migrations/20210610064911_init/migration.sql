/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_city_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_address_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" UUID,
ALTER COLUMN "address" SET DEFAULT E'',
ALTER COLUMN "address" SET DATA TYPE VARCHAR(200);

-- DropTable
DROP TABLE "addresses";

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("city") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
