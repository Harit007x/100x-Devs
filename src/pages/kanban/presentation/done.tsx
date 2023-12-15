import KanbanCard from "@/components/kanbanCard";
import DragAndDropHook from "@/hooks/dragAndDropHook";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Done = () => {
  // const doneInitialList = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  //   const custom: any = {
  //     id: `id-${k+1}`,
  //     content: `Quote ${k+1}`,
  //     title: `Hi title text ${k+1}`
  //   };
    
  //   return custom;
  // });

  const {reorder} = DragAndDropHook();

  const temp = [
    {
      id: '1',
      title: 'Task 1',
      description: 'consectetur adipiscing amet, et Sed do adipiscing Lorem incididunt',
      badgeText: 'Done',
      badgeTheme: 'green',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'magna ut amet, amet, dolor Lorem elit. do magna Lorem eiusmod aliqua.',
      badgeText: 'In-Progress',
      badgeTheme: 'blue',          
    },
    {
      id: '2',
      title: 'Task 2',
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
      
  const [doneTasks,setDoneTasks] = useState<any>({ 'dones' : temp});
    
  // D&D methods

  // const reorder = (list:any, startIndex:any, endIndex:any) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // };
    
  const onDragEnd = (result:any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const dones = reorder(
      doneTasks.dones,
      result.source.index,
      result.destination.index
    );

    setDoneTasks({dones});
  };
    
  const List = (props:any) => {
    return(
      <Draggable draggableId={props.item.id} index={props.index}>
        {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
            <KanbanCard
                title={props.item.title}
                description={props.item.description}
                badgeText={props.item.badgeText}
                badgeTheme={props.item.badgeTheme}
            />
            </div>
        )}
      </Draggable>
    )
  }
    
  const RenderList = (items:any) =>{
    return(
      items.dones?.map((item:{id:string, index:number}, index:number)=>{
      return(
      <List item={item} index={index} key={item.id} />
      )})
    )
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"todo"}>
        {(provided) => (
          <div 
            ref={provided.innerRef}
            className="flex w-96 flex-col gap-4"
            {...provided.droppableProps}
          >
          <RenderList dones={doneTasks.dones}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Done