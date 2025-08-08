import { create } from 'zustand'

interface UIState {
  // Navigation
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Modals
  isModalOpen: boolean
  modalContent: string | null
  openModal: (content: string) => void
  closeModal: () => void
  
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  
  // Notifications
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    timestamp: Date
  }>
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  // Navigation
  isSidebarOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  
  // Modals
  isModalOpen: false,
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  
  // Theme
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  
  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}))
