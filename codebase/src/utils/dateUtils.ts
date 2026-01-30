export const toStartOfDay = (date: Date) => {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)
  return normalized
}

export const toEndOfDay = (date: Date) => {
  const normalized = new Date(date)
  normalized.setHours(23, 59, 59, 999)
  return normalized
}

export const toISODate = (date: Date) => date.toISOString().split('T')[0]

export const formatShortDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export const formatLongDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const isSameDay = (a: Date, b: Date) =>
  toStartOfDay(a).getTime() === toStartOfDay(b).getTime()

export const isWithinRange = (date: Date, start: Date, end: Date) => {
  const timestamp = date.getTime()
  return timestamp >= start.getTime() && timestamp <= end.getTime()
}

export const getWeekRange = (baseDate: Date) => {
  const day = baseDate.getDay()
  const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1)
  const start = toStartOfDay(new Date(baseDate.setDate(diff)))
  const end = toEndOfDay(new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6))
  return { start, end }
}

export const getMonthRange = (baseDate: Date) => {
  const start = toStartOfDay(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1))
  const end = toEndOfDay(new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0))
  return { start, end }
}

export const getYearRange = (baseDate: Date) => {
  const start = toStartOfDay(new Date(baseDate.getFullYear(), 0, 1))
  const end = toEndOfDay(new Date(baseDate.getFullYear(), 11, 31))
  return { start, end }
}

export type CalendarDay = {
  date: Date
  iso: string
  inCurrentMonth: boolean
}

export const getCalendarDays = (baseDate: Date): CalendarDay[] => {
  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay()
  const calendarStart = new Date(year, month, 1 - (startDay === 0 ? 6 : startDay - 1))
  const days: CalendarDay[] = []

  for (let i = 0; i < 42; i += 1) {
    const current = new Date(calendarStart)
    current.setDate(calendarStart.getDate() + i)
    days.push({
      date: current,
      iso: toISODate(current),
      inCurrentMonth: current.getMonth() === month,
    })
  }

  return days
}
