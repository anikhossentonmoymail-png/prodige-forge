import { useState } from "react"
import { Plus, FileText, Calendar, Search, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingTitle, setEditingTitle] = useState("")
  const [editingContent, setEditingContent] = useState("")

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New note",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setEditingTitle(newNote.title)
    setEditingContent(newNote.content)
    setIsCreating(false)
  }

  const handleSaveNote = () => {
    if (!selectedNote) return
    
    const updatedNote = {
      ...selectedNote,
      title: editingTitle || "Untitled",
      content: editingContent,
      updatedAt: new Date().toISOString()
    }
    
    setNotes(notes.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ))
    setSelectedNote(updatedNote)
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId))
    if (selectedNote?.id === noteId) {
      setSelectedNote(null)
      setEditingTitle("")
      setEditingContent("")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    
    if (date.toDateString() === today.toDateString()) {
      return "Today"
    }
    
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notes
            </CardTitle>
            <Button onClick={handleCreateNote} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add new
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first note to start capturing ideas and important information.
              </p>
              <Button onClick={handleCreateNote} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create your first note
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 min-h-[500px]">
              {/* Notes List */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search notes..." 
                    className="pl-9 bg-muted/50 border-0"
                  />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => {
                        setSelectedNote(note)
                        setEditingTitle(note.title)
                        setEditingContent(note.content)
                      }}
                      className={`
                        p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50
                        ${selectedNote?.id === note.id ? 'bg-primary/10 border-primary/20' : 'bg-background'}
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm truncate flex-1">
                          {note.title}
                        </h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteNote(note.id)
                            }} className="text-destructive">
                              Delete Note
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {note.content || "No content"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(note.updatedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note Editor */}
              <div className="lg:col-span-2">
                {selectedNote ? (
                  <div className="space-y-4 h-full">
                    <div className="flex items-center justify-between">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={handleSaveNote}
                        className="text-xl font-bold border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                        placeholder="Note title..."
                      />
                      <Badge variant="outline" className="text-xs">
                        Last edited: {formatDate(selectedNote.updatedAt)}
                      </Badge>
                    </div>

                    <Textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      onBlur={handleSaveNote}
                      placeholder="Write your text here..."
                      className="min-h-[350px] resize-none border-0 p-4 text-base leading-relaxed bg-muted/30 focus-visible:ring-0"
                    />

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add link
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add table
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-center">
                    <div>
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Select a note to edit</h3>
                      <p className="text-muted-foreground">
                        Choose a note from the list to start editing, or create a new one.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}