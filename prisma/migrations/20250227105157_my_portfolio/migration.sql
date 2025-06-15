/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Authenticator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Authenticator` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Authenticator` table. All the data in the column will be lost.
  - You are about to drop the column `publicKey` on the `Authenticator` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Authenticator` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Session` table. All the data in the column will be lost.
  - Added the required column `credentialBackedUp` to the `Authenticator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credentialDeviceType` to the `Authenticator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credentialPublicKey` to the `Authenticator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerAccountId` to the `Authenticator` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("provider", "providerAccountId");

-- AlterTable
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "publicKey",
DROP COLUMN "updatedAt",
ADD COLUMN     "credentialBackedUp" BOOLEAN NOT NULL,
ADD COLUMN     "credentialDeviceType" TEXT NOT NULL,
ADD COLUMN     "credentialPublicKey" TEXT NOT NULL,
ADD COLUMN     "providerAccountId" TEXT NOT NULL,
ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId", "credentialID");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);
