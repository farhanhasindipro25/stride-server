import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import generateSlug from 'src/_libs/utils/slugGenerator';
import generateUID from 'src/_libs/utils/uidGenerators';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCategoryDto } from './categories.dto';
import { Result } from 'src/_libs/interfaces/api-result.interface';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }


  async createCategory(data: CreateCategoryDto): Promise<Result> {
    try {
      const uid = generateUID(6)
      const slug = generateSlug(data.name)

      const category = await this.prisma.categories.create({
        data: {
          ...data,
          uid: uid,
          slug: slug,
        },
      });
      return {
        status: 201,
        message: "Category created successfully",
        data: category,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        error: error.message
      }
    }
  }

  async getCategories(): Promise<Result> {
    try {
      const categories = await this.prisma.categories.findMany()
      return{
        status: 200,
        message:"Categories fetched successfully",
        data: categories
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        error: error.message
      }
    }
  }
}
