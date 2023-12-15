import KanbanCard from "@/components/kanbanCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task, TaskList } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Label } from "@/components/ui/label";
import { Controller, useForm } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
interface ITodoProps{
  move: () => void;
}
interface DropItem {
  droppableId: string;
  index: number;
}

const getItems = (count:number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    task_name: `Task is ${k+offset}`,
    description: `item ${k + offset}`,
    badge_color:'green',
    badge_text: `badge ${k + offset}`,
}));

const reorder = (list:TaskList, startIndex: number, endIndex: number) => {
  // console.log("recordering  -", list)
  const result = Array.from(list.taskItems);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  // console.log("return item -", result)
  return {"title": list.title, "taskItems": result };
};

let defaultTasks: TaskList[] = []
const move = (source: TaskList, destination: TaskList, droppableSource: DropItem, droppableDestination: DropItem) => {
  const sourceClone = Array.from(source.taskItems);
  const destClone = Array.from(destination.taskItems);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: TaskList[] = [{"title": "Todo", "taskItems": []},{"title": "In-Progress", "taskItems": []}, ...defaultTasks];
  result[Number(droppableSource.droppableId)].taskItems = sourceClone;
  result[Number(droppableDestination.droppableId)].taskItems = destClone;
  // console.log("result araya  =", result)
  return result;
};



const Todo = (props: ITodoProps) => {
  const form = useForm()

  const onSubmit = (formData:any) => {
    handleAddTask(formData)
    console.log("form Data -", formData)
  }
  const [state, setState] = useState<TaskList[]>([]);
  const onDragEnd = (result:any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    // console.log("source dest -", source, destination)
    // console.log("temp -", state,'----',sInd,'------------', state[sInd])
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      // console.log("new item =", items)
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      // console.log("the newwest one oeneone -", newState)
      setState(newState);
    }
  }
  // console.log("updated satte =", state)
  const [addCategory, setAddCategory] = useState<string>('');

  const handleAddingCategory = (category: string) => {
    const words = category.split(" ");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const capitalizedString = capitalizedWords.join(" ");
    setState([...state, {'title': capitalizedString, 'taskItems': []}])
    defaultTasks.push({'title': capitalizedString, 'taskItems': []})
    setAddCategory('')
  }

  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = (formData:any) => {
    // console.log("cei sos ao =", formData.title)
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
    setState(updatedTotal)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between g-6 w-[400px] mb-4">
        <Input 
          className="w-[21rem]"
          placeholder="New Category"
          id="category"
          value={addCategory}
          onChange={(e:any) => {setAddCategory(e.target.value)}}
        />
        {
          addCategory.length !== 0 &&
            <Button 
            // disabled={addCategory.length == 0}
            size={'icon'} 
            className="bg-secondary text-foreground hover:text-background hover:bg-foreground/90"
            onClick={()=>{
              handleAddingCategory(addCategory)
            }}
          >
            <Plus 
              className=""
              size={20}
            />
          </Button>
        }
      </div>
      <div
        className="flex flex-row items-start gap-6"
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((category, categoryIndex) => (
            <Droppable key={categoryIndex} droppableId={`${categoryIndex}`}>
              {(provided, snapshot) => (
                <div className="flex flex-col w-[400px] rounded-lg bg-secondary py-6">
                  <div className="flex align-center items-center justify-between mx-6 mb-4">
                    <Label className="text-xl">{category.title}</Label>
                    {/* {console.log("Title checkin", category.title)} */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size={'icon'}
                          variant={'outline'}
                          onClick={()=>form.reset({})}
                          className="bg-secondary hover:text-foreground hover:bg-background"
                        >
                          <Plus 
                            // onClick={()=>{
                            //   handleAddingCategory(addCategory)
                            // }}
                            className=""
                            size={20}
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{`Add  ${category.title}`}</DialogTitle>
                          <DialogDescription>
                            Manage your tasks effortlessly.
                          </DialogDescription>
                        </DialogHeader>
                        
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-4 py-2 pb-6">
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="task_name">
                                  Task
                                </Label>
                                <Input
                                  id="task_name"
                                  // className="w-full"
                                  {...form.register("task_name")}
                                />
                              </div>
                              <Input
                                id="title"
                                className="hidden"
                                value={category.title}
                                {...form.register("title")}
                              />
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="description">
                                  Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description here..." 
                                    {...form.register('description')}
                                  />
                              </div>

                              <div className="flex flex-row justify-between items-end">
                                <div className="flex flex-col gap-2 ">
                                  <Label htmlFor="badge_text">
                                    Tag Text
                                  </Label>
                                  <Input
                                    id="badge_text"
                                    // className="w-full"
                                    {...form.register("badge_text")}
                                  />
                                </div>
                                <FormField
                                  control={form.control}
                                  name="badge_color"
                                  render={({ field }) => (
                                    <FormItem className="w-[110px] h-full">
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Color" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="blue">
                                            <Badge variant={"blue"}>Blue</Badge>
                                          </SelectItem>
                                          <SelectItem value="green">
                                            <Badge variant={"green"}>Green</Badge>
                                          </SelectItem>
                                          <SelectItem value="orange">
                                            <Badge variant={"orange"}>Orange</Badge>
                                          </SelectItem>
                                          <SelectItem value="purple">
                                            <Badge variant={"purple"}>Purple</Badge>
                                          </SelectItem>
                                          <SelectItem value="red">
                                            <Badge variant={"red"}>Red</Badge>
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <div className="flex justify-between w-full">
                                <DialogClose asChild>
                                  <div className="flex flex-col justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-secondary px-4 py-2 rounded-md">
                                    <Label className="cursor-pointer">
                                      Cancel
                                    </Label>
                                  </div>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button className="px-6" type="submit">Add</Button>
                                </DialogClose>
                              </div>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div
                    ref={provided.innerRef}
                    className="flex w-96 flex-col w-full gap-4"
                    {...provided.droppableProps}
                  >
                    {category.taskItems.map((taskItem, taskIndex) => (
                      <Draggable
                        key={taskItem.id}
                        draggableId={taskItem.id}
                        index={taskIndex}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around"
                              }}
                            >
                            {/* <Button
                              type="button"
                              size={"icon"}
                            >
                            </Button> */}
                              <KanbanCard
                                state={state}
                                setState={setState}
                                categoryIndex={categoryIndex}
                                taskIndex={taskIndex}
                                task_name={taskItem.task_name}
                                description={taskItem.description}
                                badgeText={taskItem.badge_text}
                                badgeTheme={taskItem.badge_color}
                              />
                              {/* {item.description} */}
                              {/* <button
                                type="button"
                                onClick={() => {
                                  const newState = [...state];
                                  newState[categoryIndex].splice(index, 1);
                                  setState(
                                    newState.filter(group => group.length)
                                  );
                                }}
                              >
                                delete
                              </button> */}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                      {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Todo