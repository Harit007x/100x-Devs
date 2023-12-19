import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Board from "./board";
interface IKanbanProps{
  state: any
  setState:any
  onDragEnd:any
  addCategory:any
  setAddCategory: any
  handleAddingCategory:any
  handleAddTask:any
}

const Kanban = (props:IKanbanProps) => {
  return (
    <div 
      className="flex flex-col mx-6 py-6"
    >
      <div
        className="text-3xl pl-4 font-bold w-20"
      >
        Kanban
      </div>
      <Tabs defaultValue="account" className="flex flex-col items-start pl-4 p-4 w-[400px]">
        <TabsList className="mb-4">
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent
          className="flex"
          value="board"
        >
          <Board 
            state={props.state}
            setState={props.setState}
            onDragEnd={props.onDragEnd}
            addCategory={props.addCategory}
            setAddCategory={props.setAddCategory}
            handleAddingCategory={props.handleAddingCategory}
            handleAddTask={props.handleAddTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Kanban