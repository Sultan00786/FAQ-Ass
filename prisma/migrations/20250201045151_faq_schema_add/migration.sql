-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question_en" TEXT NOT NULL,
    "answer_en" TEXT NOT NULL,
    "question_hi" TEXT,
    "answer_hi" TEXT,
    "question_fr" TEXT,
    "answer_fr" TEXT,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);
