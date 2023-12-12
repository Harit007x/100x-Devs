import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface IKanbanBoardProps {
    title: string,
    description: string,
    badgeText: string,
    badgeTheme?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'default'
}

const KanbanCard = ({title, description, badgeText, badgeTheme} : IKanbanBoardProps) => {
    return (
        <Card className='w-11/12 flex flex-col '>
            <div className='flex flex-row items-center align-center gap-2 p-4 text-sm'>
                <Clock className='w-5'/>
                24 Sep - 5 Cot
            </div>
            <CardHeader className='flex p-0 pl-4 flex-row '>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-row text-start p-0 pl-4 pt-1 pr-2 pb-4 '>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className='flex flex-row text-start justify-between p-0 px-4 pb-4 '>
                <Badge variant={badgeTheme}>{badgeText}</Badge>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </CardFooter>
        </Card>
    )
}

export default KanbanCard