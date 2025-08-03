'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { TeamCalendar } from '@/components/team-panel/team-calendar'
import { KanbanBoard } from '@/components/team-panel/kanban-board'
import { ExpenseTracker } from '@/components/team-panel/expense-tracker'
import { Calendar, Kanban, DollarSign, Users, LogOut } from 'lucide-react'
import { useAuth, useAuthGuard } from '@/store/auth-store'
import type { Task, Column, Event, Expense } from '@madzone/shared'

// Mock data pro team panel (když jsou GraphQL endpointy nedostupné)
const mockKanbanData = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      position: 0,
      color: '#3B82F6',
      tasks: [
        { 
          id: '1', 
          title: 'Naplánovat expedici', 
          description: 'Připravit detailní plán expedice', 
          status: 'TODO' as const,
          priority: 'HIGH' as const, 
          position: 0,
          columnId: 'todo',
          createdById: 'admin',
          assigneeId: 'jan',
          assignedTo: 'Jan',
          createdBy: 'admin',
          projectId: 'expedition-project',
          labels: ['expedice'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          id: '2', 
          title: 'Zkontrolovat vybavení', 
          description: 'Projít a zkontrolovat veškeré vybavení', 
          status: 'TODO' as const,
          priority: 'MEDIUM' as const, 
          position: 1,
          columnId: 'todo',
          createdById: 'admin',
          assigneeId: 'anna',
          assignedTo: 'Anna',
          createdBy: 'admin',
          projectId: 'expedition-project',
          labels: ['vybavení'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as Task[]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      position: 1,
      color: '#F59E0B',
      tasks: [
        { 
          id: '3', 
          title: 'Rezervace ubytování', 
          description: 'Zarezervovat ubytování na trase', 
          status: 'IN_PROGRESS' as const,
          priority: 'HIGH' as const, 
          position: 0,
          columnId: 'in-progress',
          createdById: 'admin',
          assigneeId: 'pavel',
          assignedTo: 'Pavel',
          createdBy: 'admin',
          projectId: 'expedition-project',
          labels: ['ubytování'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as Task[]
    },
    {
      id: 'done',
      title: 'Done',
      position: 2,
      color: '#10B981',
      tasks: [
        { 
          id: '4', 
          title: 'Nákup potravin', 
          description: 'Nakoupit potraviny na expedici', 
          status: 'DONE' as const,
          priority: 'LOW' as const, 
          position: 0,
          columnId: 'done',
          createdById: 'admin',
          assigneeId: 'anna',
          assignedTo: 'Anna',
          createdBy: 'admin',
          projectId: 'expedition-project',
          labels: ['potraviny'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as Task[]
    }
  ] as Column[]
}

const mockEvents = [
  {
    id: '1',
    title: 'Týmový meeting',
    start: new Date(2025, 7, 5, 10, 0),
    end: new Date(2025, 7, 5, 11, 0),
    description: 'Týdenní týmový meeting',
    allDay: false,
    color: '#3B82F6',
    createdById: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2', 
    title: 'Expedice - start',
    start: new Date(2025, 7, 10),
    end: new Date(2025, 7, 15),
    description: 'Hlavní expedice do hor',
    allDay: true,
    color: '#10B981',
    createdById: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
] as Event[]

const mockExpenses = [
  {
    id: '1',
    title: 'Benzín',
    amount: 2500,
    currency: 'CZK',
    date: new Date(2025, 7, 1),
    categoryId: 'transport',
    createdById: 'jan',
    status: 'APPROVED' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: 'transport',
      name: 'Transport',
      color: '#3B82F6',
      icon: 'car'
    }
  },
  {
    id: '2',
    title: 'Ubytování',
    amount: 4200,
    currency: 'CZK',
    date: new Date(2025, 7, 2),
    categoryId: 'accommodation',
    createdById: 'anna',
    status: 'PENDING' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: 'accommodation',
      name: 'Ubytování',
      color: '#10B981',
      icon: 'home'
    }
  }
] as Expense[]

export default function TeamPanelPage() {
  const { user, logout } = useAuth()
  const { isAuthenticated, isEditor } = useAuthGuard()
  const router = useRouter()
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

  // Debug logging
  console.log('TeamPanel - Auth state:', { 
    isAuthenticated, 
    isEditor, 
    user: user?.email, 
    userRole: user?.role 
  })

  useEffect(() => {
    console.log('TeamPanel - useEffect triggered:', { isAuthenticated, isEditor })
    
    if (!isAuthenticated) {
      console.log('TeamPanel - Not authenticated, redirecting to team login')
      router.push('/team-login')
      return
    }
    
    // Team panel je dostupný pro editory a adminy  
    if (!isEditor) {
      console.log('TeamPanel - Not editor/admin, redirecting to team login')
      router.push('/team-login')
      return
    }
    
    console.log('TeamPanel - Access granted')
  }, [isAuthenticated, isEditor, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (!isAuthenticated || !isEditor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-slate-900 dark:text-white text-center">
          <div className="mb-4">Ověřuji oprávnění týmového panelu...</div>
          <div className="w-6 h-6 border-2 border-slate-900/20 dark:border-white/20 border-t-slate-900 dark:border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  
  // Event handlers
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    console.log('Event clicked:', event)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    console.log('Task clicked:', task)
  }

  const handleTaskMove = async (taskId: string, destinationColumn: string, newIndex: number) => {
    try {
      // Mock implementation - v reálné aplikaci by se volal GraphQL mutation
      console.log('Task moved:', { taskId, destinationColumn, newIndex })
    } catch (error) {
      console.error('Error moving task:', error)
    }
  }

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense)
    console.log('Expense clicked:', expense)
  }

  const handleCreateTask = () => {
    console.log('Create new task')
  }

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date)
  }

  const handleEventDrop = (eventId: string, newStart: Date, newEnd: Date | undefined) => {
    console.log('Event dropped:', { eventId, newStart, newEnd })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Týmový Panel
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Komplexní správa projektů, úkolů a výdajů
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Přihlášen jako: <strong>{user?.email}</strong>
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Odhlásit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktivní úkoly</CardTitle>
              <Kanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 oproti minulému týdnu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Události tento týden</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                3 meetingy, 2 deadliny
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Výdaje tento měsíc</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52 400 Kč</div>
              <p className="text-xs text-muted-foreground">
                +12% oproti minulému měsíci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tým</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Aktivní členové
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="kanban" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Kanban className="h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Kalendář
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Výdaje
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-6">
            <KanbanBoard 
              columns={mockKanbanData.columns}
              onTaskClick={handleTaskClick}
              onTaskMove={handleTaskMove}
              onCreateTask={handleCreateTask}
            />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <TeamCalendar 
              events={mockEvents}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onEventDrop={handleEventDrop}
            />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseTracker 
              expenses={mockExpenses}
              onExpenseClick={handleExpenseClick} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
