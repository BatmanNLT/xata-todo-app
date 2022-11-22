import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateOne(id, updateTodoDto);
  }

  @Post()
  createOne(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createOne(createTodoDto);
  }
}
