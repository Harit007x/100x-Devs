export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    external?: boolean
  } & (
    | {
        href: string
        items?: never
      }
    | {
        href?: string
        items: NavLink[]
      }
  )

export type DashboardConfig = {
    mainNav: MainNavItem[]
    kanbanNav: SidebarNavItem[]
}

export type Task = {
  id: string,
  title: string,
  description: string,
  badgeText: string,
  badgeTheme: string
}

export type TodoItemsState = {
  todos: Task[];
}

export type InProgressItemsState = {
  inProgress: Task[];
}

export type DoneItemsState = {
  dones: Task[];
}

export type ListItem = {
  id: string;
  task_name: string;
  description: string;
  badge_color: string;
  badge_text: string;
}

export type TaskList = {
  title: string;
  taskItems: ListItem[];
}

export type DropItem = {
  droppableId: string;
  index: number;
}