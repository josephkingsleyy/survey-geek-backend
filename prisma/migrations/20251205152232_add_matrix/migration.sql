/*
  Warnings:

  - A unique constraint covering the columns `[matrixId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "matrixId" INTEGER;

-- CreateTable
CREATE TABLE "MatrixField" (
    "id" SERIAL NOT NULL,
    "operator" TEXT NOT NULL,
    "rows" TEXT[],
    "cols" TEXT[],
    "data" JSONB NOT NULL,

    CONSTRAINT "MatrixField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_matrixId_key" ON "Question"("matrixId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "MatrixField"("id") ON DELETE SET NULL ON UPDATE CASCADE;
