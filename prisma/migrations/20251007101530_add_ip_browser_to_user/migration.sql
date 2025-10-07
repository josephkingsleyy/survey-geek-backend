-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "resetOtp" TEXT,
ADD COLUMN     "resetOtpExpiresAt" TIMESTAMP(3);
