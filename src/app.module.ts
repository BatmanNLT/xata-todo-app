import { Module } from '@nestjs/common';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TodosModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TodosController],
  providers: [],
})
export class AppModule {}
