import { Injectable } from '@nestjs/common';
import { Result } from 'src/_libs/interfaces/api-result.interface';
import generateUID from 'src/_libs/utils/uidGenerators';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

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

  async getTaskByUID(uid: string): Promise<Result> {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: { uid }
      })
      if (!task) {
        return {
          status: 404,
          message: "Task not found",
          context:'TasksService - getTaskByUID',
        }
      }

      return {
        status: 200,
        message: "Task fetched successfully",
        context:'TasksService - getTaskByUID',
        data: task
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TasksService - getTaskByUID',
        error: error.message
      }
    }
  }

  async updateTask(uid: string, data: UpdateTaskDto): Promise<Result> {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: { uid }
      })
      if (!task) {
        return {
          status: 404,
          message: "Task not found",
          context:'TasksService - updateTask',
        }
      }

      const updatedTask = await this.prisma.tasks.update({
        where: { uid },
        data: {
          ...data,
          dueDate: new Date(data.dueDate),
          Tags: {
            set: data.Tags?.map((id) => ({ id: id })),
          },
        },
        include: {
          Tags: true
        }
      })

      return {
        status: 200,
        message: "Task updated successfully",
        context:'TasksService - updateTask',
        data: updatedTask
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TasksService - updateTask',
        error: error.message
      }
    }
  }

  async markAsComplete(uid: string, completionStatus: boolean): Promise<Result> {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: { uid }
      });
      if (!task) {
        return {
          status: 404,
          message: "Task not found",
          context: 'TasksService - updateCompletionStatus',
        };
      }

      const updatedTask = await this.prisma.tasks.update({
        where: { uid },
        data: {
          completionStatus:true,
        },
      });

      return {
        status: 200,
        message: "Task completion status updated successfully",
        context: 'TasksService - updateCompletionStatus',
        data: updatedTask
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context: 'TasksService - updateCompletionStatus',
        error: error.message
      };
    }
  }

  async deleteTask(uid: string): Promise<Result> {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: { uid }
      })
      if (!task) {
        return {
          status: 404,
          message: "Task not found",
          context:'TasksService - deleteTask',
        }
      }

      const deletedTask = await this.prisma.tasks.delete({
        where: { uid }
      })

      return {
        status: 200,
        message: "Task deleted successfully",
        context:'TasksService - deleteTask',
        data: deletedTask
      }
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        context:'TasksService - deleteTask',
        error: error.message
      }
    }
  }
}
