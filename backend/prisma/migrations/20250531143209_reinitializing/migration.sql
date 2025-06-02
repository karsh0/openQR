/*
  Warnings:

  - You are about to drop the column `email` on the `Card` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_email_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;
