import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { filePath } from '../common/constants/global.constatns';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll(): Promise<CreateTaskDto[]> {
    const data = await fs.readFile(filePath);
    console.log(data);

    const tasks = JSON.parse(data.toString());

    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
