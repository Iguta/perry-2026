import type { Category } from '../types/category'
import type { Goal } from '../types/goal'
import type { Task } from '../types/task'
import { toISODate } from './dateUtils'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const nextWeek = new Date(today)
nextWeek.setDate(today.getDate() + 5)
const nextMonth = new Date(today)
nextMonth.setDate(today.getDate() + 20)

export const seedCategories: Category[] = [
  { id: 'cat-personal', name: 'Personal', color: '#7C9AFF' },
  { id: 'cat-health', name: 'Wellness', color: '#4AD6B8' },
  { id: 'cat-career', name: 'Career', color: '#F4A261' },
  { id: 'cat-growth', name: 'Growth', color: '#C77DFF' },
]

export const seedTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Morning gratitude journal',
    description: 'Write three things I am grateful for.',
    dueDate: toISODate(today),
    priority: 'Low',
    categoryId: 'cat-personal',
    completed: true,
    createdAt: today.toISOString(),
  },
  {
    id: 'task-2',
    title: 'Strength training session',
    description: '45 minutes of full body workout.',
    dueDate: toISODate(tomorrow),
    priority: 'High',
    categoryId: 'cat-health',
    completed: false,
    createdAt: today.toISOString(),
  },
  {
    id: 'task-3',
    title: 'Finish quarterly project outline',
    description: 'Draft milestones for Q1 deliverables.',
    dueDate: toISODate(nextWeek),
    priority: 'Medium',
    categoryId: 'cat-career',
    completed: false,
    createdAt: today.toISOString(),
  },
  {
    id: 'task-4',
    title: 'Read 20 pages',
    description: 'Continue reading leadership book.',
    dueDate: toISODate(nextMonth),
    priority: 'Low',
    categoryId: 'cat-growth',
    completed: false,
    createdAt: today.toISOString(),
  },
]

export const seedGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Run a 10K by spring',
    type: 'Monthly',
    theme: 'Physical Fitness',
    categoryId: 'cat-health',
    targetDate: toISODate(nextMonth),
    progress: 45,
    notes: 'Complete two interval sessions weekly.',
    createdAt: today.toISOString(),
    completed: false,
  },
  {
    id: 'goal-2',
    title: 'Complete advanced React course',
    type: 'New Year',
    theme: 'Academics',
    categoryId: 'cat-growth',
    targetDate: toISODate(nextMonth),
    progress: 60,
    notes: 'Finish module 4 by month-end.',
    createdAt: today.toISOString(),
    completed: false,
  },
  {
    id: 'goal-3',
    title: 'Evening meditation',
    type: 'Daily',
    theme: 'Spiritual',
    categoryId: 'cat-personal',
    targetDate: toISODate(today),
    progress: 80,
    notes: '10 minutes after dinner.',
    createdAt: today.toISOString(),
    completed: true,
  },
]
