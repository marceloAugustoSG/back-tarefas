-- CreateTable
CREATE TABLE "public"."Tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL,
    "data_limite" TIMESTAMP(3) NOT NULL,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_titulo_key" ON "public"."Tarefa"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_orderIndex_key" ON "public"."Tarefa"("orderIndex");
