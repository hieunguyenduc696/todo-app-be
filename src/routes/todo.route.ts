import { Router } from 'express';
import { getToDoCollections, createNewTodoItem, deleteTodoItem } from '../controllers/todo.controller';

const router = Router();

router.get('/', getToDoCollections);
router.post('/', createNewTodoItem);
router.delete('/:todoId', deleteTodoItem);

export { router as TodoRouter };
