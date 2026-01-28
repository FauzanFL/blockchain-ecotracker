-- CreateTable
CREATE TABLE "EmissionLog" (
    "id" TEXT NOT NULL,
    "factoryAddress" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmissionLog_pkey" PRIMARY KEY ("id")
);
