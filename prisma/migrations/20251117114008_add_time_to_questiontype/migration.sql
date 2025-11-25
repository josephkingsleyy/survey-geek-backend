-- AlterEnum
ALTER TYPE "QuestionType" ADD VALUE 'TIME';

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "options" SET DEFAULT ARRAY[]::TEXT[];
