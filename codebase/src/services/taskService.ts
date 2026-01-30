import type { Task, TaskInput } from '../types/task'
import { readStorage, writeStorage } from './storageService'
import { seedTasks } from '../utils/seedData'
import { generateId } from '../utils/idUtils'

const TASK_KEY = 'perry-2026-tasks'

export const loadTasks = (): Task[] => {
  const tasks = readStorage<Task[]>(TASK_KEY, seedTasks)
  return tasks
}

export const saveTasks = (tasks: Task[]) => {
  writeStorage(TASK_KEY, tasks)
}

export const createTask = (tasks: Task[], input: TaskInput): Task[] => {
  const newTask: Task = {
    id: generateId(),
    title: input.title,
    description: input.description,
    dueDate: input.dueDate,
    priority: input.priority,
    categoryId: input.categoryId,
    completed: input.completed ?? false,
    createdAt: new Date().toISOString(),
  }

  return [newTask, ...tasks]
}

export const updateTask = (tasks: Task[], taskId: string, input: TaskInput): Task[] =>
  tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          priority: input.priority,
          categoryId: input.categoryId,
          completed: input.completed ?? task.completed,
        }
      : task,
  )

export const toggleTaskCompletion = (tasks: Task[], taskId: string): Task[] =>
  tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          completed: !task.completed,
        }
      : task,
  )

export const deleteTask = (tasks: Task[], taskId: string): Task[] =>
  tasks.filter((task) => task.id !== taskId)
