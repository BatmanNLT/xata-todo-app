import { Injectable } from '@nestjs/common';
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
    console.log(
      '🚀 ~ file: todos.service.ts ~ line 10 ~ TodosService ~ findAll ~ todos',
      todos,
    );
    return todos;
  }
}
