/*
  Warnings:

  - You are about to drop the column `subject` on the `Ticket` table. All the data in the column will be lost.
  - The `emailVerifiedAt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otpExpiresAt` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `title` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ticket" DROP COLUMN "subject",
ADD COLUMN     "assignedToId" INTEGER,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "resolutionNote" TEXT,
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerifiedAt",
ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "softDelete" SET DEFAULT false,
DROP COLUMN "otpExpiresAt",
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."File" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "ticketId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "File_ticketId_idx" ON "public"."File"("ticketId");

-- CreateIndex
CREATE INDEX "Ticket_userId_idx" ON "public"."Ticket"("userId");

-- CreateIndex
CREATE INDEX "Ticket_assignedToId_idx" ON "public"."Ticket"("assignedToId");

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
