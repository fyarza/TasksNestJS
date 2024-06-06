import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service.spec';
import { TaskDTO } from './dto/task.dto';

@Controller('v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() taskDTO: TaskDTO) {
    return this.taskService.create(taskDTO);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post(':id')
  method(@Param('id') id: string) {
    return {
      id,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() taskDTO: TaskDTO) {
    return this.taskService.update(id, taskDTO);
  }

  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
