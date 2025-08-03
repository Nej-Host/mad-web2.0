'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Column, Task } from '@madzone/shared'
import { TaskCard } from './task-card'

interface KanbanColumnProps {
  column: Column
  onTaskClick: (task: Task) => void
  onCreateTask: () => void
}

export function KanbanColumn({ column, onTaskClick, onCreateTask }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <div className="flex-shrink-0 w-full">
      <Card 
        className={`h-fit ${isOver ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''}`}
        style={{ borderColor: column.color }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
            <Badge 
              variant="secondary" 
              style={{ backgroundColor: `${column.color}20`, color: column.color }}
            >
              {column.tasks.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={onCreateTask}
          >
            <Plus className="h-4 w-4 mr-2" />
            Přidat úkol
          </Button>
        </CardHeader>
        <CardContent
          ref={setNodeRef}
          className="space-y-3 min-h-[200px]"
        >
          <SortableContext
            items={column.tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </SortableContext>
          
          {column.tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Žádné úkoly</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
