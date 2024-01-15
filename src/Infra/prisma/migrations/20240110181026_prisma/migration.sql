-- CreateTable
CREATE TABLE "client" (
    "idClient" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "sale" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("idClient")
);

-- CreateTable
CREATE TABLE "client-Logistics" (
    "idLogistics" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CPF_CNPJ" TEXT NOT NULL,
    "sale" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client-Logistics_pkey" PRIMARY KEY ("idLogistics")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "idTransfer" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "senderId" TEXT,
    "receiverId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logisticsIdLogistics" TEXT,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("idTransfer")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "client-Logistics_email_key" ON "client-Logistics"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client-Logistics_CPF_CNPJ_key" ON "client-Logistics"("CPF_CNPJ");

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_logisticsIdLogistics_fkey" FOREIGN KEY ("logisticsIdLogistics") REFERENCES "client-Logistics"("idLogistics") ON DELETE SET NULL ON UPDATE CASCADE;
