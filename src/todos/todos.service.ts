import { Injectable, NotFoundException } from '@nestjs/common';
import { getXataClient } from 'src/xata';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TodosService {
  constructor(private configService: ConfigService) {}

  private xataClient = getXataClient({
    apiKey: this.configService.get<string>('XATA_API_KEY'),
    branch: this.configService.get<string>('XATA_DATACLIENT_BRANCH'),
  });

  async findAll() {
    const todos = await this.xataClient.db.todos.getAll();
    return todos;
  }

  async findOne(id: string) {
    const todo = await this.xataClient.db.todos.read(id);

    if (!todo) {
      throw new NotFoundException(`No Todo found with id: ${id}`);
    }
    return todo;
  }
}
