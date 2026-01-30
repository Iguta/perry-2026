export type GoalType = 'New Year' | 'Monthly' | 'Daily'
export type Theme = 'Spiritual' | 'Physical Fitness' | 'Academics' | 'Career'

export type Goal = {
  id: string
  title: string
  type: GoalType
  theme: Theme
  categoryId: string
  targetDate: string
  progress: number
  notes: string
  createdAt: string
  completed: boolean
}

export type GoalInput = {
  title: string
  type: GoalType
  theme: Theme
  categoryId: string
  targetDate: string
  progress: number
  notes: string
  completed?: boolean
}
