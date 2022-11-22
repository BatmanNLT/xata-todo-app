import { TodoPriority } from '../todo.model';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TodoPriority)
  priority: TodoPriority;
}
