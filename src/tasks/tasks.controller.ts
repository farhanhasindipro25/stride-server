import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './tasks.dto';
import { Response } from 'express';
import { Result } from 'src/_libs/interfaces/api-result.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('/create')
  async createCategory(@Body() data: CreateTaskDto, @Res() res: Response){
    const result: Result = await this.tasksService.createTask(data);

    return res.status(result.status).json(result)
  }


  @Get()
  async getTasks(@Res() res: Response){
    const result: Result = await this.tasksService.getTasks()

    return res.status(result.status).json(result)
  }
}
