import { Injectable } from '@nestjs/common';
import { Categories, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService){}


  async createCategory(data: Prisma.CategoriesCreateInput): Promise<Categories>{
    return this.prisma.categories.create({
      data
    })
  }
}
