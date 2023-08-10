/*
  Warnings:

  - Added the required column `comments` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "comments" JSONB NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
