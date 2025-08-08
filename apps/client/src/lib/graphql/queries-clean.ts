import { gql } from '@apollo/client';

// Kanban Board queries
export const GET_KANBAN_BOARD = gql`
  query GetKanbanBoard {
    kanbanBoard {
      id
      title
      position
      color
      tasks {
        id
        title
        description
        status
        priority
        position
        columnId
        dueDate
        createdAt
        updatedAt
        createdBy {
          id
          email
          firstName
          lastName
        }
        assignee {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      priority
      position
      columnId
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      status
      priority
      position
      columnId
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const MOVE_TASK_MUTATION = gql`
  mutation MoveTask($taskId: String!, $destinationColumnId: String!, $newIndex: Int!) {
    moveTask(taskId: $taskId, destinationColumnId: $destinationColumnId, newIndex: $newIndex) {
      id
      title
      description
      status
      priority
      position
      columnId
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`;

// Calendar Events queries
export const GET_EVENTS_QUERY = gql`
  query GetEvents($startDate: Date, $endDate: Date) {
    events(startDate: $startDate, endDate: $endDate) {
      id
      title
      description
      start
      end
      allDay
      color
      createdById
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      start
      end
      allDay
      color
      createdById
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      title
      description
      start
      end
      allDay
      color
      createdById
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id)
  }
`;

// Expenses queries
export const GET_EXPENSES_QUERY = gql`
  query GetExpenses {
    expenses {
      id
      title
      description
      amount
      currency
      date
      categoryId
      createdById
      receipt
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_EXPENSE_CATEGORIES_QUERY = gql`
  query GetExpenseCategories {
    expenseCategories {
      id
      name
      color
      icon
    }
  }
`;

export const CREATE_EXPENSE_MUTATION = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
      title
      description
      amount
      currency
      date
      categoryId
      createdById
      receipt
      status
      createdAt
      updatedAt
    }
  }
`;

export const APPROVE_EXPENSE_MUTATION = gql`
  mutation ApproveExpense($id: String!) {
    approveExpense(id: $id)
  }
`;

export const REJECT_EXPENSE_MUTATION = gql`
  mutation RejectExpense($id: String!) {
    rejectExpense(id: $id)
  }
`;

// Users queries
export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      firstName
      lastName
      imageUrl
      role
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($firstName: String, $lastName: String) {
    updateProfile(firstName: $firstName, lastName: $lastName) {
      id
      email
      firstName
      lastName
      imageUrl
      role
      createdAt
      updatedAt
    }
  }
`;
