import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTagDto } from './tags.dto';
import { Result } from 'src/_libs/interfaces/api-result.interface';
import generateSlug from 'src/_libs/utils/slugGenerator';
import generateUID from 'src/_libs/utils/uidGenerators';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService){}

  async createTag(data: CreateTagDto): Promise<Result>{
    try {
      const uid = generateUID(6);
      const slug = generateSlug(data.name)

      const tag = await this.prisma.tags.create({
        data:{
          ...data,
          uid: uid,
          slug: slug
        }
      })
      return{
        status: 201,
        message:"Tag created successfully",
        data: tag
      }
    } catch (error) {
      return{
        status: 500,
        message:"Internal Server Error",
        error: error.message
      }
    }
  }
}
