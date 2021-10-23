-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sso" BOOLEAN DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;
