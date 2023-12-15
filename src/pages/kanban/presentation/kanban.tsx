import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Todo from "./todo";
import Progress from "./progress";
import Done from "./done";
import { Plus } from "lucide-react";
import { DragDropContext } from "react-beautiful-dnd";
import DragAndDropHook from "@/hooks/dragAndDropHook";

interface IKanbanProps{
  move: any
}

const Kanban = (props:IKanbanProps) => {
  // const [isAddTodo, setIsAddTodo] = useState<boolean>(false);
  // const [todo, setTodo] = useState<Array<{id?: number, content: string}>>();
  // const {onDragEnd} = DragAndDropHook();

  return (
    <div 
      className="flex flex-col mx-6 py-6"
    >
      <div
        className="text-3xl pl-4 font-bold w-20"
      >
        Kanban
      </div>
      {/* <Separator className="w-96"/> */}
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

            <Todo move={props.move}/>
            {/* <Progress/> */}
          {/* <div
            className="flex flex-col items-start gap-4"
          >
            <Label className="text-xl pl-2">Done</Label>
            <Done/>
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Kanban