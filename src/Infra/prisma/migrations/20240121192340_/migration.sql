/*
  Warnings:

  - You are about to drop the column `logisticsId` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the `client-Logistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_logisticsId_fkey";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "logisticsId";

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "type" TEXT;

-- DropTable
DROP TABLE "client-Logistics";
