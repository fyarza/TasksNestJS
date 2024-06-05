import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  tasks: ITask[] = [];
  create(taskDTO: TaskDTO): ITask {
    const task = {
      id: uuidv4(),
      ...taskDTO,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, taskDTO: TaskDTO): ITask {
    const index = this.tasks.findIndex((t) => t.id === id);
    const newTask = { id, ...taskDTO };
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...newTask,
      };
    }
    return newTask;
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }

    return false;
  }
}
