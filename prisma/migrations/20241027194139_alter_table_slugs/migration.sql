/*
  Warnings:

  - You are about to drop the column `slug` on the `tasks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tasks_slug_key";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "slug";
