import express from 'express';
import { Request, Response } from 'express';
import TodoModel from '../models/todo_model';

const fetchALlTodo = async (req:Request, res:Response) => {
    try {
        // Use the find method to get all TODO items from the database
        const todos = await TodoModel.find();

        // Send the TODO items as a JSON response
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        // Handle errors
        console.error('Error fetching TODO items:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const createTodo = async (req:Request, res:Response) => {
    // console.log("data =", req.body)
    try {
        const { title, completed, description } = req.body;
    
        const newTodo = new TodoModel({
          title,
          completed: completed || false,
          description,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json({ success: true, data: savedTodo });
    } catch (error) {
        console.error('Error creating TODO:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

// export all
export const todoController = {
    fetchALlTodo,
    createTodo,
};