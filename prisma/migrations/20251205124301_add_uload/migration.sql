-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "maxFiles" INTEGER DEFAULT 1,
ADD COLUMN     "maxSize" INTEGER DEFAULT 2048,
ADD COLUMN     "uploadedFiles" JSONB DEFAULT '[]';
