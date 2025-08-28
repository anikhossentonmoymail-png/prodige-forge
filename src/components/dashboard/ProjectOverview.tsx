import { Clock, Users, Calendar, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    title: "Website Redesign",
    progress: 75,
    dueDate: "Dec 15, 2024",
    team: [
      { name: "John", avatar: "/placeholder.svg", fallback: "JD" },
      { name: "Sarah", avatar: "/placeholder.svg", fallback: "SM" },
      { name: "Mike", avatar: "/placeholder.svg", fallback: "MT" },
    ],
    status: "On Track",
    tasks: { completed: 12, total: 16 },
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Mobile App Development",
    progress: 45,
    dueDate: "Jan 30, 2025",
    team: [
      { name: "Alice", avatar: "/placeholder.svg", fallback: "AB" },
      { name: "Bob", avatar: "/placeholder.svg", fallback: "BC" },
    ],
    status: "In Progress",
    tasks: { completed: 8, total: 18 },
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Marketing Campaign",
    progress: 90,
    dueDate: "Dec 31, 2024",
    team: [
      { name: "Emma", avatar: "/placeholder.svg", fallback: "EW" },
      { name: "David", avatar: "/placeholder.svg", fallback: "DL" },
      { name: "Lisa", avatar: "/placeholder.svg", fallback: "LK" },
    ],
    status: "Almost Done",
    tasks: { completed: 18, total: 20 },
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Team Training Program",
    progress: 25,
    dueDate: "Feb 15, 2025",
    team: [
      { name: "Chris", avatar: "/placeholder.svg", fallback: "CR" },
    ],
    status: "Starting",
    tasks: { completed: 3, total: 12 },
    color: "bg-orange-500"
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "On Track": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Almost Done": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Starting": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export const ProjectOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your projects and tasks</p>
        </div>
        <Button 
          className="bg-gradient-primary hover:opacity-90"
          onClick={() => {
            // Create new project functionality
            const projectName = prompt("Enter project name:");
            if (projectName) {
              alert(`Creating project: ${projectName}`);
              // Here you would typically call an API to create the project
            }
          }}
        >
          Create New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((acc, project) => acc + (project.tasks.total - project.tasks.completed), 0)}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Tasks</p>
                <p className="text-2xl font-bold">
                  {projects.reduce((acc, project) => acc + project.tasks.completed, 0)}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${project.color}`} />
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>Add Task</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Task Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks</span>
                  <span>{project.tasks.completed}/{project.tasks.total} completed</span>
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{project.dueDate}</span>
                  </div>
                </div>

                {/* Status and Team */}
                <div className="flex items-center justify-between pt-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">{member.fallback}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">+{project.team.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}