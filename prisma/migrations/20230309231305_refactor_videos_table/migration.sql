/*
  Warnings:

  - You are about to drop the column `female` on the `Videos` table. All the data in the column will be lost.
  - You are about to drop the column `male` on the `Videos` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Video" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "videosId" INTEGER,
    CONSTRAINT "Video_videosId_fkey" FOREIGN KEY ("videosId") REFERENCES "Videos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Videos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Videos" ("id") SELECT "id" FROM "Videos";
DROP TABLE "Videos";
ALTER TABLE "new_Videos" RENAME TO "Videos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
