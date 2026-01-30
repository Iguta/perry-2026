import type { Goal, GoalInput } from '../types/goal'
import { readStorage, writeStorage } from './storageService'
import { seedGoals } from '../utils/seedData'
import { generateId } from '../utils/idUtils'

const GOAL_KEY = 'perry-2026-goals'

export const loadGoals = (): Goal[] => readStorage<Goal[]>(GOAL_KEY, seedGoals)

export const saveGoals = (goals: Goal[]) => {
  writeStorage(GOAL_KEY, goals)
}

export const createGoal = (goals: Goal[], input: GoalInput): Goal[] => {
  const newGoal: Goal = {
    id: generateId(),
    title: input.title,
    type: input.type,
    theme: input.theme,
    categoryId: input.categoryId,
    targetDate: input.targetDate,
    progress: input.progress,
    notes: input.notes,
    completed: input.completed ?? false,
    createdAt: new Date().toISOString(),
  }

  return [newGoal, ...goals]
}

export const updateGoal = (goals: Goal[], goalId: string, input: GoalInput): Goal[] =>
  goals.map((goal) =>
    goal.id === goalId
      ? {
          ...goal,
          title: input.title,
          type: input.type,
          theme: input.theme,
          categoryId: input.categoryId,
          targetDate: input.targetDate,
          progress: input.progress,
          notes: input.notes,
          completed: input.completed ?? goal.completed,
        }
      : goal,
  )

export const deleteGoal = (goals: Goal[], goalId: string): Goal[] =>
  goals.filter((goal) => goal.id !== goalId)

export const toggleGoalCompletion = (goals: Goal[], goalId: string): Goal[] =>
  goals.map((goal) =>
    goal.id === goalId
      ? {
          ...goal,
          completed: !goal.completed,
        }
      : goal,
  )
