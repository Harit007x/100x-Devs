import Kanban from '../presentation/kanban';

type commonType = {
  index: number;
  droppableId: string;
};

function KanbanContainer() {
  const move = (source:any, destination:any, droppableSource:commonType, droppableDestination:commonType) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
  
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result: { [key: string]: any[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  
    return result;
  };
  return (
    <div className='h-screen'>
      <Kanban
        move={move}
      />
    </div>
  )
}

export default KanbanContainer;