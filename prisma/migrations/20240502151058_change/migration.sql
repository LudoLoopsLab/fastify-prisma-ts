/*
  Warnings:

  - You are about to drop the column `creatAT` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAT` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "creatAT",
DROP COLUMN "updateAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
