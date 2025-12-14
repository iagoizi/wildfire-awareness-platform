/*
  Warnings:

  - You are about to drop the column `latitude` on the `FireSpot` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `FireSpot` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `FireSpot` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `FireSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `FireSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `FireSpot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FireSpot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "referencia" TEXT,
    "info" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FireSpot" ("createdAt", "id") SELECT "createdAt", "id" FROM "FireSpot";
DROP TABLE "FireSpot";
ALTER TABLE "new_FireSpot" RENAME TO "FireSpot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
