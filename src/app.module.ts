import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ TasksModule, TagsModule, PrismaModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
