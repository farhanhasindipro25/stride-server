
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Result } from 'src/_libs/interfaces/api-result.interface';
import { CreateTagDto, UpdateTagDto } from './tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post('/create')
  async createTag(@Body() data: CreateTagDto, @Res() res: Response){
    const result: Result = await this.tagsService.createTag(data);

    return res.status(result.status).json(result)
  }

  @Get()
  async getTags(@Res() res: Response){
    const result: Result = await this.tagsService.getTags()

    return res.status(result.status).json(result)
  }

  @Get(':uid')
  async getTagByUID(@Param('uid') uid: string, @Res() res: Response){
    const result: Result = await this.tagsService.getTagByUID(uid)

    return res.status(result.status).json(result)
  }
}
