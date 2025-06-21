-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,
    "user_email" VARCHAR(30) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_admin" BOOLEAN NOT NULL DEFAULT false,
    "user_status" CHAR(1) NOT NULL,
    "user_quant_acesso" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "pr_id" SERIAL NOT NULL,
    "pr_name" VARCHAR(30) NOT NULL,
    "pr_price" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pr_is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("pr_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sl_id" SERIAL NOT NULL,
    "sl_total" DOUBLE PRECISION NOT NULL,
    "sl_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sl_is_delete" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sl_id")
);

-- CreateTable
CREATE TABLE "ItemSale" (
    "itsl_id" SERIAL NOT NULL,
    "itsl_quantidade" INTEGER NOT NULL DEFAULT 1,
    "sl_id" INTEGER NOT NULL,
    "pr_id" INTEGER NOT NULL,

    CONSTRAINT "ItemSale_pkey" PRIMARY KEY ("itsl_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSale" ADD CONSTRAINT "ItemSale_sl_id_fkey" FOREIGN KEY ("sl_id") REFERENCES "Sale"("sl_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSale" ADD CONSTRAINT "ItemSale_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "Product"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;
