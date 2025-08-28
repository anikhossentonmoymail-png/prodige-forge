import { useState } from "react"
import { Plus, Calendar, Users, Tag, Paperclip, Clock } from "lucide-react"
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

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreate?: (project: any) => void
}

export const CreateProjectModal = ({ open, onOpenChange, onProjectCreate }: CreateProjectModalProps) => {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    type: "operational",
    status: "planning",
    assignee: "me",
    dueDate: "",
    estimatedTime: "0",
    tags: [] as string[]
  })

  const handleCreate = () => {
    if (!projectData.name.trim()) return
    
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      progress: 0
    }
    
    onProjectCreate?.(newProject)
    onOpenChange(false)
    setProjectData({
      name: "",
      description: "",
      type: "operational",
      status: "planning",
      assignee: "me",
      dueDate: "",
      estimatedTime: "0",
      tags: []
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              placeholder="Enter project name..."
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              className="text-base"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="project-description">Project description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe your project goals and scope..."
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Plus className="h-3 w-3" />
              Add milestone
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

          {/* Project Settings Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={projectData.type} onValueChange={(value) => setProjectData({ ...projectData, type: value })}>
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
                    <SelectItem value="research">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        Research
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={projectData.status} onValueChange={(value) => setProjectData({ ...projectData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">
                      <Badge variant="outline" className="bg-gray-100">Planning</Badge>
                    </SelectItem>
                    <SelectItem value="active">
                      <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                    </SelectItem>
                    <SelectItem value="on-hold">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">On Hold</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Project Lead</Label>
                <Select value={projectData.assignee} onValueChange={(value) => setProjectData({ ...projectData, assignee: value })}>
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
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due date
                </Label>
                <Input
                  type="date"
                  value={projectData.dueDate}
                  onChange={(e) => setProjectData({ ...projectData, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Estimated duration
                </Label>
                <Select value={projectData.estimatedTime} onValueChange={(value) => setProjectData({ ...projectData, estimatedTime: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 week</SelectItem>
                    <SelectItem value="2">2 weeks</SelectItem>
                    <SelectItem value="4">1 month</SelectItem>
                    <SelectItem value="8">2 months</SelectItem>
                    <SelectItem value="12">3 months</SelectItem>
                    <SelectItem value="24">6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team size
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo (1 person)</SelectItem>
                    <SelectItem value="2-5">Small (2-5 people)</SelectItem>
                    <SelectItem value="6-10">Medium (6-10 people)</SelectItem>
                    <SelectItem value="10+">Large (10+ people)</SelectItem>
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
          <Button onClick={handleCreate} disabled={!projectData.name.trim()}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}