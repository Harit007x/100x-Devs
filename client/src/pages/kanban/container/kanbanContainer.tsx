import { DropItem, TaskList } from '@/types';
import Kanban from '../presentation/kanban';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

type commonType = {
  index: number;
  droppableId: string;
};

function KanbanContainer() {
  
  const reorder = (list:TaskList, startIndex: number, endIndex: number) => {
    const result = Array.from(list.taskItems);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return {"title": list.title, "taskItems": result };
  };

  const [defaultTasks, setDefaultTasks] = useState<TaskList[]>([]);

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

  const [state, setState] = useState<TaskList[]>([]);
  const onDragEnd = (result:any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  }
  const [addCategory, setAddCategory] = useState<string>('');

  const handleAddingCategory = (category: string) => {
    const words = category.split(" ");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(" ");
    setState([...state, {'title': capitalizedString, 'taskItems': []}])
    setDefaultTasks([...defaultTasks,{'title': capitalizedString, 'taskItems': []}])
    setAddCategory('')
    toast({
      variant:'default',
      description: `Category created successfully.`,
    })

  }

  const handleAddTask = (formData:any) => {
    const updatedTotal: any = state.map((list) => {
      if (list.title === formData.title) {
        return {
          ...list,
          taskItems: [
            ...list.taskItems,
            {
              id: `item-${Date.now()}`,
              task_name: formData.task_name,
              description: formData.description,
              badge_text: formData.badge_text,
              badge_color: formData.badge_color,
            }
          ],
        };
      }
      return list;
    }
    );
    setState(updatedTotal);
    toast({
      variant:'default',
      description: `Task created successfully.`,
    })
  }

  return (
    <div className='h-screen'>
      <Kanban
        state={state}
        setState={setState}
        onDragEnd={onDragEnd}
        addCategory={addCategory}
        setAddCategory={setAddCategory}
        handleAddingCategory={handleAddingCategory}
        handleAddTask={handleAddTask}
      />
    </div>
  )
}

export default KanbanContainer;