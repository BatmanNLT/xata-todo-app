import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getXataClient } from 'src/xata';
import { ConfigService } from '@nestjs/config';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo, TodoStatus } from './todo.model';

@Injectable()
export class TodosService {
  constructor(private configService: ConfigService) {}

  private xataClient = getXataClient({
    apiKey: this.configService.get<string>('XATA_API_KEY'),
    branch: this.configService.get<string>('XATA_DATACLIENT_BRANCH'),
  });

  async findAll() {
    try {
      const todos = await this.xataClient.db.todos.getAll();
      return todos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const todo = await this.xataClient.db.todos.read(id);

      if (!todo) {
        throw new NotFoundException(`No Todo found with id: ${id}`);
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
      throw new InternalServerErrorException(error);
    }
  }

  async createOne(createTodoDto: CreateTodoDto) {
    const { title, description, priority } = createTodoDto;
    const newTodo: Partial<Todo> = {
      title,
      description,
      priority,
      status: TodoStatus.OPEN,
    };
    try {
      const createdRecord = await this.xataClient.db.todos.create(newTodo);
      return createdRecord;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
