import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash, Ungroup, Edit2, Ghost, Maximize } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { TaskList } from "@/types";
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';

interface IKanbanBoardProps {
    state: TaskList[],
    setState: Dispatch<SetStateAction<TaskList[]>>;
    category_id: string,
    category_index:number,
    task_index:number,
    taskItem:any;
    handleUpdateTask:any;
    handleDeleteTask:any;
}

const KanbanCard = (props : IKanbanBoardProps) => {
    const [toggleForm, setToggleForm] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [isMaximize, setIsMaximize] = useState<boolean>(false);
    const form :any  = useForm()

    const callDelete = (user_id: number, task_id: string, category_id: string) => {
        props.handleDeleteTask(user_id, task_id, category_id)
    }
    // callDelete(1, props.taskItem.id, props.category_id)
    
    const dateFormatter = (dateString :string) => {
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toLocaleString('en-US', {
            weekday: 'short', // Short day name (e.g., Thu)
            month: 'short',   // Short month name (e.g., Dec)
            day: 'numeric'    // Day of the month (e.g., 21)
        });

        return formattedDate;
    }

    const onSubmit = (formData:any) => {
        props.handleUpdateTask(formData)
        console.log("form Data -", formData)
      }

    return (
        <>
            {/* Delete Alert ------------------------------------------------------------------*/}
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                {/* <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Do you want to proceed to delete task?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your task.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> callDelete(1, props.taskItem.id, props.category_id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit form ------------------------------------------------------------------*/}
            <Dialog open={toggleForm} onOpenChange={setToggleForm} >
                <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e:any) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-xl">{'Update Task'}</DialogTitle>
                    <DialogDescription className=''>
                        Manage your tasks effortlessly.
                    </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 py-2 pb-6">
                            <Input id="task_id" className="hidden" value={props.taskItem.id} {...form.register("task_id")} />

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="task_name">
                                    Task
                                </Label>
                                <Input
                                    id="task_name"
                                    defaultValue={props.taskItem.task_name}
                                    {...form.register("task_name")}
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    defaultValue={props.taskItem.description}
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
                                    defaultValue={props.taskItem.badge_text}
                                    {...form.register("badge_text")}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="badge_color"
                                defaultValue={props.taskItem.badge_color}
                                render={({ field }) => (
                                <FormItem className="w-[110px] h-full">
                                    <Select onValueChange={field.onChange} defaultValue={props.taskItem.badge_color}>
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
                                    <Button className="px-6" type="submit">Update</Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
                </DialogContent>
            </Dialog>

            {/* Maximize view ------------------------------------------------------------------*/}
            <Dialog open={isMaximize} onOpenChange={setIsMaximize} >
                <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e:any) => e.preventDefault()}>
                    
                    <DialogHeader className='border-b border-black/20 pb-4 border-dashed'>
                        <DialogTitle 
                            className="flex items-center justify-start gap-1 text-2xl"
                        >
                            <Ungroup className="text-foreground/70" size={22}/> 
                            {props.taskItem.task_name}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className='text-md'>
                        {props.taskItem.description}
                    </DialogDescription>
                    <DialogFooter className='flex justify-between'>
                    <div className="flex justify-between w-full">
                        <Badge className='text-sm' variant={props.taskItem.badge_color}>{props.taskItem.badge_text}</Badge>
                        <div className='flex items-center justify-center bg-secondary h-[28px] px-2 rounded-md'>
                            <CardDescription className='flex text-sm font-bold items-center h-6 m-0 p-0' >
                                {dateFormatter(props.taskItem.createdAt)}
                            </CardDescription>
                        </div>
                    </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Card component ------------------------------------------------------------------*/}
            <Card className='w-[20rem] h-[12rem] flex flex-col justify-between'>
                {/* <div className='flex flex-row items-center align-center gap-2 p-4 text-xs'>
                    <Clock className='w-4'/>
                    24 Sep - 5 Cot
                </div> */}
                <div>
                    <CardHeader className='flex p-0 pt-3 pl-0 mx-4 flex-col gap-2'>
                        <div className='flex items-center justify-between border-b pb-3 border-dashed'>
                            <div 
                                className='flex items-center justify-center w-7 h-7 rounded-sm cursor-pointer text-muted-foreground hover:text-foreground hover:fill-secondary hover:bg-secondary'
                            >
                                <Ghost
                                    className=""
                                    size={16}
                                />
                            </div>
                            <div className='flex gap-0'>
                                <div 
                                    className='flex items-center justify-center w-7 h-7 rounded-sm cursor-pointer text-muted-foreground hover:text-green/90 hover:fill-green/30 hover:bg-green/10'
                                    onClick={()=>{setIsMaximize(true)}}
                                >
                                    <Maximize
                                        className=""
                                        size={16}
                                    />
                                </div>
                                <div 
                                    className='flex items-center justify-center w-7 h-7 rounded-sm cursor-pointer text-muted-foreground hover:text-blue/90 hover:fill-blue/30 hover:bg-blue/10'
                                    onClick={()=>{setToggleForm(true)}}
                                >
                                    <Edit2
                                        className=""
                                        size={16}
                                    />
                                </div>
                                <div
                                    className='flex items-center justify-center w-7 h-7 rounded-sm cursor-pointer text-muted-foreground hover:text-red/90 hover:fill-redBackground hover:bg-red/10'
                                    onClick={() => setOpenAlert(true)}
                                >
                                    <Trash
                                        className=""
                                        size={16}
                                    />
                                </div>
                            </div>
                        </div>
                        <CardTitle className="text-md">
                            <div className="flex justify-between w-[20rem] items-center">
                                <div className='flex gap-1 justify-center items-center'>
                                    <Ungroup className="text-foreground/70" size={16}/>
                                    {props.taskItem.task_name}
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex w-[300px] h-[50px] flex-row text-start p-0 pl-6 pt-1 pr-2 pb-1 '>
                        <CardDescription>{props.taskItem.description.substring(0, 60) + '...'}</CardDescription>
                    </CardContent>
                </div>
                <CardFooter className='flex flex-row text-start justify-between p-0 px-4 pb-4'>
                    <div className='flex flex-col justify-end h-6 items-center align-center'>
                        <Badge className='text-[0.7rem]' variant={props.taskItem.badge_color}>{props.taskItem.badge_text}</Badge>
                    </div>
                    <CardContent className='bg-secondary h-[0.2rem] px-2 rounded-lg'>
                        <CardDescription className='flex text-[0.8rem] items-center h-6 m-0 p-0' >
                            {dateFormatter(props.taskItem.createdAt)}
                        </CardDescription>
                    </CardContent>
                </CardFooter>
            </Card>
        </>
    )
}

export default KanbanCard