import { useState } from "react"
import { MoreHorizontal, Clock, Flag, Filter, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Task {
  id: string
  title: string
  assignee: {
    name: string
    avatar?: string
    fallback: string
  }
  dueDate: string
  priority: "Low" | "Medium" | "High"
  status: "New task" | "In Progress" | "Completed"
  type: "Operational" | "Bug Fix" | "Feature" | "Research"
  completed: boolean
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Review design mockups",
    assignee: { name: "Sarah", fallback: "SM" },
    dueDate: "14 Aug",
    priority: "High",
    status: "New task",
    type: "Operational",
    completed: false
  },
  {
    id: "2",
    title: "Implement authentication system",
    assignee: { name: "John", fallback: "JD" },
    dueDate: "16 Aug",
    priority: "High",
    status: "In Progress", 
    type: "Feature",
    completed: false
  },
  {
    id: "3",
    title: "Fix responsive layout issues",
    assignee: { name: "Mike", fallback: "MT" },
    dueDate: "18 Aug",
    priority: "Medium",
    status: "In Progress",
    type: "Bug Fix",
    completed: false
  },
  {
    id: "4",
    title: "User research interviews",
    assignee: { name: "Alice", fallback: "AB" },
    dueDate: "20 Aug",
    priority: "Low",
    status: "New task",
    type: "Research",
    completed: false
  },
  {
    id: "5",
    title: "Database optimization",
    assignee: { name: "Bob", fallback: "BC" },
    dueDate: "12 Aug",
    priority: "Medium",
    status: "Completed",
    type: "Operational",
    completed: true
  }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
    case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
    case "Low": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "New task": return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
    case "In Progress": return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
    case "Completed": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Operational": return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
    case "Bug Fix": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
    case "Feature": return "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
    case "Research": return "text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
  }
}

export const TaskList = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [filter, setFilter] = useState<string>("all")

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "active") return !task.completed
    return true
  })

  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tasks</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("all")}>All Tasks</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("active")}>Active Tasks</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("completed")}>Completed Tasks</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create task
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Active Tasks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center gap-2">
              Active tasks 
              <Badge variant="secondary">{activeTasks.length}</Badge>
            </h3>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTasks.map((task) => (
                  <TableRow key={task.id} className="group">
                    <TableCell>
                      <Checkbox
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => toggleTaskSelection(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(task.type)}>
                        {task.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {task.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <div className="space-y-4 mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                Completed tasks
                <Badge variant="secondary">{completedTasks.length}</Badge>
              </h3>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Great job! You have {completedTasks.length} completed tasks.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}