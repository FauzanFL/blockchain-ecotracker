/*
  Warnings:

  - You are about to drop the `EmissionLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmissionLog";

-- CreateTable
CREATE TABLE "emissions_log" (
    "id" TEXT NOT NULL,
    "factoryAddress" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emissions_log_pkey" PRIMARY KEY ("id")
);
