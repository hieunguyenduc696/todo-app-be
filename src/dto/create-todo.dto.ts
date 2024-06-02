import { IsString, MaxLength, MinLength } from 'class-validator';
import { ITodo } from '../schemas/todo.schema';

// Model for creating todo in database.
export type CreateTodo = Pick<ITodo, 'content'>;

// Validation model which comes to the API.
export class CreateTodoDTO implements CreateTodo {
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  content: string;

  public constructor(createTodoDto: CreateTodo) {
    this.content = createTodoDto.content;
  }
}
