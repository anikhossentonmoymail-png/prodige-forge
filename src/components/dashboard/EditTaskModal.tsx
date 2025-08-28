import { useState, useEffect } from "react"
import { Calendar, Clock, Flag, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

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

interface EditTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onTaskUpdate?: (updatedTask: Task) => void
}

export const EditTaskModal = ({ open, onOpenChange, task, onTaskUpdate }: EditTaskModalProps) => {
  const [taskData, setTaskData] = useState<Task | null>(null)

  useEffect(() => {
    if (task) {
      setTaskData({ ...task })
    }
  }, [task])

  const handleSave = () => {
    if (!taskData) return
    
    onTaskUpdate?.(taskData)
    onOpenChange(false)
  }

  if (!taskData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              className="text-base"
            />
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={taskData.description || ""}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Task Settings Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Priority
                </Label>
                <Select 
                  value={taskData.priority} 
                  onValueChange={(value: "Low" | "Medium" | "High") => 
                    setTaskData({ ...taskData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      <Badge className="text-green-600 bg-green-100">Low</Badge>
                    </SelectItem>
                    <SelectItem value="Medium">
                      <Badge className="text-yellow-600 bg-yellow-100">Medium</Badge>
                    </SelectItem>
                    <SelectItem value="High">
                      <Badge className="text-red-600 bg-red-100">High</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={taskData.status} 
                  onValueChange={(value: "todo" | "progress" | "completed") => 
                    setTaskData({ ...taskData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Project</Label>
                <Select 
                  value={taskData.project} 
                  onValueChange={(value) => setTaskData({ ...taskData, project: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="Marketing Campaign">Marketing Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due Date
                </Label>
                <Input
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  placeholder="e.g., Dec 20"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Assignee
                </Label>
                <Select 
                  value={taskData.assignee.name} 
                  onValueChange={(value) => {
                    const assigneeMap: Record<string, any> = {
                      "Sarah": { name: "Sarah", fallback: "SM" },
                      "John": { name: "John", fallback: "JD" },
                      "Mike": { name: "Mike", fallback: "MT" },
                      "Alice": { name: "Alice", fallback: "AB" }
                    }
                    setTaskData({ ...taskData, assignee: assigneeMap[value] || taskData.assignee })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah">Sarah</SelectItem>
                    <SelectItem value="John">John</SelectItem>
                    <SelectItem value="Mike">Mike</SelectItem>
                    <SelectItem value="Alice">Alice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}