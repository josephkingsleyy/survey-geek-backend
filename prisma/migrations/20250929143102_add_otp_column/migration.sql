-- CreateTable
CREATE TABLE "public"."Billing" (
    "id" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "method" TEXT,
    "reference" TEXT NOT NULL,
    "description" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SurveyInterest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SurveyInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "priority" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TEXT,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "phoneNumber" TEXT,
    "alternatePhoneNumber" TEXT,
    "country" TEXT,
    "state" TEXT,
    "employmentStatus" TEXT,
    "mostPreferredCommsChannel" TEXT,
    "howYouGotToKnowUs" TEXT,
    "profilePhoto" TEXT,
    "dob" TIMESTAMP(3),
    "gender" TEXT,
    "location" TEXT,
    "occupation" TEXT,
    "role" TEXT,
    "isActive" BOOLEAN DEFAULT false,
    "otp" TEXT,
    "twoFactorAuth" TEXT,
    "lastLogin" TEXT,
    "ipAddress" TEXT,
    "browserAgent" TEXT,
    "subscriptionPlan" TEXT,
    "subscriptionPlanExpireAt" TEXT,
    "billingId" INTEGER,
    "bio" TEXT,
    "referralCode" TEXT,
    "softDelete" BOOLEAN,
    "firstName" TEXT,
    "lastName" TEXT,
    "countryCode" TEXT,
    "stateCode" TEXT,
    "subDivisionCode" TEXT,
    "subDivisionName" TEXT,
    "address" TEXT,
    "hasOnboarded" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserInterests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserInterests_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "public"."Payment"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyInterest_name_key" ON "public"."SurveyInterest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_billingId_key" ON "public"."User"("billingId");

-- CreateIndex
CREATE INDEX "_UserInterests_B_index" ON "public"."_UserInterests"("B");

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "public"."Billing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserInterests" ADD CONSTRAINT "_UserInterests_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."SurveyInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserInterests" ADD CONSTRAINT "_UserInterests_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
