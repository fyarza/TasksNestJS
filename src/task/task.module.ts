import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service.spec';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
