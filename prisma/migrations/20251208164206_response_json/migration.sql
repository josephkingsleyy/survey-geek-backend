/*
  Warnings:

  - The `answerOption` column on the `Response` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `answerOptions` column on the `Response` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answerOption",
ADD COLUMN     "answerOption" JSONB,
DROP COLUMN "answerOptions",
ADD COLUMN     "answerOptions" JSONB;
