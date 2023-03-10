/*
  Warnings:

  - The primary key for the `Step` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "exerciceId" TEXT,
    CONSTRAINT "Step_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("description", "exerciceId") SELECT "description", "exerciceId" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "videosId" INTEGER,
    CONSTRAINT "Video_videosId_fkey" FOREIGN KEY ("videosId") REFERENCES "Videos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("category", "url", "videosId") SELECT "category", "url", "videosId" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
