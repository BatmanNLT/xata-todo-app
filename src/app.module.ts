import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [],
})
export class AppModule {}
