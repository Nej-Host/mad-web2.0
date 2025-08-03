'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Task, Priority } from '@madzone/shared'
import { mockUsers } from '@/lib/stores/mock-data'
import { Calendar, Clock, User } from 'lucide-react'

interface TaskCardProps {
  task: Task
  isDragging?: boolean
  onClick?: () => void
}

export function TaskCard({ task, isDragging, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const assignedUser = mockUsers.find(user => user.id === (task.assigneeId || task.assignedTo))

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT: return 'bg-red-100 text-red-700 border-red-200'
      case Priority.HIGH: return 'bg-orange-100 text-orange-700 border-orange-200'
      case Priority.MEDIUM: return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case Priority.LOW: return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT: return 'Urgentní'
      case Priority.HIGH: return 'Vysoká'
      case Priority.MEDIUM: return 'Střední'
      case Priority.LOW: return 'Nízká'
      default: return 'Neuvedeno'
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title */}
          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
          
          {/* Description */}
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.labels.map((label: string) => (
                <Badge key={label} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          {/* Priority */}
          <Badge className={`text-xs w-fit ${getPriorityColor(task.priority)}`}>
            {getPriorityText(task.priority)}
          </Badge>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {/* Due Date */}
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString('cs-CZ')}</span>
                </div>
              )}
              
              {/* Estimated Hours */}
              {task.estimatedHours && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{task.estimatedHours}h</span>
                </div>
              )}
            </div>

            {/* Assigned User */}
            {assignedUser && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="truncate max-w-20">{assignedUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
