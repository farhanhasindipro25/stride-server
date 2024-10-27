import { Injectable } from '@nestjs/common';
import { Result } from 'src/_libs/interfaces/api-result.interface';
import generateUID from 'src/_libs/utils/uidGenerators';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

  async createTask(data: CreateTaskDto): Promise<Result> {
    try {
      const task = await this.prisma.tasks.create({
        data: {
          ...data,
          uid: generateUID(6),
          dueDate: new Date(data.dueDate),
          Tags: {
            connect: data.Tags?.map((id) => ({ id: id }))
          }
        },
        include: {
          Tags: true
        }
      })

      return {
        status: 201,
        message: "Task created successfully",
        context: 'TasksService - createTask',
        data: task
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context: 'TasksService - createTask',
        error: error.message
      }
    }
  }

  async getTasks(): Promise<Result> {
    try {
      const tasks = await this.prisma.tasks.findMany()
      return {
        status: 200,
        message: "Tasks fetched successfully",
        context:'TasksService - getTasks',
        data: tasks
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TasksService - getTasks',
        error: error.message
      }
    }
  }
}
