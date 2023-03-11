-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "protein" REAL NOT NULL,
    "carbohydrate" REAL NOT NULL,
    "lipid" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "energy" REAL NOT NULL
);
