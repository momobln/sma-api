/*
  Warnings:

  - Made the column `password` on table `Guard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guard" ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Shift" ALTER COLUMN "phone" DROP NOT NULL;
