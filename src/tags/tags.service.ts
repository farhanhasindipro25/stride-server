import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTagDto, UpdateTagDto } from './tags.dto';
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
        context:'TagsService - createTag',
        data: tag
      }
    } catch (error) {
      return{
        status: 500,
        message:"Internal Server Error",
        context:'TagsService - createTag',
        error: error.message
      }
    }
  }

  async getTags(): Promise<Result> {
    try {
      const tags = await this.prisma.tags.findMany()
      return {
        status: 200,
        message: "Tags fetched successfully",
        context:'TagsService - getTags',
        data: tags
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TagsService - getTags',
        error: error.message
      }
    }
  }

  async getTagByUID(uid: string): Promise<Result> {
    try {
      const tag = await this.prisma.tags.findUnique({
        where: { uid }
      })
      if (!tag) {
        return {
          status: 404,
          message: "Tag not found",
          context:'TagsService - getTagByUID',
        }
      }

      return {
        status: 200,
        message: "Tag fetched successfully",
        context:'TagsService - getTagByUID',
        data: tag
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TagsService - getTagByUID',
        error: error.message
      }
    }
  }

  async updateTag(uid: string, data: UpdateTagDto): Promise<Result> {
    try {
      const tag = await this.prisma.tags.findUnique({
        where: { uid }
      })
      if (!tag) {
        return {
          status: 404,
          message: "Tag not found",
          context:'TagsService - updateTag',
        }
      }

      const updatedTag = await this.prisma.tags.update({
        where: { uid },
        data: {
          ...data,
          slug: generateSlug(data.name)
        }
      })

      return {
        status: 200,
        message: "Tag updated successfully",
        context:'TagsService - updateTag',
        data: updatedTag
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TagsService - updateTag',
        error: error.message
      }
    }
  }

  async deleteTag(uid: string): Promise<Result> {
    try {
      const tag = await this.prisma.tags.findUnique({
        where: { uid }
      })
      if (!tag) {
        return {
          status: 404,
          message: "Tag not found",
          context:'TagsService - deleteTag',
        }
      }

      const deletedTag = await this.prisma.tags.delete({
        where: { uid }
      })

      return {
        status: 200,
        message: "Tag deleted successfully",
        context:'TagsService - deleteTag',
        data: deletedTag
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TagsService - deleteTag',
        error: error.message
      }
    }
  }
}
