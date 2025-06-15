/*
  Warnings:

  - You are about to drop the column `selectCoin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "selectCoin";

-- DropTable
DROP TABLE "Authenticator";

-- CreateTable
CREATE TABLE "CryptoList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coin" TEXT NOT NULL,
    "coinImage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CryptoList" ADD CONSTRAINT "CryptoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
