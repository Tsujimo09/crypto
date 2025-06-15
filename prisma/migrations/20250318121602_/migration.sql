/*
  Warnings:

  - You are about to drop the column `coinAmount` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jpyAmount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "coinAmount",
DROP COLUMN "jpyAmount";
