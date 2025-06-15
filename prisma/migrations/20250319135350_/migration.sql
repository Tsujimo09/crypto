/*
  Warnings:

  - You are about to drop the column `coin` on the `CryptoList` table. All the data in the column will be lost.
  - Added the required column `Crypto` to the `CryptoList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CryptoLabel` to the `CryptoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoList" DROP COLUMN "coin",
ADD COLUMN     "Crypto" TEXT NOT NULL,
ADD COLUMN     "CryptoLabel" TEXT NOT NULL,
ALTER COLUMN "coinImage" SET DATA TYPE TEXT;
