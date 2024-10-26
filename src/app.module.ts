import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [CategoriesModule, TasksModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
