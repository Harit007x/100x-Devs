import { DoneItemsState, InProgressItemsState, Task, TodoItemsState } from '@/types';
import React, { useState } from 'react'

type commonType = {
    index: number;
    droppableId: string;
};

const DragAndDropHook = () => {
    const temp = [
        {
            id: '1',
            title: 'Task 1',
            description: 'consectetur adipiscing amet, et Sed do adipiscing Lorem incididunt',
            badgeText: 'In-Progress',
            badgeTheme: 'blue'
        },
        {
            id: '2',
            title: 'Task 2',
            description: 'magna ut amet, amet, dolor Lorem elit. do magna Lorem eiusmod aliqua.',
            badgeText: 'Done',
            badgeTheme: 'green'
        },
        {
            id: '3',
            title: 'Task 3',
            description: 'do amet, labore Lorem sit labore eiusmod dolor eli',
            badgeText: 'Todo',
            badgeTheme: 'orange'
        },
        {
            id: '5',
            title: 'Task 5',
            description: 'adipiscing adipiscing elit. do tempor ipsum tempor Lorem dolore dolore ipsum magna.',
            badgeText: 'In-Progress',
            badgeTheme: 'blue'
        },
        {
            id: '4',
            title: 'Task 4',
            description: 'elit. amet, incididunt dolor Lorem incididunt eiusmod elit. do ipsum magna sit aliqua.',
            badgeText: 'Todo',
            badgeTheme: 'orange'
        }
    ]
    
    const [todoItems,setTodoItems] = useState<TodoItemsState>({ 'todos' : temp});
    const [inProgressItems, setInProgressItems] = useState<InProgressItemsState>({ 'inProgress' : temp});
    const [doneTasks,setDoneTasks] = useState<DoneItemsState>({ 'dones' : temp});
    
    const onDragEnd = (result:any) => {
        const { source, destination } = result;
        console.log("ids =", source, destination)
        console.log("Temp =", source.droppableId, destination.droppableId)
        if (!destination) {
          return;
        }
    
        if (destination.index === source.index) {
          return;
        }

        const todos:Task[] = reorder(
          todoItems.todos,
          source.index,
          destination.index
        );
        console.log("todos =", todos)
        setTodoItems({'todos' : todos});
    };
    
    console.log('updated todo =', todoItems)
    const move = (source:any, destination:any, droppableSource:commonType, droppableDestination:commonType) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
      
        destClone.splice(droppableDestination.index, 0, removed);
      
        const result: { [key: string]: any[] } = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        console.log("result =", result)
        return result;
    };
    
    const reorder = (list:any, startIndex:any, endIndex:any):Task[] => {
        console.log("ookc called")
        const result:Task[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        console.log("res =", result)
        return result;
    };
    
    return{
        todoItems,
        inProgressItems,
        doneTasks,
        onDragEnd,
        setTodoItems,
        setInProgressItems,
        setDoneTasks,
        move,
        reorder,
    }
}

export default DragAndDropHook