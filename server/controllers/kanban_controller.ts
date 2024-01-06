import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import TaskModel from '../models/task_model';
import CategoryModel from '../models/category_model';
import MappingModel from '../models/mapping_model';

const fetchALlTodo = async (req:any, res:Response) => {
    try {
        const user_id = req.user._id
        const processed_data:any = []
        const boardMapping:any = await MappingModel.findOne({user_id: user_id});
        
        const fetchTasksByIds = async (ids_array: string[]) => {
        
          const objectIdArray = ids_array.map(id => new ObjectId(id));
        
          const tasks = await TaskModel.find({ _id: { $in: objectIdArray } })
            .select(['_id', 'task_name', 'description', 'badge_text', 'badge_color', 'createdAt', 'updatedAt'])
            .lean(); // Convert Mongoose documents to plain JavaScript objects
        
          // Create a map to quickly look up tasks by ID
          const taskMap = new Map();
          tasks.forEach(task => taskMap.set(task._id.toString(), task));
        
          // Order the tasks based on the order of input IDs
          const orderedTasks = ids_array.map(id => taskMap.get(id));
        
          return orderedTasks;
        };
          
        for (const item of boardMapping.mapping) {
          const temp_data: any = {
            'id': item.id,
            'title': item.title,
            'taskItems': []
          };
        
          const tasks = await fetchTasksByIds(item.taskItems);

          const modifiedTasks = tasks.map((task:any) => {
              const { _id } = task;

              // Remove the 'index' property from each 'taskItem'
              let modifiedTaskItems = {
                id: _id.toString(),
                task_name: task.task_name,
                description: task.description,
                badge_text: task.badge_text,
                badge_color: task.badge_color,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
              }
              // delete modifiedTaskItems._id
          
              return modifiedTaskItems;
            });
          temp_data.taskItems = modifiedTasks;
        
          processed_data.push(temp_data);
        }
        res.status(200).json({ success: true, data: processed_data });
    } catch (error) {
        // Handle errors
        console.error('Error fetching TODO items:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const createCategory = async (req:any, res:Response) => {
    try {
        const user_id = req.user._id.toString()
        const { title } = req.body;

        const capitalizeTitle = title[0].toUpperCase() + title.slice(1)

        const newCategory = new CategoryModel({
            "title": capitalizeTitle,
            user_id,
        });

        const savedCategory = await newCategory.save();
        const mapping_obj = await MappingModel.findOne({user_id: user_id});
        mapping_obj?.mapping.push(
          {
            "id": savedCategory._id.toString(),
            "title": savedCategory.title,
            "taskItems":[]
          }
        )
        const savingMapping = await mapping_obj?.save()

        res.status(201).json({ success: true, data: {}, message: "Category Created Successfully" });
    } catch (error) {
        console.error('Error creating TODO:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const createTask = async (req:any, res:Response) => {
    try {

        const user_id = req.user._id.toString()

        const {
            task_name,
            description,
            badge_text,
            badge_color,
            category_id 
        } = req.body;

        const newTodo = new TaskModel({
            user_id,
            task_name,
            description,
            badge_text,
            badge_color,
            category_id
        });

        const savedTodo = await newTodo.save();

        // update the same in the respective mapping object
        const mapping_obj = await MappingModel.findOne({user_id: user_id});
        mapping_obj?.mapping.forEach((category:any) => {
          if (category.id === savedTodo.category_id.toString()) {
            // Find the index of the taskItem with the target id in the category's taskItems array
            const added_task_id = category.taskItems.unshift(savedTodo._id.toString())
          }
        });
        const savingMapping = await mapping_obj?.save()

        res.status(201).json({ success: true, data: {}, message: "Task Created Successfully" });
    } catch (error) {
        console.error('Error creating TODO:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const updateTask = async (req:Request, res:Response) => {
  try {
    const { task_id, task_name, description, badge_text, badge_color } = req.body;
    const task_obj_id = new ObjectId(task_id);
    
    const task_obj = await TaskModel.findById(task_obj_id);

    // Check if the task is found
    if (!task_obj) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    
    // Update the properties of the fetched object
    task_obj.task_name = task_name;
    task_obj.description = description;
    task_obj.badge_text = badge_text;
    task_obj.badge_color = badge_color;

    // Save the updated task object
    await task_obj.save();


    res.status(202).json({success: true, data: {}, message: 'Task Updated Successfully'})
    
    } catch (error) {
      console.error('Error updating or creating mapping:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const updateMapping = async (req:any, res:Response) => {
    try {
        const user_id = req.user._id.toString()
        const { mapping } = req.body;
    
        // Check if user_id already exists in the database
        const existingMapping = await MappingModel.findOne({ user_id });
        if (existingMapping) {
          // If user_id exists, update the existing document
          existingMapping.mapping = mapping;
          const updatedMapping = await existingMapping.save();
          res.status(200).json({ success: true, data: updatedMapping });
        } else {
          // If user_id doesn't exist, create a new document
          const newMapping = new MappingModel({
            user_id,
            mapping,
          });
    
          const savedMapping = await newMapping.save();
          res.status(201).json({ success: true, data: savedMapping });
        }
      } catch (error) {
        console.error('Error updating or creating mapping:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
}

const deleteTask = async (req: any, res: Response) => {
  try {
      const user_id = req.user._id.toString()
      const { task_id, category_id } = req.body;
      const task_obj_id = new ObjectId(task_id)
      const category_obj_id = new ObjectId(category_id)
      
      // Check if id is provided
      if (!task_obj_id) {
          return res.status(400).json({ success: false, error: 'Task task_obj_id is required for deletion' });
      }

      // Use Mongoose's deleteOne method to delete the task by _task_obj_id
      const deletedTask = await TaskModel.deleteOne({ _id: task_obj_id });

      // Updating the mapping by removing the incoming task id
      const mapping_obj = await MappingModel.findOne({user_id: user_id});
      mapping_obj?.mapping.forEach((category:any) => {
        if (category.id === category_id) {
          // Find the index of the taskItem with the target id in the category's taskItems array
          const indexToRemove = category.taskItems.findIndex((taskItem:any) => taskItem === task_id);
          
          // Remove the taskItem if found
          if (indexToRemove !== -1) {
            category.taskItems.splice(indexToRemove, 1);
          }
        }
      });
      // Save the updated mapping
      const savingMapping = await mapping_obj?.save()
      
      // Check if the task was found and deleted
      if (deletedTask.deletedCount === 1) {
          return res.status(200).json({ success: true, data: { task_obj_id }, message: 'Task Deleted Successfully' });
      } else {
          return res.status(404).json({ success: false, error: 'Task not found' });
      }
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req: any, res: Response) => {
  try {
      const user_id = req.user._id.toString()
      const { category_id } = req.body;

      const category_obj_id = new ObjectId(category_id)
      
      // Check if id is provided
      if (!category_obj_id) {
          return res.status(400).json({ success: false, error: 'Task task_obj_id is required for deletion' });
      }

      // Use Mongoose's deleteOne method to delete the task by _task_obj_id
      const deletedCategory = await CategoryModel.deleteOne({ _id: category_obj_id });

      // Updating the mapping by removing the incoming task id
      const mapping_obj = await MappingModel.findOne({user_id: user_id});
      const indexToRemove:any = mapping_obj?.mapping.findIndex((categoryItem:any) => categoryItem.id === category_id);
      mapping_obj?.mapping.splice(indexToRemove, 1)

      // Save the updated mapping
      const savingMapping = await mapping_obj?.save()

      // Check if the category was found and deleted
      if (deletedCategory.deletedCount === 1) {
          return res.status(200).json({ success: true, data: { category_obj_id }, message: 'Category Deleted Successfully' });
      } else {
          return res.status(404).json({ success: false, error: 'Category not found' });
      }
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// export all
export const kanbanController = {
    createCategory,
    createTask,
    fetchALlTodo,
    updateTask,
    updateMapping,
    deleteTask,
    deleteCategory,
};