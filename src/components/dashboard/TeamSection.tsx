import { Plus, Mail, Phone, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Away" | "Busy" | "Offline"
  avatar?: string
  fallback: string
  activeTasks: number
  completedTasks: number
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Project Manager",
    status: "Active",
    fallback: "JD",
    activeTasks: 5,
    completedTasks: 23
  },
  {
    id: "2", 
    name: "Sarah Smith",
    email: "sarah@company.com",
    role: "UI/UX Designer",
    status: "Active",
    fallback: "SS",
    activeTasks: 3,
    completedTasks: 18
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com", 
    role: "Frontend Developer",
    status: "Away",
    fallback: "MJ",
    activeTasks: 4,
    completedTasks: 31
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@company.com",
    role: "Backend Developer", 
    status: "Active",
    fallback: "AB",
    activeTasks: 6,
    completedTasks: 28
  },
  {
    id: "5",
    name: "Bob Wilson",
    email: "bob@company.com",
    role: "QA Engineer",
    status: "Busy",
    fallback: "BW", 
    activeTasks: 2,
    completedTasks: 15
  },
  {
    id: "6",
    name: "Emma Davis",
    email: "emma@company.com",
    role: "Marketing Specialist",
    status: "Offline",
    fallback: "ED",
    activeTasks: 1,
    completedTasks: 12
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    case "Away": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
    case "Busy": return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
    case "Offline": return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getStatusIndicatorColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-500"
    case "Away": return "bg-yellow-500"
    case "Busy": return "bg-red-500"
    case "Offline": return "bg-gray-400"
    default: return "bg-gray-400"
  }
}

export const TeamSection = () => {
  const activeMembers = teamMembers.filter(member => member.status === "Active").length
  const totalTasks = teamMembers.reduce((sum, member) => sum + member.activeTasks, 0)

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
              <p className="text-2xl font-bold text-green-600">{activeMembers}</p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
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

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Tasks</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.fallback}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusIndicatorColor(member.status)}`} />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline">{member.role}</Badge>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-center">
                        <span className="font-medium">{member.activeTasks}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-center">
                        <span className="text-muted-foreground">{member.completedTasks}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Assign Task</DropdownMenuItem>
                          <DropdownMenuItem>View Tasks</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove from Team</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <Plus className="h-5 w-5 mb-2" />
              <div className="text-left">
                <p className="font-medium">Create Team Task</p>
                <p className="text-xs text-muted-foreground">Assign a task to team members</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <Mail className="h-5 w-5 mb-2" />
              <div className="text-left">
                <p className="font-medium">Send Team Update</p>
                <p className="text-xs text-muted-foreground">Notify team about project changes</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <Phone className="h-5 w-5 mb-2" />
              <div className="text-left">
                <p className="font-medium">Schedule Meeting</p>
                <p className="text-xs text-muted-foreground">Plan a team meeting or standup</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}