-- CreateTable
CREATE TABLE "PageAnalytics" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageAnalytics_pkey" PRIMARY KEY ("id")
);
