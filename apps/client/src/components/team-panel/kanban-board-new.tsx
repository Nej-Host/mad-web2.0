'use client'

import { useState, useMemo } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3 } from 'lucide-react'
import { Task, Column } from '@madzone/shared'
import { KanbanColumn } from './kanban-column'
import { TaskCard } from './task-card'

interface KanbanBoardProps {
  columns: Column[]
  onTaskMove: (taskId: string, destinationColumnId: string, newIndex: number) => void
  onTaskClick: (task: Task) => void
  onCreateTask: (columnId: string) => void
  loading?: boolean
}

export function KanbanBoard({ 
  columns,
  onTaskMove,
  onTaskClick,
  onCreateTask,
  loading = false
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )

  // Get all tasks for DndContext
  const allTasks = useMemo(() => {
    return columns.flatMap(column => column.tasks)
  }, [columns])

  // Get all column IDs for SortableContext
  const columnIds = useMemo(() => {
    return columns.map(column => column.id)
  }, [columns])

  const handleDragStart = (event: DragStartEvent) => {
    const task = allTasks.find(t => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    
    const { active, over } = event
    if (!over) return

    const activeTaskId = active.id as string
    const overId = over.id as string

    // Find source and destination columns
    const sourceColumn = columns.find(col => 
      col.tasks.some(task => task.id === activeTaskId)
    )
    const destinationColumn = columns.find(col => 
      col.id === overId || col.tasks.some(task => task.id === overId)
    )

    if (!sourceColumn || !destinationColumn) return

    const destinationColumnId = destinationColumn.id
    
    // If dropping on a task, find its position
    let newIndex = destinationColumn.tasks.length
    if (destinationColumn.tasks.some(task => task.id === overId)) {
      newIndex = destinationColumn.tasks.findIndex(task => task.id === overId)
    }

    // Only move if position actually changed
    if (sourceColumn.id !== destinationColumnId || 
        sourceColumn.tasks.findIndex(task => task.id === activeTaskId) !== newIndex) {
      onTaskMove(activeTaskId, destinationColumnId, newIndex)
    }
  }

  const totalTasks = allTasks.length
  const completedTasks = columns
    .find(col => col.title.toLowerCase().includes('done') || col.title.toLowerCase().includes('dokončeno'))
    ?.tasks.length || 0

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Kanban Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-8 bg-muted rounded animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, taskIndex) => (
                    <div key={taskIndex} className="h-24 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Kanban Board
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{completedTasks}/{totalTasks} dokončených</span>
              <Badge variant="outline" className="text-xs">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SortableContext 
              items={columnIds} 
              strategy={verticalListSortingStrategy}
            >
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onTaskClick={onTaskClick}
                  onCreateTask={() => onCreateTask(column.id)}
                />
              ))}
            </SortableContext>
          </div>
          
          <DragOverlay>
            {activeTask ? (
              <TaskCard 
                task={activeTask} 
                onClick={() => {}} 
                isDragging 
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </CardContent>
    </Card>
  )
}
