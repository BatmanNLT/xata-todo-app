import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getXataClient } from 'src/xata';
import { ConfigService } from '@nestjs/config';
import { UpdateTodoDto } from './dtos/update-todo.dto';

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

  async updateOne(id: string, updateTodoDto: UpdateTodoDto) {
    if (Object.keys(updateTodoDto).length === 0) {
      throw new BadRequestException('Provide payload when updating a record');
    }
    const updatePayload: Partial<UpdateTodoDto> = {};
    ['title', 'description', 'priority', 'status'].forEach((key) => {
      if (updateTodoDto[key]) {
        updatePayload[key] = updateTodoDto[key];
      }
    });

    try {
      const updatedTodo = await this.xataClient.db.todos.update(
        id,
        updatePayload,
      );
      if (!updatedTodo) {
        throw new NotFoundException(`No Todo found with id: ${id}`);
      }
      return updatedTodo;
    } catch (error) {
      console.log(error);
    }
  }
}
