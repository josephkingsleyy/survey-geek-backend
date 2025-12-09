-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('DRAFT', 'PUBLISH');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "status" "QuestionStatus" NOT NULL DEFAULT 'DRAFT';
