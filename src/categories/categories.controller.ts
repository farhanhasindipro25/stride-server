import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { Categories } from '@prisma/client';
import { Response } from 'express';
import { Result } from 'src/_libs/interfaces/api-result.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/create')
  async createCategory(@Body() data: CreateCategoryDto, @Res() res: Response){
    const result: Result = await this.categoriesService.createCategory(data);

    return res.status(result.status).json(result)
  }

  @Get()
  async getCategories(): Promise<Categories[]>{
    return this.categoriesService.getCategories()
  }
}
