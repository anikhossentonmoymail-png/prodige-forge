import { Bell, CheckCircle, Clock, AlertCircle, MessageSquare, Users, Calendar, Settings as SettingsIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface NotificationSettings {
  taskAssignments: boolean
  deadlineReminders: boolean
  teamUpdates: boolean
  comments: boolean
}

export const NotificationsPanel = () => {
  const [notifications] = useState<any[]>([]) // Empty notifications by default
  const [settings, setSettings] = useState<NotificationSettings>({
    taskAssignments: true,
    deadlineReminders: true,
    teamUpdates: true,
    comments: true
  })

  const handleSettingChange = (setting: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Notifications</CardTitle>
              <Badge variant="outline">0 new</Badge>
            </div>
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
              <p className="text-muted-foreground mb-6">
                You'll see notifications here when there's activity on your tasks and projects.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Task assignments and updates</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span>Deadline reminders</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>Team member activities</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span>Comments and mentions</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50"
                >
                  {/* Notification content would go here */}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <p className="font-medium">Task Assignments</p>
                </div>
                <p className="text-sm text-muted-foreground">Get notified when tasks are assigned to you</p>
              </div>
              <Switch 
                checked={settings.taskAssignments}
                onCheckedChange={() => handleSettingChange('taskAssignments')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-500" />
                  <p className="font-medium">Deadline Reminders</p>
                </div>
                <p className="text-sm text-muted-foreground">Receive reminders for upcoming deadlines</p>
              </div>
              <Switch 
                checked={settings.deadlineReminders}
                onCheckedChange={() => handleSettingChange('deadlineReminders')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <p className="font-medium">Team Updates</p>
                </div>
                <p className="text-sm text-muted-foreground">Stay informed about team changes and updates</p>
              </div>
              <Switch 
                checked={settings.teamUpdates}
                onCheckedChange={() => handleSettingChange('teamUpdates')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <p className="font-medium">Comments & Mentions</p>
                </div>
                <p className="text-sm text-muted-foreground">Get notified when someone comments or mentions you</p>
              </div>
              <Switch 
                checked={settings.comments}
                onCheckedChange={() => handleSettingChange('comments')}
              />
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Email Notifications
              </Button>
              <Button variant="outline" size="sm">
                Push Notifications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium">0 Tasks Assigned</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium">0 Due Soon</p>
              <p className="text-xs text-muted-foreground">Next 24 hours</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">0 Comments</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}