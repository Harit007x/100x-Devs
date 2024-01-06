import { DropItem, TaskList } from '@/types';
import Kanban from '../presentation/kanban';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KanbanContainer() {
  let navigate = useNavigate();
  const [state, setState] = useState<TaskList[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<TaskList[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/kanban/get-all-tasks',  {
        withCredentials: true,
      });
      setState(response.data.data);
      setDefaultTasks(response.data.data);
    } catch (error) {
      console.log("Error =", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function
  }, []);

  const updateMapping = async (user_id:any, mapping: any) => {
    try {
      console.log("oho ho ")
      const response = await axios.put('http://localhost:3000/kanban/mapping', {
        user_id: user_id,
        mapping: mapping,
      },  {
        withCredentials: true,
      });
    } catch (error) {
      navigate('/');
      console.log("Error =", error);
    }
  };

  const reorder = (list:TaskList, startIndex: number, endIndex: number) => {
    const result = Array.from(list.taskItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return {"title": list.title, "taskItems": result };
  };

  const move = (source: TaskList, destination: TaskList, droppableSource: DropItem, droppableDestination: DropItem) => {
    const sourceClone = Array.from(source.taskItems);
    const destClone = Array.from(destination.taskItems);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);
    const result: TaskList[] = [...defaultTasks];
    result[Number(droppableSource.droppableId)].taskItems = sourceClone;
    result[Number(droppableDestination.droppableId)].taskItems = destClone;
    return result;
  };

  const onDragEnd = (result:any) => {
    let transformedData :any = []
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      // console.log("data =", state)
      let items:any = reorder(state[sInd], source.index, destination.index);
      // console.log('reordered=', items)
      const newState = [...state];
      items = {...items,"id": state[sInd].id}
      console.log("Items :", items)
      newState[sInd] = items;
      console.log("check added =", newState)
      // newState[sInd] = state[sInd];
      
      // console.log("whl data =", data)
      // console.log("new data =", newState)
      transformedData = newState.map((category:any) => {
        const { id, title, taskItems } = category;
    
        // Remove the 'index' property from each 'taskItem'
        const modifiedTaskItems = taskItems.map((item:any) => {
            const { id } = item;
            return id ;
        });
    
        return { id, title, taskItems: modifiedTaskItems };
      });
      // console.log("up transform =.", transformedData)
      // setMapping(transformedData);
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      transformedData = newState.map((category:any) => {
        const { id, title, taskItems } = category;
    
        // Remove the 'index' property from each 'taskItem'
        const modifiedTaskItems = taskItems.map((item:any) => {
            const { id } = item;
            return id ;
        });
    
        return { id, title, taskItems: modifiedTaskItems };
      });
      console.log("down transform =", transformedData)
      
      // setMapping(transformedData);
      
      setState(newState);
    }
    // console.log("mapping data =", transformedData)
    updateMapping(1, transformedData)
  }

  const handleAddCategory = async (category_title : string) => {
    console.log("castegroy added =", category_title)
    try {
      console.log("oho ho ")
      const response = await axios.post('http://localhost:3000/kanban/add-category', {
        "user_id": 1,
        "title": category_title
      },  {
        withCredentials: true,
      });

      fetchData()

      toast({
        description: response.data.message,
      })

    } catch (error) {
      navigate('/');
      console.log("Error =", error);
    }finally{
    }
  }

  const handleAddTask = async (formData:any) => {
    try {
      console.log("oho ho ")
      const response = await axios.post('http://localhost:3000/kanban/add-task', {
        "user_id": 1,
        "task_name": formData.task_name,
        "description": formData.description,
        "badge_text": formData.badge_text,
        "badge_color": formData.badge_color,
        "category_id": formData.category_id
      },  {
        withCredentials: true,
      });

      fetchData()

      toast({
        description: response.data.message,
      })

    } catch (error) {
      navigate('/');
      console.log("Error =", error);
    }finally{
    }
  }

  const handleUpdateTask = async (formData:any) => {
    try {
      console.log("oho ho =", formData)
      const response = await axios.put('http://localhost:3000/kanban/update-task', {
        "user_id": 1,
        "task_id": formData.task_id,
        "task_name": formData.task_name,
        "description": formData.description,
        "badge_text": formData.badge_text,
        "badge_color": formData.badge_color,
      },  {
        withCredentials: true,
      });

      fetchData()

      toast({
        description: response.data.message,
      })

    } catch (error) {
      navigate('/');
      console.log("Error =", error);
    }finally{
    }
  }

  const handleDeleteTask = async (user_id: number, task_id: string, category_id: string) => {
    console.log("checking the data =", user_id, task_id, category_id)
    try {
      console.log("oho ho ")
      const response = await axios.put('http://localhost:3000/kanban/delete-task', {
        user_id: user_id,
        task_id: task_id,
        category_id: category_id
      },  {
        withCredentials: true,
      });
      
      fetchData()

      toast({
        description: response.data.message,
      })
    
    } catch (error) {
      navigate('/');
      console.log("Error =", error);
    }finally{
    }
  }

  const handleDeleteCategory = async (user_id: number, category_id: string) => {
    console.log("checkl params =", user_id, category_id)
    try {
      console.log("oho ho ")
      const response = await axios.put('http://localhost:3000/kanban/delete-category', {
        user_id: user_id,
        category_id: category_id
      },  {
        withCredentials: true,
      });
      
      fetchData()

      toast({
        description: response.data.message,
      })
    
    } catch (error) {
      navigate('/');
      console.log("Error =", error);
    }finally{
    }
  }

  // console.log("board data =", state)
  return (
    <div className='h-full'>
      <Kanban
        state={state}
        setState={setState}
        onDragEnd={onDragEnd}
        handleAddCategory={handleAddCategory}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
        handleDeleteCategory={handleDeleteCategory}
      />
    </div>
  )
}

export default KanbanContainer;