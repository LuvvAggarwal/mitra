-- AlterTable
ALTER TABLE "users" ADD COLUMN     "RCI_certification" TEXT,
ADD COLUMN     "fees" INTEGER,
ADD COLUMN     "verified_counsoler" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "booking" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_on" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "counsoler" UUID NOT NULL,
    "user" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD FOREIGN KEY ("counsoler") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
