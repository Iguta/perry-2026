import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Category } from '../types/category'
import type { Goal, GoalInput } from '../types/goal'
import type { Task, TaskInput } from '../types/task'
import {
  createCategory,
  loadCategories,
  saveCategories,
} from '../services/categoryService'
import {
  createGoal,
  deleteGoal,
  loadGoals,
  saveGoals,
  toggleGoalCompletion,
  updateGoal,
} from '../services/goalService'
import {
  createTask,
  deleteTask,
  loadTasks,
  saveTasks,
  toggleTaskCompletion,
  updateTask,
} from '../services/taskService'

type AppDataContextValue = {
  tasks: Task[]
  goals: Goal[]
  categories: Category[]
  addTask: (input: TaskInput) => void
  editTask: (taskId: string, input: TaskInput) => void
  removeTask: (taskId: string) => void
  toggleTask: (taskId: string) => void
  addGoal: (input: GoalInput) => void
  editGoal: (goalId: string, input: GoalInput) => void
  removeGoal: (goalId: string) => void
  toggleGoal: (goalId: string) => void
  addCategory: (name: string, color: string) => void
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined)

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [goals, setGoals] = useState<Goal[]>(() => loadGoals())
  const [categories, setCategories] = useState<Category[]>(() => loadCategories())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    saveGoals(goals)
  }, [goals])

  useEffect(() => {
    saveCategories(categories)
  }, [categories])

  const value = useMemo<AppDataContextValue>(
    () => ({
      tasks,
      goals,
      categories,
      addTask: (input) => setTasks((prev) => createTask(prev, input)),
      editTask: (taskId, input) => setTasks((prev) => updateTask(prev, taskId, input)),
      removeTask: (taskId) => setTasks((prev) => deleteTask(prev, taskId)),
      toggleTask: (taskId) => setTasks((prev) => toggleTaskCompletion(prev, taskId)),
      addGoal: (input) => setGoals((prev) => createGoal(prev, input)),
      editGoal: (goalId, input) => setGoals((prev) => updateGoal(prev, goalId, input)),
      removeGoal: (goalId) => setGoals((prev) => deleteGoal(prev, goalId)),
      toggleGoal: (goalId) => setGoals((prev) => toggleGoalCompletion(prev, goalId)),
      addCategory: (name, color) =>
        setCategories((prev) => createCategory(prev, name, color)),
    }),
    [tasks, goals, categories],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export const useAppData = () => {
  const context = useContext(AppDataContext)
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider')
  }
  return context
}
