-- CreateTable
CREATE TABLE "Products" (
    "pid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isOnlineSale" BOOLEAN NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latetude" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "showOutOfStock" BOOLEAN NOT NULL,
    "isOnline" BOOLEAN NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
