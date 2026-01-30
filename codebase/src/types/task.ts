export type Priority = 'Low' | 'Medium' | 'High'

export type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: Priority
  categoryId: string
  completed: boolean
  createdAt: string
}

export type TaskInput = {
  title: string
  description: string
  dueDate: string
  priority: Priority
  categoryId: string
  completed?: boolean
}
