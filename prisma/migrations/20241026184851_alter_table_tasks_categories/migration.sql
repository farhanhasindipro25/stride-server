-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'NORMAL',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
