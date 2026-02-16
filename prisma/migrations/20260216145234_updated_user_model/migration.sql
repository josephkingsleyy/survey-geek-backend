/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stateCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subDivisionCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subDivisionName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "country",
DROP COLUMN "countryCode",
DROP COLUMN "state",
DROP COLUMN "stateCode",
DROP COLUMN "subDivisionCode",
DROP COLUMN "subDivisionName",
ADD COLUMN     "addressOfNationality" TEXT,
ADD COLUMN     "addressOfResidence" TEXT,
ADD COLUMN     "alternatePhoneNumberDialCode" TEXT,
ADD COLUMN     "cityOfNationality" TEXT,
ADD COLUMN     "cityOfResidence" TEXT,
ADD COLUMN     "countryOfNationality" TEXT,
ADD COLUMN     "countryOfResidence" TEXT,
ADD COLUMN     "phoneNumberDialCode" TEXT,
ADD COLUMN     "stateOfNationality" TEXT,
ADD COLUMN     "stateOfResidence" TEXT;
