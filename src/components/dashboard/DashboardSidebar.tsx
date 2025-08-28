import { useState } from "react"
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  Users, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Search,
  ChevronDown,
  Plus,
  Bot,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { DashboardView } from "@/pages/Dashboard"

const menuItems = [
  { id: 'overview', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', title: 'Tasks', icon: CheckSquare },
  { id: 'calendar', title: 'Calendar', icon: Calendar },
  { id: 'team', title: 'Team', icon: Users },
  { id: 'ai-assistant', title: 'AI Assistant', icon: Bot },
  { id: 'notes', title: 'Notes', icon: FileText },
  { id: 'notifications', title: 'Notifications', icon: Bell },
]

const bottomMenuItems = [
  { id: 'settings', title: 'Settings', icon: Settings },
]

interface DashboardSidebarProps {
  activeView: DashboardView
  onViewChange: (view: DashboardView) => void
}

export const DashboardSidebar = ({ activeView, onViewChange }: DashboardSidebarProps) => {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const [projectsOpen, setProjectsOpen] = useState(true)

  const projects = [
    { id: 1, name: 'Website Redesign', color: 'bg-blue-500' },
    { id: 2, name: 'Mobile App', color: 'bg-green-500' },
    { id: 3, name: 'Marketing Campaign', color: 'bg-purple-500' },
  ]

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">MW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">My Workspace</p>
                  <ChevronDown className="h-3 w-3 text-muted-foreground inline ml-1" />
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <SidebarTrigger />
            </div>
          </div>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 bg-muted/50 border-0"
              />
            </div>
          </div>
        )}


        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onViewChange('overview')}
                  isActive={activeView === 'overview'}
                  className="w-full justify-start"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {!collapsed && <span>All my activities</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects */}
        <SidebarGroup>
          <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
                <FolderOpen className="h-4 w-4" />
                {!collapsed && (
                  <>
                    <span>Projects</span>
                    <Plus className="ml-auto h-4 w-4" />
                  </>
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton className="w-full justify-start">
                        <div className={`h-3 w-3 rounded-full ${project.color}`} />
                        {!collapsed && <span className="truncate">{project.name}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Tools Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeView === item.id
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => onViewChange(item.id as DashboardView)}
                      isActive={isActive}
                      className="w-full justify-start"
                    >
                      <Icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomMenuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeView === item.id
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => onViewChange(item.id as DashboardView)}
                        isActive={isActive}
                        className="w-full justify-start"
                      >
                        <Icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@company.com</p>
                </div>
              )}
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}