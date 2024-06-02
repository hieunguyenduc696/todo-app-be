import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ITodo {
  content: string;
}

// 2. Create a Schema corresponding to the document interface.
const todoSchema = new Schema<ITodo>({
  content: { type: String, required: true },
});

// 3. Create a Model.
export const Todo = model<ITodo>('Todo', todoSchema);
