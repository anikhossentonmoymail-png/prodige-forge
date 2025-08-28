import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date(2024, 11, 15),
    type: "meeting",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Project Deadline",
    date: new Date(2024, 11, 18),
    type: "deadline",
    color: "bg-red-500"
  },
  {
    id: 3,
    title: "Client Review",
    date: new Date(2024, 11, 20),
    type: "meeting", 
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Sprint Planning",
    date: new Date(2024, 11, 22),
    type: "meeting",
    color: "bg-green-500"
  }
]

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay())

  const weeks = []
  const currentWeekDate = new Date(startDate)

  for (let week = 0; week < 6; week++) {
    const days = []
    for (let day = 0; day < 7; day++) {
      days.push(new Date(currentWeekDate))
      currentWeekDate.setDate(currentWeekDate.getDate() + 1)
    }
    weeks.push(days)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(month - 1)
    } else {
      newDate.setMonth(month + 1)
    }
    setCurrentDate(newDate)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-lg font-semibold min-w-[140px] text-center">
                {months[month]} {year}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-px mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {weeks.map((week, weekIndex) => 
              week.map((date, dayIndex) => {
                const dayEvents = getEventsForDate(date)
                const isCurrentMonthDate = isCurrentMonth(date)
                const isTodayDate = isToday(date)

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`
                      min-h-[120px] bg-background p-2 hover:bg-muted/50 transition-colors cursor-pointer
                      ${!isCurrentMonthDate ? 'opacity-30' : ''}
                      ${isTodayDate ? 'bg-primary/5 border border-primary' : ''}
                    `}
                  >
                    <div className={`
                      text-sm font-medium mb-1
                      ${isTodayDate ? 'text-primary' : isCurrentMonthDate ? 'text-foreground' : 'text-muted-foreground'}
                    `}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}