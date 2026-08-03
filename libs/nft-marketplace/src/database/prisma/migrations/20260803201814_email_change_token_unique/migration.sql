/*
  Warnings:

  - A unique constraint covering the columns `[tokenHash]` on the table `EmailChangeRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailChangeRequest_tokenHash_key" ON "EmailChangeRequest"("tokenHash");
