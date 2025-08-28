import { useState } from "react"
import { Calendar, CheckSquare, BarChart, FolderOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    id: "calendar",
    name: "Calendar planner",
    icon: Calendar,
    description: "Visual scheduling with drag-and-drop functionality",
    mockContent: (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 h-full">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                i === 9 || i === 15
                  ? "bg-primary text-white font-medium"
                  : i === 3 || i === 11
                  ? "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200"
                  : "hover:bg-muted cursor-pointer"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Team Meeting</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>Project Deadline</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "tasks",
    name: "Task list",
    icon: CheckSquare,
    description: "Organize and prioritize your tasks efficiently",
    mockContent: (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 h-full">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-4 h-4 border-2 border-green-500 rounded bg-green-500 flex items-center justify-center">
              <div className="w-2 h-1 bg-white rotate-45 border-b border-r border-white"></div>
            </div>
            <span className="line-through text-muted-foreground">Complete project proposal</span>
            <span className="ml-auto text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">Done</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
            <span>Review design mockups</span>
            <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">In Progress</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
            <span>Schedule client meeting</span>
            <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">To Do</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
            <span>Update website content</span>
            <span className="ml-auto text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">High</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "kanban",
    name: "Kanban board",
    icon: BarChart,
    description: "Visual workflow management for better productivity",
    mockContent: (
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 h-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-3 text-gray-600 dark:text-gray-400">To Do</h4>
            <div className="space-y-2">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded text-xs">
                Research competitors
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-xs">
                Create wireframes
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-3 text-gray-600 dark:text-gray-400">In Progress</h4>
            <div className="space-y-2">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded text-xs">
                Design homepage
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded text-xs">
                User testing
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <h4 className="font-medium text-sm mb-3 text-gray-600 dark:text-gray-400">Done</h4>
            <div className="space-y-2">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded text-xs">
                Project kickoff
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "projects",
    name: "Projects",
    icon: FolderOpen,
    description: "Manage multiple projects with team collaboration",
    mockContent: (
      <div className="bg-gradient-to-br from-indigo-50 to-cyan-100 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-lg p-6 h-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-sm">Website Redesign</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">Due: Dec 15, 2024</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">75% Complete</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-sm">Mobile App</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">Due: Jan 30, 2025</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">50% Complete</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="font-medium text-sm">Marketing Campaign</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">Due: Dec 31, 2024</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full w-1/4"></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">25% Complete</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-sm">Team Training</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">Due: Feb 15, 2025</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-1/6"></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">10% Complete</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "notes",
    name: "Notes",
    icon: FileText,
    description: "Capture ideas and important information",
    mockContent: (
      <div className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-6 h-full">
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-sm">Meeting Notes - Project Kickoff</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Dec 10, 2024</p>
            <p className="text-sm">Discussed project timeline, resource allocation, and key milestones...</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-green-500" />
              <span className="font-medium text-sm">Ideas for UI Improvements</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Dec 8, 2024</p>
            <p className="text-sm">Consider adding dark mode toggle, improve mobile navigation...</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-sm">Client Feedback</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Dec 5, 2024</p>
            <p className="text-sm">Client requested changes to color scheme and typography...</p>
          </div>
        </div>
      </div>
    )
  }
]

export const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState("calendar")

  const currentFeature = features.find(f => f.id === activeFeature)

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2">Core Features</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See UDX3 in Action
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Experience our powerful work management tools through interactive previews
          </p>
        </div>

        <Card className="mx-auto max-w-6xl overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
          <CardContent className="p-0">
            {/* Feature Tabs */}
            <div className="flex flex-wrap justify-center bg-muted/20 p-2 gap-2">
              {features.map((feature) => {
                const Icon = feature.icon
                const isActive = feature.id === activeFeature
                return (
                  <Button
                    key={feature.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFeature(feature.id)}
                    className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${
                      isActive 
                        ? "bg-white/20" 
                        : "bg-primary/10"
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-primary"
                      }`} />
                    </div>
                    <span className="font-medium">{feature.name}</span>
                  </Button>
                )
              })}
            </div>

            {/* Feature Content */}
            <div className="p-8">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {currentFeature?.name}
                </h3>
                <p className="text-muted-foreground">
                  {currentFeature?.description}
                </p>
              </div>

              {/* Mock Feature Interface */}
              <div className="h-80 w-full animate-fade-in">
                {currentFeature?.mockContent}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No credit card required.
                </p>
                <Button className="bg-gradient-primary hover:opacity-90 px-6 py-2">
                  Try {currentFeature?.name} Free
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}