import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Kanban = () => {
  // const [isAddTodo, setIsAddTodo] = useState<boolean>(false);
  // const [todo, setTodo] = useState<Array<{id?: number, content: string}>>();
  const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
    const custom: any = {
      id: `id-${k+1}`,
      content: `Quote ${k+1}`,
      title: `Hi title text ${k+1}`
    };
    
    return custom;
  });
  
  const [state,setState] = useState<any>({ 'todos' : initial});


  // useEffect(()=>{
  //   console.log("effect")
  // },[state])


  // D&D methods

  const reorder = (list:any, startIndex:any, endIndex:any) => {
    console.log("ids =", startIndex, endIndex)
    const result = Array.from(list);
    // console.log("new array=", result)
    const [removed] = result.splice(startIndex, 1);
    // console.log("removed array=", result)
    result.splice(endIndex, 0, removed);
    console.log("swapped ? array=", result)
    return result;
  };

  const onDragEnd = (result:any) => {
    console.log("end = ", result)
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const todos = reorder(
      state.todos,
      result.source.index,
      result.destination.index
    );

    console.log("Processed list =-", todos)

    setState({todos});
  };

  console.log("state update d ", state)
  const List = (props:any) => {
    return(
      <Draggable draggableId={props.item.id} index={props.index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{props.item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{props.item.content}</CardDescription>
              </CardContent>
              <CardFooter>
                Building....
              </CardFooter>
            </Card>
          </div>
        )}
      </Draggable>
    )
  }

  const RenderList = (items:any) =>{
    console.log("you render item =", items)
    return(
      items.todos?.map((item:{id:string, index:number}, index:number)=>{
        return(
        <List item={item} index={index} key={item.id} />
      )})
    )
  }

  return (
    <div 
      className="flex flex-col mx-6 py-6 border-2 border-blue-500"
    >
      <div
        className="text-xl font-bold w-20"
      >
        Kanban
      </div>
      <Separator className="mx  -4"/>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent 
          className="
            flex
            justify-between
            mx-4
            max-w-400px
          "
          value="board"
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"droppable"}>
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  className="flex flex-col bg-gray-400 gap-6"
                  {...provided.droppableProps}
                >
                  <RenderList todos={state.todos}/>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
      </Tabs>
    </div>
  )
}
