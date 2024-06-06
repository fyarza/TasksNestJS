import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service.spec';
import { TaskDTO } from './dto/task.dto';

// https://medium.com/@developerwhoismean/understanding-exceptions-in-nestjs-6a2954ac4903 exceptions
@Controller('v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() taskDTO: TaskDTO) {
    // throw new NotFoundException('User not found');
    throw new InternalServerErrorException('Something went wrong');
    throw new ForbiddenException('Access denied');
    throw new UnauthorizedException('Invalid credentials');
    throw new BadRequestException('Invalid input data');
    throw new NotFoundException('User not found');
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
