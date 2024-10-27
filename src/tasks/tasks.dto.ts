import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Priority } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsArray()
  @IsNotEmpty()
  Tags: number[];
}


export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsArray()
  @IsNotEmpty()
  Tags: number[];
}
