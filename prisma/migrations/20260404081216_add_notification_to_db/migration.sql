-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isImportant" BOOLEAN DEFAULT false,
ADD COLUMN     "isStarred" BOOLEAN DEFAULT false;
