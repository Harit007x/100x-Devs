import express from 'express';
import { kanbanController } from '../controllers/kanban_controller';

export const kanbanRouter = express.Router()

// todo controller
const {
    fetchALlTodo,
    createTask,
    createCategory,
    updateTask,
    updateMapping,
    deleteTask,
    deleteCategory
} = kanbanController;

kanbanRouter.get('/get-all-tasks', fetchALlTodo)
kanbanRouter.post('/add-task', createTask)
kanbanRouter.put('/update-task', updateTask)
kanbanRouter.put('/delete-task', deleteTask)
kanbanRouter.put('/delete-category', deleteCategory)
kanbanRouter.post('/add-category', createCategory)
kanbanRouter.put('/mapping', updateMapping)