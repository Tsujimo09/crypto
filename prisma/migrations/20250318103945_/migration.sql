-- CreateTable
CREATE TABLE "CryptoAssets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coinName" TEXT NOT NULL,
    "coinAmount" INTEGER NOT NULL,
    "purchasePrice" INTEGER,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoAssets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CryptoAssets" ADD CONSTRAINT "CryptoAssets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
