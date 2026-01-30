import { useMemo, useState } from 'react'
import { Card } from '../components/Card'
import { useAppData } from '../hooks/AppDataContext'
import { formatLongDate, getCalendarDays, isSameDay } from '../utils/dateUtils'

export const CalendarPage = () => {
  const { tasks, categories } = useAppData()
  const [baseDate, setBaseDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const days = useMemo(() => getCalendarDays(baseDate), [baseDate])

  const selectedTasks = useMemo(() => {
    if (!selectedDate) {
      return []
    }
    return tasks.filter((task) => isSameDay(new Date(task.dueDate), selectedDate))
  }, [tasks, selectedDate])

  const monthLabel = baseDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="calendar-page">
      <Card className="calendar-card">
        <div className="calendar-header">
          <div>
            <h2>{monthLabel}</h2>
            <p className="muted">Click a day to expand and review tasks.</p>
          </div>
          <div className="calendar-header__actions">
            <button
              type="button"
              className="ghost-button"
              onClick={() =>
                setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
              }
            >
              Prev
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setBaseDate(new Date())}
            >
              Today
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() =>
                setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
              }
            >
              Next
            </button>
          </div>
        </div>
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
            <span key={label} className="calendar-grid__label">
              {label}
            </span>
          ))}
          {days.map((day) => {
            const dayTasks = tasks.filter((task) => isSameDay(new Date(task.dueDate), day.date))
            const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false
            return (
              <button
                key={day.iso}
                type="button"
                aria-label={`Day ${day.iso}`}
                aria-pressed={isSelected}
                className={`calendar-day ${day.inCurrentMonth ? '' : 'calendar-day--muted'} ${
                  isSelected ? 'calendar-day--selected' : ''
                }`}
                onClick={() => setSelectedDate(day.date)}
              >
                <span className="calendar-day__number">{day.date.getDate()}</span>
                {dayTasks.length > 0 && (
                  <span className="calendar-day__badge">{dayTasks.length}</span>
                )}
              </button>
            )
          })}
        </div>
      </Card>
      <Card className="calendar-panel">
        <div className="panel__header">
          <div>
            <h3>{selectedDate ? formatLongDate(selectedDate.toISOString()) : 'Select a day'}</h3>
            <p className="muted">
              {selectedDate
                ? `${selectedTasks.length} tasks scheduled`
                : 'Pick a day with tasks to zoom in.'}
            </p>
          </div>
        </div>
        <div className="panel__content">
          {selectedTasks.length === 0 ? (
            <p className="muted">No tasks scheduled for this day.</p>
          ) : (
            selectedTasks.map((task) => {
              const category = categories.find((item) => item.id === task.categoryId)
              return (
                <div key={task.id} className="panel__row">
                  <div>
                    <p className="panel__row-title">{task.title}</p>
                    <p className="panel__row-subtitle">{task.description}</p>
                  </div>
                  <span className="pill" style={{ backgroundColor: category?.color ?? '#2B2F3A' }}>
                    {category?.name ?? 'Uncategorized'}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  )
}
