import type { Task } from '../types/task'
import type { ProgressMetric } from '../types/dashboard'
import { getMonthRange, getWeekRange, getYearRange, isWithinRange, toEndOfDay, toStartOfDay } from './dateUtils'

const buildMetric = (label: string, tasks: Task[]) => {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
  return {
    label,
    value: completed,
    total,
    percentage,
  }
}

export const getDashboardMetrics = (tasks: Task[], baseDate: Date = new Date()): ProgressMetric[] => {
  const todayStart = toStartOfDay(baseDate)
  const todayEnd = toEndOfDay(baseDate)
  const todayTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate)
    return isWithinRange(due, todayStart, todayEnd)
  })

  const weekRange = getWeekRange(new Date(baseDate))
  const weekTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate)
    return isWithinRange(due, weekRange.start, weekRange.end)
  })

  const monthRange = getMonthRange(new Date(baseDate))
  const monthTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate)
    return isWithinRange(due, monthRange.start, monthRange.end)
  })

  const yearRange = getYearRange(new Date(baseDate))
  const yearTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate)
    return isWithinRange(due, yearRange.start, yearRange.end)
  })

  return [
    buildMetric('Today', todayTasks),
    buildMetric('This Week', weekTasks),
    buildMetric('This Month', monthTasks),
    buildMetric('This Year', yearTasks),
  ]
}
