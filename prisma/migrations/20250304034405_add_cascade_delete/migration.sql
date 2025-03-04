-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hoby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Hoby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hoby" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "Hoby";
DROP TABLE "Hoby";
ALTER TABLE "new_Hoby" RENAME TO "Hoby";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
