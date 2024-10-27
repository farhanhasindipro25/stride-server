import { Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import generateSlug from 'src/_libs/utils/slugGenerator';
import generateUID from 'src/_libs/utils/uidGenerators';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService){}


  async createCategory(data: CreateCategoryDto): Promise<Categories>{
    const uid = generateUID(6)
    const slug = generateSlug(data.name)
    const categoryData = {
      ...data,
      uid: uid,
      slug: slug,
    };

    return this.prisma.categories.create({
      data: categoryData,
    });
  }

  async getCategories(): Promise<Categories[]>{
    return this.prisma.categories.findMany()
  }
}
