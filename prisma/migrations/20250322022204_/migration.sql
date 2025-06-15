/*
  Warnings:

  - Changed the type of `Asset` on the `AssetHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AssetHistory" DROP COLUMN "Asset",
ADD COLUMN     "Asset" DECIMAL(18,8) NOT NULL;
