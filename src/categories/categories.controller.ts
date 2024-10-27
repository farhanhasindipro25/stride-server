import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { Categories } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/create')
  async createCategory(@Body() data: CreateCategoryDto): Promise<Categories>{
    return this.categoriesService.createCategory(data);
  }

  @Get()
  async getCategories(): Promise<Categories[]>{
    return this.categoriesService.getCategories()
  }
}
