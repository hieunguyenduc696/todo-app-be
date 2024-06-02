import { CreateTodoDTO } from '../dto/create-todo.dto';
import { ITodo, Todo } from '../schemas/todo.schema';

const get = () => {
  return Todo.find({});
};

const create = (createTodoDto: CreateTodoDTO): Promise<ITodo> => {
  return Todo.create(createTodoDto);
};

const deleteOne = (todoId: string): Promise<void | null> => {
  return Todo.findByIdAndDelete(todoId);
};

export { get, create, deleteOne };
