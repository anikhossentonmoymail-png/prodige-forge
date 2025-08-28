import { useState } from "react";
import { MoreHorizontal, Clock, Flag, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Task {
  id: string;
  title: string;
  assignee: {
    name: string;
    avatar?: string;
    fallback: string;
  };
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "New task" | "In Progress" | "Completed";
  type: "Operational" | "Bug Fix" | "Feature" | "Research";
  completed: boolean;
}

const tasks: Task[] = [
  // Existing tasks data...
];

const getPriorityColor = (priority: string) => {
  // Priority color mapping...
};

const getStatusColor = (status: string) => {
  // Status color mapping...
};

const getTypeColor = (type: string) => {
  // Type color mapping...
};

export const TaskList = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false); // Show create task form
  const [newTaskTitle, setNewTaskTitle] = useState(""); // State to track new task title
  const [newTaskDueDate, setNewTaskDueDate] = useState(""); // State to track due date
  const [newTaskPriority, setNewTaskPriority] = useState<"Low" | "Medium" | "High">("Low"); // Task priority

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const handleCreateTask = () => {
    if (newTaskTitle.trim() === "") return; // Don't create task if title is empty
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      assignee: { name: "Unassigned", fallback: "UA" },
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
      status: "New task",
      type: "Operational",
      completed: false,
    };
    tasks.push(newTask); // Add task to tasks array (you would update state in a real app)
    setShowCreateTaskForm(false); // Hide the create task form
    setNewTaskTitle(""); // Clear input fields
    setNewTaskDueDate("");
    setNewTaskPriority("Low");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tasks</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("all")}>All Tasks</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("active")}>Active Tasks</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("completed")}>Completed Tasks</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" onClick={() => setShowCreateTaskForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create task
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Task Creation Form (if visible) */}
        {showCreateTaskForm && (
          <div className="space-y-4 p-4 border rounded-md">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task Title"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as "Low" | "Medium" | "High")}
              className="w-full p-2 border rounded-md"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <Button onClick={handleCreateTask} className="w-full bg-blue-600 text-white">
              Create Task
            </Button>
          </div>
        )}

        {/* Active Tasks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center gap-2">
              Active tasks
              <Badge variant="secondary">{activeTasks.length}</Badge>
            </h3>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTasks.map((task) => (
                  <TableRow key={task.id} className="group">
                    <TableCell>
                      <Checkbox
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => toggleTaskSelection(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(task.type)}>
                        {task.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {task.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <div className="space-y-4 mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                Completed tasks
                <Badge variant="secondary">{completedTasks.length}</Badge>
              </h3>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Great job! You have {completedTasks.length} completed tasks.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
