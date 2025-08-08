'use client'

import { useQuery, useMutation } from '@apollo/client'
import { 
  GET_COLUMNS, 
  GET_EVENTS, 
  GET_EXPENSES,
  CREATE_TASK,
  UPDATE_TASK,
  MOVE_TASK,
  CREATE_EVENT,
  CREATE_EXPENSE
} from '@/lib/graphql/queries'
import { Task, Column, Event, Expense } from '@madzone/shared'

export function useColumns() {
  const { data, loading, error, refetch } = useQuery<{ columns: Column[] }>(GET_COLUMNS)
  
  return {
    columns: data?.columns || [],
    loading,
    error,
    refetch
  }
}

export function useEvents() {
  const { data, loading, error, refetch } = useQuery<{ events: Event[] }>(GET_EVENTS)
  
  return {
    events: data?.events || [],
    loading,
    error,
    refetch
  }
}

export function useExpenses() {
  const { data, loading, error, refetch } = useQuery<{ expenses: Expense[] }>(GET_EXPENSES)
  
  return {
    expenses: data?.expenses || [],
    loading,
    error,
    refetch
  }
}

export function useTaskMutations() {
  const [createTask] = useMutation(CREATE_TASK)
  const [updateTask] = useMutation(UPDATE_TASK)
  const [moveTask] = useMutation(MOVE_TASK)
  
  return {
    createTask,
    updateTask,
    moveTask
  }
}

export function useEventMutations() {
  const [createEvent] = useMutation(CREATE_EVENT)
  
  return {
    createEvent
  }
}

export function useExpenseMutations() {
  const [createExpense] = useMutation(CREATE_EXPENSE)
  
  return {
    createExpense
  }
}
