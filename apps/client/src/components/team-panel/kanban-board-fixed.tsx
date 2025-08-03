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
import { arrayMove } from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Task, Column } from '@madzone/shared'
import { KanbanColumn } from './kanban-column'
import { TaskCard } from './task-card'

interface KanbanBoardProps {
  columns: Column[]
  onTaskMove: (taskId: string, destinationColumnId: string, newIndex: number) => void
  onTaskClick: (task: Task) => void
  onCreateTask: () => void
}

export function KanbanBoard({ 
  columns: initialColumns,
  onTaskMove,
  onTaskClick,
  onCreateTask
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [columns, setColumns] = useState<Column[]>(initialColumns)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Získání všech úkolů z všech sloupců
  const allTasks = useMemo(() => {
    return columns.flatMap(column => column.tasks)
  }, [columns])

  const handleDragStart = (event: DragStartEvent) => {
    const task = allTasks.find(t => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    
    if (!over) return

    const activeTaskId = active.id as string
    const overItemId = over.id as string

    // Pokud je target sloupec
    const overColumn = columns.find(col => col.id === overItemId)
    if (overColumn) {
      const activeTask = allTasks.find(t => t.id === activeTaskId)
      if (!activeTask) return

      // Pokud se úkol přesouvá do jiného sloupce
      if (activeTask.columnId !== overColumn.id) {
        setColumns(prev => prev.map(column => {
          if (column.id === activeTask.columnId) {
            // Odebrat z původního sloupce
            return {
              ...column,
              tasks: column.tasks.filter(task => task.id !== activeTaskId)
            }
          } else if (column.id === overColumn.id) {
            // Přidat do nového sloupce
            return {
              ...column,
              tasks: [...column.tasks, { ...activeTask, columnId: overColumn.id }]
            }
          }
          return column
        }))
      }
      return
    }

    // Pokud je target úkol
    const overTask = allTasks.find(t => t.id === overItemId)
    if (overTask) {
      const activeTask = allTasks.find(t => t.id === activeTaskId)
      if (!activeTask || activeTask.columnId !== overTask.columnId) return

      setColumns(prev => prev.map(column => {
        if (column.id === activeTask.columnId) {
          const tasks = [...column.tasks]
          const activeIndex = tasks.findIndex(t => t.id === activeTaskId)
          const overIndex = tasks.findIndex(t => t.id === overItemId)
          
          if (activeIndex !== -1 && overIndex !== -1) {
            const reorderedTasks = arrayMove(tasks, activeIndex, overIndex)
            return {
              ...column,
              tasks: reorderedTasks
            }
          }
        }
        return column
      }))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      setActiveTask(null)
      return
    }

    const activeTaskId = active.id as string
    const overItemId = over.id as string

    const activeTask = allTasks.find(t => t.id === activeTaskId)
    if (!activeTask) {
      setActiveTask(null)
      return
    }

    // Pokud je target sloupec
    const overColumn = columns.find(col => col.id === overItemId)
    if (overColumn && activeTask.columnId !== overColumn.id) {
      onTaskMove(activeTaskId, overColumn.id, 0)
    }

    // Pokud je target úkol
    const overTask = allTasks.find(t => t.id === overItemId)
    if (overTask && activeTask.columnId === overTask.columnId) {
      const column = columns.find(col => col.id === activeTask.columnId)
      if (column) {
        const tasks = column.tasks
        const activeIndex = tasks.findIndex(t => t.id === activeTaskId)
        const overIndex = tasks.findIndex(t => t.id === overItemId)
        
        if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
          onTaskMove(activeTaskId, activeTask.columnId, overIndex)
        }
      }
    }

    setActiveTask(null)
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">Kanban Board</h1>
            <p className="text-muted-foreground">
              Spravujte úkoly pomocí drag & drop
            </p>
          </div>
          <Button onClick={onCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            Nový úkol
          </Button>
        </div>

        {/* Board */}
        <div className="flex-1 overflow-auto p-6">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onTaskClick={onTaskClick}
                  onCreateTask={onCreateTask}
                />
              ))}
            </div>
            
            <DragOverlay>
              {activeTask ? (
                <TaskCard task={activeTask} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  )
}
