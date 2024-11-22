// This will be created by the shadcn-ui command

"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
})

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ 
  children, 
  className,
  collapsed,
  setCollapsed,
  ...props 
}: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        className={cn(
          "relative min-h-screen border-r transition-all duration-300",
          collapsed ? "w-16" : "w-60",
          className
        )}
        {...props}
      >
        {children}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[76px] rounded-full border bg-background p-1.5 hover:bg-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </SidebarContext.Provider>
  )
}

export function SidebarItem({
  icon: Icon,
  title,
  ...props
}: {
  icon: React.ElementType
  title: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = React.useContext(SidebarContext)

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        collapsed ? "justify-center px-0" : "px-4",
        "py-2"
      )}
      {...props}
    >
      <Icon size={22} />
      {!collapsed && <span>{title}</span>}
    </div>
  )
}
