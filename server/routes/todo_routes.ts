import express from 'express';
import { Request, Response } from 'express';
import { todoController } from '../controllers/todo_controller';

export const todoRouter = express.Router()

// todo controller
const {
    fetchALlTodo,
    createTask,
    createCategory,
    updateTask,
    updateMapping,
    deleteTask,
    deleteCategory
} = todoController;

todoRouter.get('/get-all-tasks', fetchALlTodo)
todoRouter.post('/add-task', createTask)
todoRouter.put('/update-task', updateTask)
todoRouter.put('/delete-task', deleteTask)
todoRouter.put('/delete-category', deleteCategory)
todoRouter.post('/add-category', createCategory)
todoRouter.put('/mapping', updateMapping)