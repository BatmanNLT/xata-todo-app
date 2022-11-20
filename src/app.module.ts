import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TodosController],
  providers: [],
})
export class AppModule {}
