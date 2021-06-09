-- CreateEnum
CREATE TYPE "Attachment_Type" AS ENUM ('IMAGE', 'VIDEO', 'EXCEL', 'DOC', 'PDF');

-- CreateEnum
CREATE TYPE "Post" AS ENUM ('TEXT', 'MULTIMEDIA', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "User_Type" AS ENUM ('USER', 'NGO', 'COUNSALER');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'FRIENDS');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "Notifcation" AS ENUM ('IMPORTANT', 'STANDARD', 'NO_NOTIFICATION');

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "street" VARCHAR(150) NOT NULL,
    "pin_code" INTEGER,
    "city" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atachment_post_map" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "Attachment_Type" NOT NULL DEFAULT E'IMAGE',
    "post" UUID NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(150) NOT NULL,
    "state_id" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_post" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "comment" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shortname" VARCHAR(3) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "phonecode" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(150) NOT NULL,
    "message" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follower_following" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follower" UUID NOT NULL,
    "following" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_member_map" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "is_admin" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_member_req" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group_id" UUID NOT NULL,
    "request_sender" UUID NOT NULL,
    "request_reciever" UUID NOT NULL,
    "is_acceptor_admin" BOOLEAN NOT NULL,
    "request_accepted" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "group_id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "problem_category" UUID NOT NULL,
    "ph_number" BIGINT NOT NULL,
    "email" VARCHAR(150),
    "profile_photo" TEXT,
    "cover_photo" TEXT,
    "bio" TEXT,
    "created_by" UUID NOT NULL,
    "updated_by" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_type" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like_post" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event" UUID NOT NULL,
    "sender" UUID NOT NULL,
    "recipient" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "Post" NOT NULL DEFAULT E'TEXT',
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "keyword" TEXT,
    "visibility" VARCHAR(10) NOT NULL,
    "group_id" UUID,
    "user_id" UUID,
    "approved" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_category" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "share_post" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "shared_on" VARCHAR(50) NOT NULL,
    "share_link" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_achievers" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR(100) NOT NULL,
    "middle_name" VARCHAR(100),
    "last_name" VARCHAR(100) NOT NULL,
    "achievement" TEXT NOT NULL,
    "problem_category" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(150) NOT NULL,
    "country_id" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "number" BIGSERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR(100) NOT NULL,
    "type" "User_Type" NOT NULL,
    "first_name" VARCHAR(100) DEFAULT E'',
    "middle_name" VARCHAR(100) DEFAULT E'',
    "last_name" VARCHAR(100) DEFAULT E'',
    "name" VARCHAR(250) DEFAULT E'',
    "occupation" VARCHAR(100) DEFAULT E'',
    "experience" INTEGER DEFAULT 0,
    "problem_category" UUID NOT NULL,
    "registration_code" VARCHAR(100),
    "help_type" UUID,
    "ph_number" BIGINT NOT NULL,
    "email" VARCHAR(150),
    "profile_photo" TEXT,
    "cover_photo" TEXT,
    "bio" TEXT,
    "address" UUID NOT NULL,
    "last_login" TIMESTAMP(6),
    "access_token" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT E'FRIENDS',
    "theme" "Theme" NOT NULL DEFAULT E'LIGHT',
    "notification" "Notifcation" NOT NULL DEFAULT E'STANDARD',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups.group_id_unique" ON "groups"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups.ph_number_unique" ON "groups"("ph_number");

-- CreateIndex
CREATE UNIQUE INDEX "groups.email_unique" ON "groups"("email");

-- CreateIndex
CREATE UNIQUE INDEX "groups.bio_unique" ON "groups"("bio");

-- CreateIndex
CREATE UNIQUE INDEX "users.user_id_unique" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.ph_number_unique" ON "users"("ph_number");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users.profile_photo_unique" ON "users"("profile_photo");

-- CreateIndex
CREATE UNIQUE INDEX "users.cover_photo_unique" ON "users"("cover_photo");

-- CreateIndex
CREATE UNIQUE INDEX "users.bio_unique" ON "users"("bio");

-- CreateIndex
CREATE UNIQUE INDEX "users.access_token_unique" ON "users"("access_token");

-- AddForeignKey
ALTER TABLE "group_member_req" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member_req" ADD FOREIGN KEY ("request_reciever") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member_req" ADD FOREIGN KEY ("request_sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_post" ADD FOREIGN KEY ("post") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_post" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member_map" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member_map" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("problem_category") REFERENCES "problem_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_following" ADD FOREIGN KEY ("follower") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower_following" ADD FOREIGN KEY ("following") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atachment_post_map" ADD FOREIGN KEY ("post") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_post" ADD FOREIGN KEY ("post") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like_post" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD FOREIGN KEY ("event") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD FOREIGN KEY ("recipient") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD FOREIGN KEY ("sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD FOREIGN KEY ("city") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("address") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("help_type") REFERENCES "help_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("problem_category") REFERENCES "problem_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "share_post" ADD FOREIGN KEY ("post") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "share_post" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_achievers" ADD FOREIGN KEY ("problem_category") REFERENCES "problem_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
