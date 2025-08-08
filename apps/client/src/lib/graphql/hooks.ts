import { useQuery, useMutation } from '@apollo/client';
import {
  GET_KANBAN_BOARD,
  GET_EVENTS_QUERY,
  GET_EXPENSES_QUERY,
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
  MOVE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
  CREATE_EXPENSE_MUTATION,
  APPROVE_EXPENSE_MUTATION,
  REJECT_EXPENSE_MUTATION,
} from './queries';

// Kanban Board hooks
export function useKanbanBoard() {
  const { data, loading, error, refetch } = useQuery(GET_KANBAN_BOARD, {
    errorPolicy: 'all',
  });

  return {
    columns: data?.kanbanBoard || [],
    loading,
    error,
    refetch,
  };
}

export function useCreateTask() {
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_KANBAN_BOARD }],
  });

  return {
    createTask,
    loading,
    error,
  };
}

export function useUpdateTask() {
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_KANBAN_BOARD }],
  });

  return {
    updateTask,
    loading,
    error,
  };
}

export function useMoveTask() {
  const [moveTask, { loading, error }] = useMutation(MOVE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_KANBAN_BOARD }],
  });

  return {
    moveTask,
    loading,
    error,
  };
}

export function useDeleteTask() {
  const [deleteTask, { loading, error }] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_KANBAN_BOARD }],
  });

  return {
    deleteTask,
    loading,
    error,
  };
}

// Events hooks
export function useEvents(startDate?: Date, endDate?: Date) {
  const { data, loading, error, refetch } = useQuery(GET_EVENTS_QUERY, {
    variables: { startDate, endDate },
    errorPolicy: 'all',
  });

  return {
    events: data?.events || [],
    loading,
    error,
    refetch,
  };
}

export function useCreateEvent() {
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT_MUTATION, {
    refetchQueries: [{ query: GET_EVENTS_QUERY }],
  });

  return {
    createEvent,
    loading,
    error,
  };
}

export function useUpdateEvent() {
  const [updateEvent, { loading, error }] = useMutation(UPDATE_EVENT_MUTATION, {
    refetchQueries: [{ query: GET_EVENTS_QUERY }],
  });

  return {
    updateEvent,
    loading,
    error,
  };
}

export function useDeleteEvent() {
  const [deleteEvent, { loading, error }] = useMutation(DELETE_EVENT_MUTATION, {
    refetchQueries: [{ query: GET_EVENTS_QUERY }],
  });

  return {
    deleteEvent,
    loading,
    error,
  };
}

// Expenses hooks
export function useExpenses() {
  const { data, loading, error, refetch } = useQuery(GET_EXPENSES_QUERY, {
    errorPolicy: 'all',
  });

  return {
    expenses: data?.expenses || [],
    loading,
    error,
    refetch,
  };
}

export function useCreateExpense() {
  const [createExpense, { loading, error }] = useMutation(CREATE_EXPENSE_MUTATION, {
    refetchQueries: [{ query: GET_EXPENSES_QUERY }],
  });

  return {
    createExpense,
    loading,
    error,
  };
}

export function useApproveExpense() {
  const [approveExpense, { loading, error }] = useMutation(APPROVE_EXPENSE_MUTATION, {
    refetchQueries: [{ query: GET_EXPENSES_QUERY }],
  });

  return {
    approveExpense,
    loading,
    error,
  };
}

export function useRejectExpense() {
  const [rejectExpense, { loading, error }] = useMutation(REJECT_EXPENSE_MUTATION, {
    refetchQueries: [{ query: GET_EXPENSES_QUERY }],
  });

  return {
    rejectExpense,
    loading,
    error,
  };
}
