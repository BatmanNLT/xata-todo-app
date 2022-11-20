import { Injectable } from '@nestjs/common';
import { getXataClient } from 'src/xata';

@Injectable()
export class TodosService {
  private xataClient = getXataClient();

  async findAll() {
    const todos = await this.xataClient.db.todos.getAll();
    console.log(
      '🚀 ~ file: todos.service.ts ~ line 10 ~ TodosService ~ findAll ~ todos',
      todos,
    );
    return todos;
  }
}
