/*
  Warnings:

  - Made the column `user_status` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_quant_acesso` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expiration" TIMESTAMP(3),
ALTER COLUMN "user_status" SET NOT NULL,
ALTER COLUMN "user_quant_acesso" SET NOT NULL;
