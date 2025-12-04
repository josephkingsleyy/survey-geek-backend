/*
  Warnings:

  - A unique constraint covering the columns `[userId,questionId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Response_userId_questionId_key" ON "Response"("userId", "questionId");
