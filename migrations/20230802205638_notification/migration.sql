-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER,
    "postId" INTEGER,
    "authorreceptionId" INTEGER,
    "isLiked" BOOLEAN NOT NULL,
    "isComent" BOOLEAN NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
