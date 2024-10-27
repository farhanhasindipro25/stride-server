import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
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

  @Get(':uid')
  async getTaskByUID(@Param('uid') uid: string, @Res() res: Response){
    const result: Result = await this.tasksService.getTaskByUID(uid)

    return res.status(result.status).json(result)
  }

  @Patch(':uid')
  async updateTask(@Param('uid') uid: string, @Body() data: UpdateTaskDto, @Res() res: Response){
    const result: Result = await this.tasksService.updateTask(uid, data)

    return res.status(result.status).json(result)
  }
}
