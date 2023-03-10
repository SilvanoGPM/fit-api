-- CreateTable
CREATE TABLE "Videos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "male" TEXT NOT NULL,
    "female" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Step" (
    "description" TEXT NOT NULL PRIMARY KEY,
    "exerciceId" TEXT,
    CONSTRAINT "Step_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "videosId" INTEGER NOT NULL,
    CONSTRAINT "Exercice_videosId_fkey" FOREIGN KEY ("videosId") REFERENCES "Videos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
