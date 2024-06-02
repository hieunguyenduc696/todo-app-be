import { NextFunction } from 'express';
import { TypedRequest, TypedResponse } from '../common';
import { ITodo } from '../schemas/todo.schema';
import { ErrorCode, ErrorException } from '../errors';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { validate } from 'class-validator';
import { TodoService } from '../services';

export const getToDoCollections = async (
  req: TypedRequest,
  res: TypedResponse<{
    statusCode: 200;
    todos: ITodo[];
  }>,
  next: NextFunction,
) => {
  try {
    const todoCollections: ITodo[] = await TodoService.get();
    res.status(200).json({
      todos: todoCollections,
      statusCode: 200,
    });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const createNewTodoItem = async (
  req: TypedRequest<never, CreateTodoDTO, never>,
  res: TypedResponse<{
    statusCode: 201;
    todo: ITodo;
  }>,
  next: NextFunction,
) => {
  const newTodo = new CreateTodoDTO(req.body);

  // verify input parameters
  const errors = await validate(newTodo);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create Todo data
  try {
    const todo = await TodoService.create(newTodo);

    res.status(201).json({ statusCode: 201, todo });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const deleteTodoItem = async (
  req: TypedRequest<{ todoId: string }>,
  res: TypedResponse<{
    statusCode: 200;
  }>,
  next: NextFunction,
) => {
  try {
    await TodoService.deleteOne(req.params.todoId);

    console.log('here');
    res.status(200).json();
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
