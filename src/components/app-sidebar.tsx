import React from 'react'
import { Home, ChevronDown, UserCircle, Brain } from "lucide-react"
import { Sidebar, SidebarItem } from "@/components/ui/sidebar"

interface AppSidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const menuItems = [
  {
    icon: UserCircle,
    title: "Account",
    subItems: [
      { title: "Settings" },
      { title: "Preferences" },
      { title: "API Keys" },
    ]
  },
  {
    icon: Home,
    title: "Dashboard",
    subItems: [
      { title: "Overview" },
      { title: "Analytics" },
      { title: "Reports" },
    ]
  },
  {
    icon: Brain,
    title: "AI Features",
    subItems: [
      { title: "Model Settings" },
      { title: "Prompt Templates" },
      { title: "Chat History" },
    ]
  }
]

export function AppSidebar({ collapsed, setCollapsed }: AppSidebarProps) {
  const [activeItems, setActiveItems] = React.useState<Set<string>>(new Set())

  const toggleItem = (title: string) => {
    setActiveItems(prev => {
      const newItems = new Set(prev)
      if (newItems.has(title)) {
        newItems.delete(title)
      } else {
        newItems.add(title)
      }
      return newItems
    })
  }

  return (
    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
      <div className="space-y-2 py-4">
        {menuItems.map((item) => (
          <div key={item.title}>
            <div 
              className="flex items-center justify-between px-4 py-2 hover:bg-accent rounded-lg cursor-pointer"
              onClick={() => toggleItem(item.title)}
            >
              <SidebarItem 
                icon={item.icon} 
                title={item.title}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.title)
                }}
              />
              {!collapsed && (
                <ChevronDown 
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeItems.has(item.title) ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>
            {!collapsed && activeItems.has(item.title) && (
              <div className="ml-6 space-y-1">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.title}
                    className="px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {subItem.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Sidebar>
  )
}
