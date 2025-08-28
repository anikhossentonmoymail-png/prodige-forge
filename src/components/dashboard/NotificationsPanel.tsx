import { Bell, CheckCircle, Clock, AlertCircle, MessageSquare, Users, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "task" | "deadline" | "comment" | "team" | "meeting"
  title: string
  message: string
  time: string
  read: boolean
  sender?: {
    name: string
    avatar?: string
    fallback: string
  }
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "New task assigned",
    message: "You have been assigned to 'Review design mockups' in Website Redesign project",
    time: "2 minutes ago",
    read: false,
    sender: { name: "Sarah", fallback: "SM" }
  },
  {
    id: "2",
    type: "deadline",
    title: "Deadline approaching",
    message: "Task 'Implement authentication' is due in 2 hours",
    time: "1 hour ago", 
    read: false
  },
  {
    id: "3",
    type: "comment",
    title: "New comment on task",
    message: "Mike commented on 'Fix responsive layout issues': Great progress on the mobile view!",
    time: "3 hours ago",
    read: true,
    sender: { name: "Mike", fallback: "MJ" }
  },
  {
    id: "4",
    type: "team",
    title: "Team member joined",
    message: "Alice Brown joined the Mobile App Development project",
    time: "5 hours ago",
    read: true,
    sender: { name: "Alice", fallback: "AB" }
  },
  {
    id: "5",
    type: "meeting",
    title: "Meeting reminder",
    message: "Daily standup meeting starts in 30 minutes",
    time: "8 hours ago",
    read: true
  },
  {
    id: "6",
    type: "task",
    title: "Task completed",
    message: "Bob marked 'Database optimization' as completed",
    time: "1 day ago",
    read: true,
    sender: { name: "Bob", fallback: "BW" }
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "task": return CheckCircle
    case "deadline": return Clock
    case "comment": return MessageSquare
    case "team": return Users
    case "meeting": return Calendar
    default: return Bell
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "task": return "text-blue-600 bg-blue-100 dark:bg-blue-900"
    case "deadline": return "text-red-600 bg-red-100 dark:bg-red-900"
    case "comment": return "text-green-600 bg-green-100 dark:bg-green-900"
    case "team": return "text-purple-600 bg-purple-100 dark:bg-purple-900"
    case "meeting": return "text-orange-600 bg-orange-100 dark:bg-orange-900"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900"
  }
}

export const NotificationsPanel = () => {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount} new</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              
              return (
                <div
                  key={notification.id}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50
                    ${!notification.read ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : 'bg-background'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      
                      {notification.sender && (
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={notification.sender.avatar} />
                            <AvatarFallback className="text-xs">{notification.sender.fallback}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{notification.sender.name}</span>
                        </div>
                      )}
                    </div>
                    
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Assignments</p>
                <p className="text-sm text-muted-foreground">Get notified when tasks are assigned to you</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deadline Reminders</p>
                <p className="text-sm text-muted-foreground">Receive reminders for upcoming deadlines</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Team Updates</p>
                <p className="text-sm text-muted-foreground">Stay informed about team changes and updates</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Comments & Mentions</p>
                <p className="text-sm text-muted-foreground">Get notified when someone comments or mentions you</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}