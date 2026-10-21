/*
  Warnings:

  - You are about to drop the column `userAt` on the `WalletNonce` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WalletNonce" DROP COLUMN "userAt",
ADD COLUMN     "usedAt" TIMESTAMP(3);
