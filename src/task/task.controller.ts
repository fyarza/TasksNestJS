import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service.spec';
import { TaskDTO } from './dto/task.dto';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() taskDTO: TaskDTO) {
    return this.taskService.create(taskDTO);
  }

  @Post(':id')
  method(@Param('id') id: string) {
    return {
      id,
    };
  }

  @Get('done')
  methodGet(@Req() req: Request) {
    return `method ${req.method}`;
  }

  @Put('update')
  methodPut(@Req() req: Request) {
    return `method ${req.method}`;
  }

  @Patch('update2')
  methodPatch(@Req() req: Request) {
    return `method ${req.method}`;
  }

  @Delete('delete')
  methodDelete(@Req() req: Request) {
    return `method ${req.method}`;
  }
}
