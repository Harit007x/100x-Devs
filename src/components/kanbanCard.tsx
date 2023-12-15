import React, { Dispatch, SetStateAction } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Clock, Trash, Ungroup, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ListItem, TaskList } from "@/types";

interface IKanbanBoardProps {
    state: TaskList[],
    setState: Dispatch<SetStateAction<TaskList[]>>;
    categoryIndex:number,
    taskIndex:number,
    task_name: string,
    description: string,
    badgeText: string,
    badgeTheme?: any
}

const KanbanCard = ({
        state,
        setState,
        categoryIndex,
        taskIndex,
        task_name,
        description,
        badgeText,
        badgeTheme,
    } : IKanbanBoardProps) => {
    return (
        <Card className='w-[370px] h-[160px] flex flex-col justify-between'>
            {/* <div className='flex flex-row items-center align-center gap-2 p-4 text-xs'>
                <Clock className='w-4'/>
                24 Sep - 5 Cot
            </div> */}
            <div>
                <CardHeader className='flex p-0 pt-4 pl-4 flex-row'>
                    <CardTitle className="text-lg">
                        <div className="flex justify-between w-[20.6rem] items-center">
                            <div className='flex gap-1 justify-center items-center'>
                                <Ungroup className="text-foreground/70" size={16}/>
                                {task_name}
                            </div>
                            <Trash 
                                className="cursor-pointer text-muted-foreground hover:text-red/90 hover:fill-redBackground"
                                onClick={() => {
                                    const newState = [...state];
                                    newState[categoryIndex].taskItems.splice(taskIndex, 1);
                                    setState(newState);
                                }}
                                size={21}
                            />
                        </div>
                        <div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex w-[300px] flex-row text-start p-0 pl-6 pt-2 pr-2 pb-2 '>
                    <CardDescription>{description}</CardDescription>
                </CardContent>
            </div>
            <CardFooter className='flex flex-row text-start justify-between p-0 px-4 pb-4'>
                <div className='flex flex-col justify-end h-10 items-center align-center'>
                    <Badge variant={badgeTheme}>{badgeText}</Badge>
                </div>
                <Avatar className='h-8 w-8 self-end'>
                    <AvatarImage src="" />
                    <AvatarFallback><User size={18}/></AvatarFallback>
                </Avatar>
            </CardFooter>
        </Card>
    )
}

export default KanbanCard