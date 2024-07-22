import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { filePath } from '../common/constants/global.constatns';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private eventEmitter: EventEmitter2) {}

  async create(createTaskDto: CreateTaskDto) {
    const id = randomUUID();
    const data: TaskDto[] = await this.findAll();
    const obj = {
      id,
      ...createTaskDto,
    };
    data.push(obj);
    await fs.writeFile(filePath, JSON.stringify(data));
    this.eventEmitter.emit('TASK-CREATED-SUCCESFULLY', id);

    return obj;
  }

  async findAll(sort?: string): Promise<TaskDto[]> {
    const data = await fs.readFile(filePath);
    const tasks: TaskDto[] = JSON.parse(data.toString());

    const isScheduledTime = sort === 'scheduledTime' && 'scheduledTime';

    if (isScheduledTime) {
      return tasks.sort((task1, task2) => {
        const time1 = new Date(task1.scheduledTime).getTime() || 0;
        const time2 = new Date(task2.scheduledTime).getTime() || 0;

        return time2 - time1;
      });
    }

    return tasks.sort((task1, task2) => task2[sort] - task1[sort]);
  }

  async findOne(id: string) {
    const data = await this.findAll();
    const task = data.find((element) => element.id === id);
    if (!task) throw new NotFoundException();
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const data = await this.findAll();
    const index = data.findIndex((element) => element.id === id);
    if (!data[index]) throw new BadRequestException();
    data[index] = { ...data[index], ...updateTaskDto };
    fs.writeFile(filePath, JSON.stringify(data));
    return data[index];
  }

  async remove(id: string) {
    const tasks = await this.findAll();
    const index = tasks.findIndex((element) => element.id === id);

    if (!tasks[index]) throw new BadRequestException();

    tasks.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(tasks));
    return 'tarea borrada';
  }
}
