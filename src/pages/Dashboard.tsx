import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ProjectOverview } from "@/components/dashboard/ProjectOverview"
import { TaskKanban } from "@/components/dashboard/TaskKanban"
import { TaskList } from "@/components/dashboard/TaskList"
import { CalendarView } from "@/components/dashboard/CalendarView"
import { TeamSection } from "@/components/dashboard/TeamSection"
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel"
import { AIAssistant } from "@/components/dashboard/AIAssistant"
import { SidebarProvider } from "@/components/ui/sidebar"

export type DashboardView = 'overview' | 'tasks' | 'calendar' | 'team' | 'notifications' | 'ai-assistant' | 'settings'

const Dashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>('overview')

  const renderMainContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <ProjectOverview />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <TaskKanban />
                <TaskList />
              </div>
              <div>
                <AIAssistant />
              </div>
            </div>
          </div>
        )
      case 'tasks':
        return (
          <div className="space-y-6">
            <TaskKanban />
            <TaskList />
          </div>
        )
      case 'calendar':
        return <CalendarView />
      case 'team':
        return <TeamSection />
      case 'notifications':
        return <NotificationsPanel />
      case 'ai-assistant':
        return <AIAssistant />
      case 'settings':
        return (
          <div className="bg-card rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        )
      default:
        return <ProjectOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {renderMainContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard