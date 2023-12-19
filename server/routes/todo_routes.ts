import express from 'express';
import { Request, Response } from 'express';
import { todoController } from '../controllers/todo_controller';

export const todoRouter = express.Router()

// todo controller
const {fetchALlTodo, createTodo} = todoController;

todoRouter.get('/', fetchALlTodo)
todoRouter.post('/',createTodo)
