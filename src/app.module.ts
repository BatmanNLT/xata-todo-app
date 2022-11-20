import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [TodosController],
  providers: [],
})
export class AppModule {}
