import { TodoPriority, TodoStatus } from '../todo.model';
import { IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status: TodoStatus;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority: TodoPriority;
}
