import { Plus, UserPlus, Users, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AddTeamMemberForm } from "./AddTeamMemberForm"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Away" | "Busy" | "Offline"
  fallback: string
  activeTasks: number
  completedTasks: number
}

export const TeamSection = ({ showAddForm = false, onShowAddForm }: { 
  showAddForm?: boolean
  onShowAddForm?: (show: boolean) => void 
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  
  const handleAddMember = (memberData: any) => {
    const newMember: TeamMember = {
      id: memberData.id,
      name: memberData.name,
      email: memberData.email,
      role: memberData.role,
      status: "Active",
      fallback: memberData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
      activeTasks: 0,
      completedTasks: 0
    }
    setTeamMembers([...teamMembers, newMember])
  }

  if (showAddForm) {
    return <AddTeamMemberForm onMemberAdd={handleAddMember} />
  }

  if (teamMembers.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-muted/50 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <UserPlus className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No team members yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start building your team by adding your first member. Collaborate better with your teammates!
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => onShowAddForm?.(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Invite by Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Stats - Empty State */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-muted-foreground">Active Tasks</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">0</p>
                <p className="text-sm text-muted-foreground">Completed Tasks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col items-start"
                onClick={() => onShowAddForm?.(true)}
              >
                <UserPlus className="h-5 w-5 mb-2" />
                <div className="text-left">
                  <p className="font-medium">Add Team Members</p>
                  <p className="text-xs text-muted-foreground">Build your team and start collaborating</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex-col items-start">
                <Mail className="h-5 w-5 mb-2" />
                <div className="text-left">
                  <p className="font-medium">Send Invitations</p>
                  <p className="text-xs text-muted-foreground">Invite people via email to join your team</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If there are team members, show the full team interface
  return (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{teamMembers.length}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {teamMembers.filter(member => member.status === "Active").length}
              </p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {teamMembers.reduce((sum, member) => sum + member.activeTasks, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Active Tasks</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {teamMembers.reduce((sum, member) => sum + member.completedTasks, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Completed Tasks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Members ({teamMembers.length})</CardTitle>
            <Button onClick={() => onShowAddForm?.(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{member.fallback}</span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}