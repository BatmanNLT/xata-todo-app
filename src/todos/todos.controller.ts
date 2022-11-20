import { Controller, Get } from '@nestjs/common';
import { Todo } from './todo.model';

@Controller('todos')
export class TodosController {
  @Get()
  findAll(): Todo[] {
    return [
      {
        id: 'fjkdf',
        title: 'Example Todo',
        description: 'An example of Todo',
        priority: 'HIGH',
        status: 'OPEN',
      },
    ];
  }
}
