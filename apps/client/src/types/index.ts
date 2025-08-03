// Team Panel Types

export interface TeamEvent {
  id: string
  title: string
  start: Date
  end?: Date
  description?: string
  attendees: string[]
  location?: string
  type: 'meeting' | 'deadline' | 'event' | 'reminder'
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo?: string
  createdBy: string
  projectId?: string
  labels: string[]
  dueDate?: Date
  estimatedHours?: number
  actualHours?: number
  createdAt: Date
  updatedAt: Date
  position: number
}

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TaskColumn {
  id: TaskStatus
  title: string
  tasks: Task[]
  limit?: number
}

export interface Expense {
  id: string
  title: string
  description?: string
  amount: number
  currency: string
  category: ExpenseCategory
  date: Date
  receipt?: string
  submittedBy: string
  approvedBy?: string
  status: ExpenseStatus
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

export type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'paid'

export interface ExpenseCategory {
  id: string
  name: string
  description?: string
  color: string
  budgetLimit?: number
}

export interface SiteAppearance {
  id: string
  heroTitle: string
  heroSubtitle: string
  primaryColor: string
  secondaryColor: string
  logo?: string
  favicon?: string
  socialLinks: SocialLink[]
  footerText: string
  contactEmail: string
  contactPhone?: string
  address?: string
  updatedAt: Date
  updatedBy: string
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube'
  url: string
  isActive: boolean
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  department?: string
  position?: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export type UserRole = 'admin' | 'manager' | 'member' | 'viewer'
