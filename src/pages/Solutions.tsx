import { 
  FolderOpen, 
  Kanban, 
  Calendar, 
  Clock, 
  Target, 
  BarChart, 
  Users, 
  CheckSquare,
  Timer,
  Layers,
  TrendingUp,
  Settings
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    category: "Project Management",
    items: [
      {
        icon: FolderOpen,
        title: "Project Organizer",
        description: "Centralize all your projects with hierarchical organization, custom fields, and advanced filtering capabilities."
      },
      {
        icon: Kanban,
        title: "Task Board", 
        description: "Visual task management with drag-and-drop kanban boards, custom columns, and automated workflows."
      },
      {
        icon: Users,
        title: "Team Project Tracker",
        description: "Monitor team projects with real-time collaboration, progress tracking, and performance analytics."
      }
    ]
  },
  {
    category: "Time Management", 
    items: [
      {
        icon: Calendar,
        title: "Day Organizer",
        description: "Plan your day with intelligent scheduling, time blocking, and priority-based task organization."
      },
      {
        icon: Clock,
        title: "Digital Daily Planner",
        description: "Comprehensive daily planning with habit tracking, goal setting, and reflection tools."
      },
      {
        icon: Timer,
        title: "Time Manager",
        description: "Advanced time tracking with productivity insights, focus sessions, and automated time logging."
      }
    ]
  },
  {
    category: "Scheduling & Planning",
    items: [
      {
        icon: Layers,
        title: "Weekly Schedule Maker", 
        description: "Create optimized weekly schedules with resource allocation, conflict detection, and smart suggestions."
      },
      {
        icon: Target,
        title: "Task Tracker",
        description: "Comprehensive task tracking with dependencies, milestones, and automated progress reporting."
      },
      {
        icon: CheckSquare,
        title: "Project Task Tracker",
        description: "Project-specific task management with Gantt charts, timeline views, and deadline management."
      }
    ]
  },
  {
    category: "Analytics & Optimization",
    items: [
      {
        icon: BarChart,
        title: "Performance Analytics",
        description: "Deep insights into team performance, project health, and productivity trends with custom dashboards."
      },
      {
        icon: TrendingUp,
        title: "Workflow Optimizer",
        description: "AI-powered workflow analysis and optimization suggestions to eliminate bottlenecks and improve efficiency."
      },
      {
        icon: Settings,
        title: "Process Automation",
        description: "Automate repetitive tasks and workflows with custom rules, triggers, and integrations."
      }
    ]
  }
]

const Solutions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
              Complete Solutions for Modern Teams
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Comprehensive work management solutions designed to streamline your workflow, 
              boost productivity, and help your team achieve exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions by Category */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {solutions.map((category, categoryIndex) => (
            <div key={category.category} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl animate-fade-in-up">
                  {category.category}
                </h2>
                <div className="mt-2 h-1 w-20 bg-gradient-primary rounded-full mx-auto animate-scale-in" />
              </div>
              
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                {category.items.map((solution, index) => {
                  const Icon = solution.icon
                  return (
                    <Card 
                      key={solution.title}
                      className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl group animate-fade-in-up hover:-translate-y-2"
                      style={{ animationDelay: `${(categoryIndex * 0.3) + (index * 0.1)}s` }}
                    >
                      <CardContent className="p-8">
                        <div className="mb-6">
                          <div className="h-16 w-16 rounded-2xl bg-gradient-primary/10 flex items-center justify-center group-hover:bg-gradient-primary/20 transition-all duration-300 group-hover:scale-110 mb-4">
                            <Icon className="h-8 w-8 text-primary animate-float" style={{ animationDelay: `${index * 0.2}s` }} />
                          </div>
                          
                          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {solution.title}
                          </h3>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {solution.description}
                        </p>
                        
                        <Button 
                          variant="ghost" 
                          className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Seamless Integrations
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Connect UDX3 with your favorite tools and platforms for a unified workflow experience.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 lg:mx-0 lg:max-w-none lg:grid-cols-8">
            {/* Integration logos would go here */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="col-span-2 max-h-12 w-full h-12 bg-gradient-primary/10 rounded-lg animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to implement these solutions?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Start with a free trial and see how UDX3 solutions can transform your team's productivity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
              </a>
              <a
                href="/contact"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100 transition-colors"
              >
                Contact Sales <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Solutions