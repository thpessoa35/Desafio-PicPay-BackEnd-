/*
  Warnings:

  - You are about to drop the column `logisticsIdLogistics` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `receiverClientId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderClientId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_logisticsIdLogistics_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_senderId_fkey";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "logisticsIdLogistics",
DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "logisticsId" TEXT,
ADD COLUMN     "receiverClientId" TEXT NOT NULL,
ADD COLUMN     "senderClientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_senderClientId_fkey" FOREIGN KEY ("senderClientId") REFERENCES "client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_receiverClientId_fkey" FOREIGN KEY ("receiverClientId") REFERENCES "client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_logisticsId_fkey" FOREIGN KEY ("logisticsId") REFERENCES "client-Logistics"("idLogistics") ON DELETE SET NULL ON UPDATE CASCADE;
