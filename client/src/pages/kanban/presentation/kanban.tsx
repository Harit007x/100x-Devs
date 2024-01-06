import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Board from "./board";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Profile from '../../../assets/_.jpeg';
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
interface IKanbanProps{
  state: any
  setState:any
  onDragEnd:any
  handleAddCategory:any
  handleAddTask:any
  handleUpdateTask:any
  handleDeleteTask:any
  handleDeleteCategory:any
}


const Kanban = (props:IKanbanProps) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div 
      className="flex flex-col mx-6 py-6 pl-4 gap-6"
    >
      <div
        className="flex justify-between items-center w-full font-bold w-20"
      >
        <span className="text-2xl">
          Kanban
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
            >
              <AvatarImage src={Profile} alt="@shadcn" />
              <AvatarFallback>CK</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {true && <p className="font-medium">{"Harit"}</p>}
                {true && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {"demo@gmail.com"}
                  </p>
                )}
              </div>
              
              <div className="">
                {theme === "dark"
                  ?
                  <Sun 
                    className="cursor-pointer"
                    size={20}
                    onClick={() => {setTheme("light")}}
                  />
                  :
                  <Moon 
                    className="cursor-pointer"
                    size={20}
                    onClick={() => {setTheme("dark")}}
                  />
                }
              </div>
            </div>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem asChild>
              <span >Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <span >Billing</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <span >Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault()
                navigate("/")
                toast({
                  description: "Logged Out",
                })
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <Tabs defaultValue="account" className="flex flex-col items-start pl-4 p-4 w-[400px]">
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
            handleAddCategory={props.handleAddCategory}
            handleAddTask={props.handleAddTask}
            handleUpdateTask={props.handleUpdateTask}
            handleDeleteTask={props.handleDeleteTask}
            handleDeleteCategory={props.handleDeleteCategory}
          />
        </TabsContent>
      </Tabs> */}
      <Board
        state={props.state}
        setState={props.setState}
        onDragEnd={props.onDragEnd}
        handleAddCategory={props.handleAddCategory}
        handleAddTask={props.handleAddTask}
        handleUpdateTask={props.handleUpdateTask}
        handleDeleteTask={props.handleDeleteTask}
        handleDeleteCategory={props.handleDeleteCategory}
      />
    </div>
  )
}

export default Kanban