-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "review" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "account_holder_name" TEXT,
ADD COLUMN     "account_no" TEXT,
ADD COLUMN     "bank_branch" TEXT,
ADD COLUMN     "ifsc_code" TEXT,
ADD COLUMN     "time_slot" TEXT,
ALTER COLUMN "verified_counsoler" DROP NOT NULL;
