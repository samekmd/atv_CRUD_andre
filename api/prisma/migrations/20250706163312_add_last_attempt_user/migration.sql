/*
  Warnings:

  - You are about to drop the column `user_quant_acesso` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_quant_acesso",
ADD COLUMN     "last_attempt" TIMESTAMP(3);
