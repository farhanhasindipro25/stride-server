import { Injectable } from '@nestjs/common';
import { Result } from 'src/_libs/interfaces/api-result.interface';
import generateSlug from 'src/_libs/utils/slugGenerator';
import generateUID from 'src/_libs/utils/uidGenerators';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

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
        context: 'CategoriesService - createCategory',
        data: category,
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context: 'CategoriesService - createCategory',
        error: error.message,
      }
    }
  }

  async getCategories(): Promise<Result> {
    try {
      const categories = await this.prisma.categories.findMany()
      return {
        status: 200,
        message: "Categories fetched successfully",
        context:'CategoriesService - getCategories',
        data: categories
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'CategoriesService - getCategories',
        error: error.message
      }
    }
  }

  async getCategoryByUID(uid: string): Promise<Result> {
    try {
      const category = await this.prisma.categories.findUnique({
        where: { uid }
      })
      if (!category) {
        return {
          status: 404,
          message: "Category not found",
          context:'CategoriesService - getCategoryByUID',
        }
      }

      return {
        status: 200,
        message: "Category fetched successfully",
        context:'CategoriesService - getCategoryByUID',
        data: category
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'CategoriesService - getCategoryByUID',
        error: error.message
      }
    }
  }

  async updateCategory(uid: string, data: UpdateCategoryDto): Promise<Result> {
    try {
      const category = await this.prisma.categories.findUnique({
        where: { uid }
      })
      if (!category) {
        return {
          status: 404,
          message: "Category not found",
          context:'CategoriesService - updateCategory',
        }
      }

      const updatedCategory = await this.prisma.categories.update({
        where: { uid },
        data: {
          ...data,
          slug: generateSlug(data.name)
        }
      })

      return {
        status: 200,
        message: "Category updated successfully",
        context:'CategoriesService - updateCategory',
        data: updatedCategory
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'CategoriesService - updateCategory',
        error: error.message
      }
    }
  }

  async deleteCategory(uid: string): Promise<Result> {
    try {
      const category = await this.prisma.categories.findUnique({
        where: { uid }
      })
      if (!category) {
        return {
          status: 404,
          message: "Category not found",
          context:'CategoriesService - deleteCategory',
        }
      }

      const deletedCategory = await this.prisma.categories.delete({
        where: { uid }
      })

      return {
        status: 200,
        message: "Category deleted successfully",
        context:'CategoriesService - deleteCategory',
        data: deletedCategory
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'CategoriesService - deleteCategory',
        error: error.message
      }
    }
  }
}
