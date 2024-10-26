import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { Categories } from '@prisma/client';

@Controller('categories/create')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() data: CreateCategoryDto): Promise<Categories>{
    return this.categoriesService.createCategory(data);
  }
}
