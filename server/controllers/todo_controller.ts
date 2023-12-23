import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import TaskModel from '../models/task_model';
import CategoryModel from '../models/category_model';
import MappingModel from '../models/mapping_model';

const fetchALlTodo = async (req:Request, res:Response) => {
    try {
        const {user_id} = req.body        // Use the find method to get all TODO items from the database
        const query: any = {};
        
        // undefined check
        user_id && (query.user_id = user_id)
        // category_id && (query.category = category_id)
        
        const processed_data:any = []
        // const user_categories = await CategoryModel.find(query).select(['_id', 'index', 'title'])
        // const todos = await TaskModel.find(query);
        const boardMapping:any = await MappingModel.find(query);

        // const temp = async (id:any) => {

        //     //   Convert the ID string to ObjectId
        //     const objectId = new ObjectId(id);
        //     const todos = await TaskModel.findOne({ _id: objectId });
        //     return todos
        // }
        let temp_data:any = {
            'id': '',
            'title': '',
            'index': -1,
            'taskItems': []
        }
        
        console.log("board mappings =", boardMapping[0].mapping)
        // const fetchTasksByIds = async (ids: string[]) => {
        //   console.log("All ids =", ids)
        //     const objectIdArray = ids.map(id => new ObjectId(id));
        //     return TaskModel.find({ _id: { $in: objectIdArray } }).select(['_id', 'task_name', 'description', 'badge_text', 'badge_color']);
        //   };
        const fetchTasksByIds = async (ids_array: string[]) => {
          console.log("All ids =", ids_array);
        
          const objectIdArray = ids_array.map(id => new ObjectId(id));
        
          const tasks = await TaskModel.find({ _id: { $in: objectIdArray } })
            .select(['_id', 'task_name', 'description', 'badge_text', 'badge_color'])
            .lean(); // Convert Mongoose documents to plain JavaScript objects
        
          // Create a map to quickly look up tasks by ID
          const taskMap = new Map();
          tasks.forEach(task => taskMap.set(task._id.toString(), task));
        
          // Order the tasks based on the order of input IDs
          const orderedTasks = ids_array.map(id => taskMap.get(id));
        
          return orderedTasks;
        };
        
        // const fetchTasksByIds = async (ids: string[]) => {
        //   console.log("All ids =", ids)
        //     let data:any = []
        //     if(ids.length == 0){
        //       return
        //     }
        //     const objectIdArray = ids.map(id => new ObjectId(id));
        //     for (const id of objectIdArray) {
        //       console.log("called id =", id);
              
        //       const task = await TaskModel.findOne({ _id: id }).select(['_id', 'task_name', 'description', 'badge_text', 'badge_color']);
        //       console.log("task zero =", task)
        //       if (task) {
        //         data.push(task);
        //       }
        //     }

        //     // TaskModel.find({ _id: { $in: objectIdArray } }).select(['_id', 'task_name', 'description', 'badge_text', 'badge_color']);
            
        //     return data
        //   };
          
          for (const item of boardMapping[0].mapping) {
            const temp_data: any = {
              'id': item.id,
              'title': item.title,
              'taskItems': []
            };
          
            const tasks = await fetchTasksByIds(item.taskItems);

            console.log("Tasks are this = ", tasks)
            const modifiedTasks = tasks.map((task:any) => {
                const { _id } = task;

                // Remove the 'index' property from each 'taskItem'
                let modifiedTaskItems = {id: _id.toString(), task_name: task.task_name, description: task.description, badge_text: task.badge_text, badge_color: task.badge_color}
                // delete modifiedTaskItems._id
            
                return modifiedTaskItems;
              });
            temp_data.taskItems = modifiedTasks;
          
            processed_data.push(temp_data);
          }
        // user_categories.map((category:any, index:number) => {
        //     console.log("category ", category)
        //     temp_data.id = category._id,
        //     temp_data.title = category.title
        //     temp_data.index = category.index
        //     todos.map((task:any, index:any) => {
        //         if(task.category == category._id.toString()){
        //             temp_data.taskItems.push({
        //                 "id": task._id,
        //                 "index": task.index,
        //                 "task_name": task.task_name,
        //                 "description": task.description,
        //                 "badge_text": task.badge_text,
        //                 "badge_color": task.badge_color
        //             })
        //         }
        //     })
        //     // console.log("wowo =", temp_data)
        //     processed_data.push(temp_data)
        //     temp_data = {
        //         'title': '',
        //         'index': -1,
        //         'taskItems': []
        //     }
        // })

        // Sort the outer array based on the 'index' property
        // processed_data.sort((a:any, b:any) => a.index - b.index);
        // // Sort the 'taskItems' array for each object based on the 'index' property
        // processed_data.forEach((item:any) => item.taskItems.sort((a:any, b:any) => a.index - b.index));

        res.status(200).json({ success: true, data: processed_data });
    } catch (error) {
        // Handle errors
        console.error('Error fetching TODO items:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const createCategory = async (req:Request, res:Response) => {
    // console.log("data =", req.body)
    try {
        const { user_id, title } = req.body;
    
        const newCategory = new CategoryModel({
            title,
            user_id,
        });

        const savedCategory = await newCategory.save();
        console.log("cate =", savedCategory)
        const mapping_obj = await MappingModel.findOne({user_id: user_id});
        mapping_obj?.mapping.push(
          {
            "id": savedCategory._id.toString(),
            "title": savedCategory.title,
            "taskItems":[]
          }
        )
        const savingMapping = await mapping_obj?.save()

        res.status(201).json({ success: true, data: savedCategory });
    } catch (error) {
        console.error('Error creating TODO:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const createTask = async (req:Request, res:Response) => {
    // console.log("data =", req.body)
    try {
        const {
            user_id,
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

        res.status(201).json({ success: true, data: savedTodo });
    } catch (error) {
        console.error('Error creating TODO:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const updateMapping = async (req:Request, res:Response) => {
    // console.log("data =", req.body)
    try {
        const { user_id, mapping } = req.body;
    
        // Check if user_id already exists in the database
        const existingMapping = await MappingModel.findOne({ user_id });
        console.log("existeing mapping =", existingMapping)
        if (existingMapping) {
          console.log("min if i fi fi fif  =", mapping)
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

const deleteTask = async (req: Request, res: Response) => {
  try {
      const { user_id, task_id, category_id } = req.body;

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
          return res.status(200).json({ success: true, data: { task_obj_id }, message: 'Task deleted successfully' });
      } else {
          return res.status(404).json({ success: false, error: 'Task not found' });
      }
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
      const { user_id, category_id } = req.body;

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
      console.log("Remv ", indexToRemove)
      mapping_obj?.mapping.splice(indexToRemove, 1)

      // Save the updated mapping
      const savingMapping = await mapping_obj?.save()

      // Check if the category was found and deleted
      if (deletedCategory.deletedCount === 1) {
          return res.status(200).json({ success: true, data: { category_obj_id }, message: 'Category deleted successfully' });
      } else {
          return res.status(404).json({ success: false, error: 'Category not found' });
      }
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// export all
export const todoController = {
    createCategory,
    createTask,
    fetchALlTodo,
    updateMapping,
    deleteTask,
    deleteCategory,
};