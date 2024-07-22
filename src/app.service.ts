import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  @OnEvent('TASK-CREATED-SUCCESFULLY')
  onNewTask(id: string): void {
    console.log(`NUEVA TAREA: ${id}`);
  }
}
