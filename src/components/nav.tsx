import { MainNavItem } from '@/types';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useTheme } from "@/components/theme-provider"
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from 'lucide-react';

interface Nav{
  item: MainNavItem[]
}

const Nav = (props: Nav) => {
  const { setTheme } = useTheme();
  return (
    <>
      <div 
        className="flex h-20 items-center justify-between"
      >
        <div 
          className='flex items-center justify-center gap-6'
        >
          {
            props.item.map((item, index) => {
              return (
                <Link
                  className='font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60'
                  to={item.href}
                  key={index}
                >
                  {item.title}
                </Link>
              )
            })
          }
        </div>
        {/* <a
          className='inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4'
          href='#'
        >
          Login
        </a> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Outlet/>
    </>
  )
}

export default Nav