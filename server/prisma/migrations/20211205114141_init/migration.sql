-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "key_secret" TEXT,
ADD COLUMN     "order_id" TEXT,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "razorpay_payment_id" TEXT;
