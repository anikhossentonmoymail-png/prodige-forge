import { useState } from "react"
import { Plus, Calendar, Clock, Tag, Paperclip, RefreshCw } from "lucide-react"
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

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTaskCreate?: (task: any) => void
}

export const CreateTaskModal = ({ open, onOpenChange, onTaskCreate }: CreateTaskModalProps) => {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    type: "operational",
    status: "new",
    assignee: "me",
    schedule: "today",
    estimatedTime: "0",
    dueDate: "",
    tags: [] as string[]
  })

  const handleCreate = () => {
    if (!taskData.name.trim()) return
    
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    }
    
    onTaskCreate?.(newTask)
    onOpenChange(false)
    setTaskData({
      name: "",
      description: "",
      type: "operational",
      status: "new",
      assignee: "me",
      schedule: "today",
      estimatedTime: "0",
      dueDate: "",
      tags: []
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create task
            <RefreshCw className="h-4 w-4 ml-auto" />
            <span className="text-sm font-normal text-muted-foreground">Set repeats</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Input
              placeholder="Task name"
              value={taskData.name}
              onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
              className="text-base border-red-200 focus:border-red-400"
            />
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <Textarea
              placeholder="Task description"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Plus className="h-3 w-3" />
              Add subtask
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Paperclip className="h-3 w-3" />
              Attach file
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Tag className="h-3 w-3" />
              Add tag
            </Button>
          </div>

          {/* Task Settings Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={taskData.type} onValueChange={(value) => setTaskData({ ...taskData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        Operational
                      </div>
                    </SelectItem>
                    <SelectItem value="strategic">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-purple-500 rounded-full" />
                        Strategic
                      </div>
                    </SelectItem>
                    <SelectItem value="bug">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-red-500 rounded-full" />
                        Bug Fix
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={taskData.status} onValueChange={(value) => setTaskData({ ...taskData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      <Badge variant="outline" className="bg-gray-100">New task</Badge>
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </SelectItem>
                    <SelectItem value="review">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">In Review</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assignee</Label>
                <Select value={taskData.assignee} onValueChange={(value) => setTaskData({ ...taskData, assignee: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-xs text-white">
                          Me
                        </div>
                        <span>Me</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Schedule this task for</Label>
                <Select value={taskData.schedule} onValueChange={(value) => setTaskData({ ...taskData, schedule: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        Today
                      </div>
                    </SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="next-week">Next Week</SelectItem>
                    <SelectItem value="custom">Custom Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Estimated time</Label>
                <Select value={taskData.estimatedTime} onValueChange={(value) => setTaskData({ ...taskData, estimatedTime: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        0h
                      </div>
                    </SelectItem>
                    <SelectItem value="1">1h</SelectItem>
                    <SelectItem value="2">2h</SelectItem>
                    <SelectItem value="4">4h</SelectItem>
                    <SelectItem value="8">1 day</SelectItem>
                    <SelectItem value="16">2 days</SelectItem>
                    <SelectItem value="40">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Due date</Label>
                <Input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  placeholder="No due date"
                />
              </div>
            </div>
          </div>

          {/* Create in Project */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Create in</span>
                <div className="flex items-center gap-2 bg-primary text-white px-2 py-1 rounded-md text-sm">
                  <div className="h-4 w-4 bg-white rounded-full flex items-center justify-center text-xs text-primary font-bold">
                    W
                  </div>
                  <span>Workspace</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!taskData.name.trim()}>
            Create task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}