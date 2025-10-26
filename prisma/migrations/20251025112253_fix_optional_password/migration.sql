/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `Guard` table. All the data in the column will be lost.
  - You are about to drop the column `guardId` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `guardName` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Shift" DROP CONSTRAINT "Shift_guardId_fkey";

-- AlterTable
ALTER TABLE "Guard" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT DEFAULT '',
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "guardId",
DROP COLUMN "title",
ADD COLUMN     "guardName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;
