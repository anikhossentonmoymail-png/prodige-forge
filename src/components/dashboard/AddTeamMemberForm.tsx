import { useState } from "react"
import { Plus, Mail, User, Building, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  phone?: string
  bio?: string
}

interface AddTeamMemberFormProps {
  onMemberAdd?: (member: TeamMember) => void
}

export const AddTeamMemberForm = ({ onMemberAdd }: AddTeamMemberFormProps) => {
  const { toast } = useToast()
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    bio: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!memberData.name || !memberData.email || !memberData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Role)",
        variant: "destructive"
      })
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: memberData.name,
      email: memberData.email,
      role: memberData.role,
      department: memberData.department,
      phone: memberData.phone,
      bio: memberData.bio
    }

    onMemberAdd?.(newMember)
    
    // Reset form
    setMemberData({
      name: "",
      email: "",
      role: "",
      department: "",
      phone: "",
      bio: ""
    })

    toast({
      title: "Team Member Added",
      description: `${memberData.name} has been successfully added to your team.`
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Add Team Member</h1>
      </div>
      <p className="text-muted-foreground">
        Add a new team member to start collaborating on projects and tasks.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Member Information
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={memberData.name}
                  onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={memberData.email}
                  onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            {/* Role and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={memberData.role} 
                  onValueChange={(value) => setMemberData({ ...memberData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                    <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                    <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={memberData.department} 
                  onValueChange={(value) => setMemberData({ ...memberData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={memberData.phone}
                onChange={(e) => setMemberData({ ...memberData, phone: e.target.value })}
                placeholder="Enter phone number (optional)"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={memberData.bio}
                onChange={(e) => setMemberData({ ...memberData, bio: e.target.value })}
                placeholder="Brief description about the team member (optional)"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
              
              <Button type="button" variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <Mail className="h-5 w-5 mb-2" />
              <div className="text-left">
                <p className="font-medium">Bulk Invite</p>
                <p className="text-xs text-muted-foreground">Import multiple team members from CSV</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <Building className="h-5 w-5 mb-2" />
              <div className="text-left">
                <p className="font-medium">Import from Directory</p>
                <p className="text-xs text-muted-foreground">Sync with company directory</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}