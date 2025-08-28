import { 
  ProjectorIcon, 
  Clock, 
  CheckSquare, 
  Users, 
  BarChart, 
  Calendar,
  Target,
  TrendingUp,
  Briefcase
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const useCases = [
  {
    icon: ProjectorIcon,
    title: "Project Management",
    description: "Organize and track all your projects in one place. Manage timelines, resources, and deliverables with ease.",
    features: ["Task dependencies", "Resource allocation", "Progress tracking", "Milestone management"]
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Optimize your time with intelligent scheduling and time tracking tools that help you stay focused and productive.",
    features: ["Time tracking", "Schedule optimization", "Focus sessions", "Time analytics"]
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Create, assign, and track tasks with powerful organizational tools and collaboration features.",
    features: ["Task creation", "Priority setting", "Status tracking", "Team collaboration"]
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Connect your team with real-time updates, shared workspaces, and seamless communication tools.",
    features: ["Real-time updates", "Shared workspaces", "Team messaging", "File sharing"]
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description: "Gain insights into your team's performance with detailed analytics and reporting capabilities.",
    features: ["Performance metrics", "Custom reports", "Data visualization", "Trend analysis"]
  },
  {
    icon: Calendar,
    title: "Resource Planning",
    description: "Plan and allocate resources efficiently across all your projects and team members.",
    features: ["Resource allocation", "Capacity planning", "Workload balancing", "Availability tracking"]
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set, track, and achieve your goals with comprehensive goal management and progress monitoring.",
    features: ["Goal setting", "Progress monitoring", "Achievement tracking", "Success metrics"]
  },
  {
    icon: TrendingUp,
    title: "Workflow Optimization",
    description: "Streamline your processes and eliminate bottlenecks with intelligent workflow management tools.",
    features: ["Process mapping", "Bottleneck identification", "Automation rules", "Efficiency metrics"]
  },
  {
    icon: Briefcase,
    title: "Client Management",
    description: "Manage client relationships, projects, and communication from a single, integrated platform.",
    features: ["Client portals", "Project visibility", "Communication logs", "Billing integration"]
  }
]

const UseCases = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
              Use Cases for Every Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover how UDX3 transforms work management across different scenarios and team structures. 
              From small startups to enterprise organizations, our platform adapts to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <Card 
                  key={useCase.title}
                  className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl group animate-fade-in-up hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-primary/10 flex items-center justify-center group-hover:bg-gradient-primary/20 transition-all duration-300 group-hover:scale-110">
                        <Icon className="h-8 w-8 text-primary animate-float" style={{ animationDelay: `${index * 0.2}s` }} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {useCase.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {useCase.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2 opacity-60" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your workflow?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              See how UDX3 can adapt to your specific use case and help your team achieve better results.
            </p>
            <div className="mt-10">
              <a
                href="/signup"
                className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105"
              >
                Start Your Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UseCases