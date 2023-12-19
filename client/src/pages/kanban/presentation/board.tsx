import KanbanCard from "@/components/kanbanCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskList } from "@/types";
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
import { Plus} from "lucide-react";
import { useState } from "react";
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
  FormField,
  FormItem,
} from "@/components/ui/form"

import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
interface ITodoProps{
  state: any;
  setState: any;
  onDragEnd:any;
  addCategory:any;
  setAddCategory:any;
  handleAddingCategory:any;
  handleAddTask:any;
}

// const getItems = (count:number, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     task_name: `Task is ${k+offset}`,
//     description: `item ${k + offset}`,
//     badge_color:'green',
//     badge_text: `badge ${k + offset}`,
// }));






const Board = (props: ITodoProps) => {
  const form = useForm()
  const { toast } = useToast()

  const onSubmit = (formData:any) => {
    props.handleAddTask(formData)
    // console.log("form Data -", formData)
  }
  

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between g-6 w-[400px] mb-4">
        <Input 
          className="w-[21rem]"
          placeholder="New Category"
          id="category"
          value={props.addCategory}
          onKeyUp={(e:any)=>{
            if(e.code.toLowerCase() === "enter"){
              // console.log("hell", e.target.value)
              props.handleAddingCategory(props.addCategory)
            }
          }}
          onChange={(e:any) => {props.setAddCategory(e.target.value)}}
        />
        {
          props.addCategory.length !== 0 &&
            <Button
              size={'icon'} 
              className="bg-secondary text-foreground hover:text-background hover:bg-foreground/90"
              onClick={()=>{
                props.handleAddingCategory(props.addCategory)
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
        <DragDropContext onDragEnd={props.onDragEnd}>
          {props.state.map((category:any, categoryIndex:any) => (
            <Droppable key={categoryIndex} droppableId={`${categoryIndex}`}>
              {(provided, snapshot) => (
                <div className="flex flex-col w-[400px] rounded-lg bg-secondary py-6">
                  <div className="flex align-center items-center justify-between mx-6 mb-4">
                    <Label className="text-xl">{category.title}</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size={'icon'}
                          variant={'outline'}
                          onClick={()=>form.reset({})}
                          className="bg-secondary hover:text-foreground hover:bg-background"
                        >
                          <Plus 
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
                    {category.taskItems.map((taskItem:any, taskIndex:any) => (
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
                              <KanbanCard
                                state={props.state}
                                setState={props.setState}
                                categoryIndex={categoryIndex}
                                taskIndex={taskIndex}
                                task_name={taskItem.task_name}
                                description={taskItem.description}
                                badgeText={taskItem.badge_text}
                                badgeTheme={taskItem.badge_color}
                              />
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

export default Board