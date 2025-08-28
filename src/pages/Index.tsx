import { Link } from "react-router-dom"
import { ArrowRight, Calendar, CheckSquare, BarChart, Users, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FeatureShowcase } from "@/components/FeatureShowcase"

const features = [
  {
    icon: Calendar,
    title: "Calendar planner",
    description: "Visual scheduling with drag-and-drop functionality"
  },
  {
    icon: CheckSquare,
    title: "Task list",
    description: "Organize and prioritize your tasks efficiently"
  },
  {
    icon: BarChart,
    title: "Kanban board",
    description: "Visual workflow management for better productivity"
  },
  {
    icon: Users,
    title: "Team collaboration",
    description: "Work together seamlessly with real-time updates"
  },
  {
    icon: Clock,
    title: "Time tracking",
    description: "Monitor time spent on tasks and projects"
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automate repetitive tasks and workflows"
  }
]

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[800px] w-[800px] rounded-full bg-gradient-primary blur-3xl opacity-30" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in-up">
              Work Management Platform
              <span className="block text-primary">for Result-Driven Teams</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              UDX3 helps teams to plan work, track progress, and get results. Streamline your workflow with our comprehensive project management tools.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:opacity-90 text-base px-8 py-3 transition-all duration-300 hover:scale-105">
                  Try UDX3 for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/solutions">
                <Button variant="outline" className="text-base px-8 py-3">
                  View Solutions
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage work
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Powerful features designed to help teams collaborate, organize, and deliver results.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={feature.title} 
                  className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-primary/10 flex items-center justify-center group-hover:bg-gradient-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
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
              Ready to boost your team's productivity?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of teams already using UDX3 to streamline their work management and achieve better results.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/signup">
                <Button variant="secondary" className="text-base px-8 py-3 hover:scale-105 transition-transform">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-base px-8 py-3 text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-white/20 to-blue-300/20 opacity-20" />
        </div>
      </section>
    </div>
  )
}

export default Index
