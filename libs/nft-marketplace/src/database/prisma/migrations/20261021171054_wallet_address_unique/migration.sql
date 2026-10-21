/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Collection_authorId_isDefault_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "passwordhash" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WalletNonce" (
    "nonce" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletNonce_pkey" PRIMARY KEY ("nonce")
);

-- CreateIndex
CREATE INDEX "WalletNonce_expiresAt_idx" ON "WalletNonce"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");
