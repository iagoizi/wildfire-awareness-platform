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
    "status" TEXT NOT NULL DEFAULT 'Recebida',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FireSpot" ("cidade", "createdAt", "endereco", "estado", "id", "info", "referencia") SELECT "cidade", "createdAt", "endereco", "estado", "id", "info", "referencia" FROM "FireSpot";
DROP TABLE "FireSpot";
ALTER TABLE "new_FireSpot" RENAME TO "FireSpot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
