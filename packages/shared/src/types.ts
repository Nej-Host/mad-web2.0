// === Sdílené typy pro celou aplikaci ===

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  position: number;
  columnId: string;
  createdById: string;
  assigneeId?: string;
  assignedTo?: string; // Pro kompatibilitu se starým kódem
  projectId?: string;
  labels: string[];
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Pro kompatibilitu se starým kódem
}

export interface Column {
  id: string;
  title: string;
  position: number;
  color: string;
  tasks: Task[];
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

// Aliasy pro kompatibilitu se starým kódem
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  allDay: boolean;
  color: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  date: Date;
  categoryId: string;
  createdById: string;
  receipt?: string;
  status: ExpenseStatus;
  createdAt: Date;
  updatedAt: Date;
  category?: ExpenseCategory;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface SiteSettings {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  order: number;
}

// === GraphQL Input typy ===

export interface CreateTaskInput {
  title: string;
  description?: string;
  columnId: string;
  assigneeId?: string;
  projectId?: string;
  dueDate?: Date;
  priority: Priority;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  assigneeId?: string;
  dueDate?: Date;
}

export interface CreateEventInput {
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  allDay: boolean;
  color: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  color?: string;
}

export interface CreateExpenseInput {
  title: string;
  description?: string;
  amount: number;
  currency: string;
  date: Date;
  categoryId: string;
  receipt?: string;
}

export interface UpdateSiteSettingsInput {
  heroTitle?: string;
  heroSubtitle?: string;
  primaryColor?: string;
  logoUrl?: string;
}

export interface CreateSocialLinkInput {
  platform: string;
  url: string;
  order: number;
}

// === API Response typy ===

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
