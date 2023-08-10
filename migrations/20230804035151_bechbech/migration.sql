-- AlterTable
ALTER TABLE "Followers" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isFollow" BOOLEAN DEFAULT true,
ALTER COLUMN "isLiked" DROP NOT NULL,
ALTER COLUMN "isComent" DROP NOT NULL;
