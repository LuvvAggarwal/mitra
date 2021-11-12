/*
  Warnings:

  - Added the required column `member_id` to the `group_member_req` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_to_add` to the `group_member_req` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group_member_req" ADD COLUMN     "member_id" UUID NOT NULL,
ADD COLUMN     "user_to_add" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "group_member_req" ADD FOREIGN KEY ("member_id") REFERENCES "group_member_map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
