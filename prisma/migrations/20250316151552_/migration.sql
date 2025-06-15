/*
  Warnings:

  - You are about to drop the column `coinsAmount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "coinsAmount",
ADD COLUMN     "coinAmount" INTEGER;
