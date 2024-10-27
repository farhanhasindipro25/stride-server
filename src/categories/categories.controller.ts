import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Result } from 'src/_libs/interfaces/api-result.interface';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/create')
  async createCategory(@Body() data: CreateCategoryDto, @Res() res: Response){
    const result: Result = await this.categoriesService.createCategory(data);

    return res.status(result.status).json(result)
  }

  @Get()
  async getCategories(@Res() res: Response){
    const result: Result = await this.categoriesService.getCategories()

    return res.status(result.status).json(result)
  }

  @Get(':uid')
  async getCategoryByUID(@Param('uid') uid: string, @Res() res: Response){
    const result: Result = await this.categoriesService.getCategoryByUID(uid)

    return res.status(result.status).json(result)
  }

  @Patch(':uid')
  async updateCategory(@Param('uid') uid: string, @Body() data: UpdateCategoryDto, @Res() res: Response){
    const result: Result = await this.categoriesService.updateCategory(uid, data)

    return res.status(result.status).json(result)
  }

  @Delete('/delete/:uid')
  async deleteCategory(@Param('uid') uid: string, @Res() res: Response){
    const result: Result = await this.categoriesService.deleteCategory(uid)

    return res.status(result.status).json(result)
  }
}
