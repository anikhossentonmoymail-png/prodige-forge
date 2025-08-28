import { useState } from "react"
import { Plus, MoreHorizontal, Clock, Flag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditTaskModal } from "./EditTaskModal"

interface Task {
  id: string
  title: string
  description?: string
  assignee: {
    name: string
    avatar?: string
    fallback: string
  }
  dueDate: string
  priority: "Low" | "Medium" | "High"
  status: "todo" | "progress" | "completed"
  project: string
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage mockup",
    description: "Create initial wireframes and design concepts",
    assignee: { name: "Sarah", fallback: "SM" },
    dueDate: "Dec 15",
    priority: "High",
    status: "todo",
    project: "Website Redesign"
  },
  {
    id: "2", 
    title: "Implement user authentication",
    assignee: { name: "John", fallback: "JD" },
    dueDate: "Dec 18",
    priority: "Medium",
    status: "progress",
    project: "Mobile App"
  },
  {
    id: "3",
    title: "Write documentation",
    assignee: { name: "Mike", fallback: "MT" },
    dueDate: "Dec 20",
    priority: "Low",
    status: "progress",
    project: "Website Redesign"
  },
  {
    id: "4",
    title: "Setup CI/CD pipeline",
    assignee: { name: "Alice", fallback: "AB" },
    dueDate: "Dec 12",
    priority: "High",
    status: "completed",
    project: "Mobile App"
  }
]

const columns = [
  { id: "todo", title: "To Do", color: "border-gray-200" },
  { id: "progress", title: "In Progress", color: "border-blue-200" },
  { id: "completed", title: "Completed", color: "border-green-200" }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
    case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
    case "Low": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
  }
}

export const TaskKanban = ({ onCreateTaskClick }: { onCreateTaskClick?: () => void }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault()
    
    if (draggedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === draggedTask ? { ...task, status: newStatus } : task
        )
      )
      setDraggedTask(null)
    }
  }

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const handleDuplicateTask = (task: Task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      title: `${task.title} (Copy)`
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Task Board</span>
          <Button size="sm" variant="outline" onClick={() => onCreateTaskClick?.()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`bg-muted/30 rounded-lg p-4 min-h-[400px] border-2 border-dashed ${column.color}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  {column.title}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {getTasksByStatus(column.id as Task['status']).length}
                </Badge>
              </div>

              <div className="space-y-3">
                {getTasksByStatus(column.id as Task['status']).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="bg-card p-4 rounded-lg border shadow-sm cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTask(task)}>
                            Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateTask(task)}>
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority}
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="text-xs text-muted-foreground">{task.project}</div>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-xs">{task.assignee.fallback}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Edit Task Modal */}
      <EditTaskModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        task={editingTask}
        onTaskUpdate={handleTaskUpdate}
      />
    </Card>
  )
}