import { Task, Priority, TaskStatus, Event, Expense, ExpenseCategory, ExpenseStatus, Column } from '@madzone/shared'

// Mock Users data pro kompatibilitu se starým kódem
export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@madzone.cz',
    role: 'admin',
    avatar: '',
    department: 'Management',
    position: 'CEO',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    lastLogin: new Date()
  },
  {
    id: '2',
    name: 'Project Manager',
    email: 'manager@madzone.cz',
    role: 'manager',
    avatar: '',
    department: 'Development',
    position: 'PM',
    isActive: true,
    createdAt: new Date('2025-01-15'),
    lastLogin: new Date()
  },
  {
    id: '3',
    name: 'Developer',
    email: 'dev@madzone.cz',
    role: 'member',
    avatar: '',
    department: 'Development',
    position: 'Frontend Dev',
    isActive: true,
    createdAt: new Date('2025-02-01'),
    lastLogin: new Date()
  }
]

// Mock Tasks s novými typy
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Navrhnout GraphQL schéma',
    description: 'Vytvořit kompletní schéma pro Apollo Server včetně typů pro úkoly, události a výdaje',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    position: 0,
    columnId: 'in-progress',
    createdById: '1',
    assigneeId: '3',
    assignedTo: '3', // Pro kompatibilitu
    createdBy: '1', // Pro kompatibilitu
    projectId: 'proj1',
    labels: ['backend', 'graphql'],
    dueDate: new Date('2025-01-25'),
    estimatedHours: 8,
    actualHours: 4,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-21')
  },
  {
    id: '2',
    title: 'Implementovat Kanban komponentu',
    description: 'Vytvořit drag-and-drop Kanban nástěnku s dnd-kit',
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    position: 0,
    columnId: 'todo',
    createdById: '2',
    assigneeId: '3',
    assignedTo: '3', // Pro kompatibilitu
    createdBy: '2', // Pro kompatibilitu
    projectId: 'proj1',
    labels: ['frontend', 'ui'],
    dueDate: new Date('2025-01-30'),
    estimatedHours: 12,
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date('2025-01-18')
  },
  {
    id: '3',
    title: 'Testování API endpointů',
    description: 'Napsat testy pro všechny GraphQL resolvers',
    status: TaskStatus.REVIEW,
    priority: Priority.LOW,
    position: 0,
    columnId: 'review',
    createdById: '1',
    assigneeId: '2',
    assignedTo: '2', // Pro kompatibilitu
    createdBy: '1', // Pro kompatibilitu
    projectId: 'proj1',
    labels: ['testing', 'backend'],
    dueDate: new Date('2025-02-05'),
    estimatedHours: 6,
    actualHours: 3,
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: '4',
    title: 'Dokumentace API',
    description: 'Vytvořit kompletní dokumentaci pro GraphQL API',
    status: TaskStatus.DONE,
    priority: Priority.MEDIUM,
    position: 0,
    columnId: 'done',
    createdById: '2',
    assigneeId: '1',
    assignedTo: '1', // Pro kompatibilitu
    createdBy: '2', // Pro kompatibilitu
    projectId: 'proj1',
    labels: ['documentation'],
    dueDate: new Date('2025-01-20'),
    estimatedHours: 4,
    actualHours: 4,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-19')
  }
]

// Mock Columns
export const mockColumns: Column[] = [
  {
    id: 'todo',
    title: 'K řešení',
    position: 0,
    color: '#6b7280',
    tasks: mockTasks.filter(task => task.status === TaskStatus.TODO)
  },
  {
    id: 'in-progress',
    title: 'Probíhá',
    position: 1,
    color: '#3b82f6',
    tasks: mockTasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
  },
  {
    id: 'review',
    title: 'Kontrola',
    position: 2,
    color: '#f59e0b',
    tasks: mockTasks.filter(task => task.status === TaskStatus.REVIEW)
  },
  {
    id: 'done',
    title: 'Hotovo',
    position: 3,
    color: '#10b981',
    tasks: mockTasks.filter(task => task.status === TaskStatus.DONE)
  }
]

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Týmový meeting',
    description: 'Týdenní standup meeting',
    start: new Date('2025-01-22T09:00:00'),
    end: new Date('2025-01-22T10:00:00'),
    allDay: false,
    color: '#3b82f6',
    createdById: '1',
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '2',
    title: 'Sprint Review',
    description: 'Ukázka hotových funkcí',
    start: new Date('2025-01-24T14:00:00'),
    end: new Date('2025-01-24T16:00:00'),
    allDay: false,
    color: '#10b981',
    createdById: '2',
    createdAt: new Date('2025-01-21'),
    updatedAt: new Date('2025-01-21')
  },
  {
    id: '3',
    title: 'Školení nových technologií',
    description: 'Workshop o GraphQL a Apollo',
    start: new Date('2025-01-26T10:00:00'),
    end: new Date('2025-01-26T17:00:00'),
    allDay: false,
    color: '#8b5cf6',
    createdById: '1',
    createdAt: new Date('2025-01-19'),
    updatedAt: new Date('2025-01-19')
  }
]

// Mock Expense Categories
export const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: 'software',
    name: 'Software',
    color: '#3b82f6',
    icon: 'laptop'
  },
  {
    id: 'hosting',
    name: 'Hosting',
    color: '#10b981',
    icon: 'server'
  },
  {
    id: 'meals',
    name: 'Jídlo a občerstvení',
    color: '#f59e0b',
    icon: 'utensils'
  }
]

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: '1',
    title: 'Software licence',
    description: 'Roční licence pro vývojové nástroje',
    amount: 15000,
    currency: 'CZK',
    date: new Date('2025-01-15'),
    categoryId: 'software',
    status: ExpenseStatus.APPROVED,
    createdById: '1',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    category: mockExpenseCategories.find(cat => cat.id === 'software')
  },
  {
    id: '2',
    title: 'Cloudové služby',
    description: 'Měsíční poplatek za AWS',
    amount: 8500,
    currency: 'CZK',
    date: new Date('2025-01-20'),
    categoryId: 'hosting',
    status: ExpenseStatus.APPROVED,
    createdById: '2',
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
    category: mockExpenseCategories.find(cat => cat.id === 'hosting')
  },
  {
    id: '3',
    title: 'Týmový oběd',
    description: 'Oběd po týmovém meetingu',
    amount: 1200,
    currency: 'CZK',
    date: new Date('2025-01-22'),
    categoryId: 'meals',
    status: ExpenseStatus.PENDING,
    createdById: '1',
    createdAt: new Date('2025-01-22'),
    updatedAt: new Date('2025-01-22'),
    category: mockExpenseCategories.find(cat => cat.id === 'meals')
  }
]
