import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    { 
      title: "Kanban",
      href: "/kanban",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Contact me",
      href: "/contact",
      disabled: true,
    },
  ],
  kanbanNav: [
    {      title: "Board",
      href: "/board",
    },
    {      title: "List",
      href: "/list",
    },
    {      title: "Timeline",
      href: "/timeline",
    },
    {      title: "Timeline",
      href: "/timeline",
    },
  ],
}
