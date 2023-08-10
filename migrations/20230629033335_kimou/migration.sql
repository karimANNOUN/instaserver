/*
  Warnings:

  - A unique constraint covering the columns `[testingId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `testingId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ADD COLUMN     "testingId" BIGINT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User_testingId_key" ON "User"("testingId");
