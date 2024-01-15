/*
  Warnings:

  - You are about to alter the column `amount` on the `Transfer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `sale` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `sale` on the `client-Logistics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Transfer" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "client" ALTER COLUMN "sale" DROP NOT NULL,
ALTER COLUMN "sale" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "client-Logistics" ALTER COLUMN "sale" DROP NOT NULL,
ALTER COLUMN "sale" SET DATA TYPE DECIMAL(10,2);
