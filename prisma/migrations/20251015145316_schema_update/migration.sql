/*
  Warnings:

  - You are about to drop the column `surveyId` on the `Question` table. All the data in the column will be lost.
  - The `status` column on the `Survey` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `sectionId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SurveyStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "public"."Question" DROP CONSTRAINT "Question_surveyId_fkey";

-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "surveyId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Response" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Survey" DROP COLUMN "status",
ADD COLUMN     "status" "public"."SurveyStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "public"."Section" (
    "id" SERIAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Section" ADD CONSTRAINT "Section_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "public"."Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
