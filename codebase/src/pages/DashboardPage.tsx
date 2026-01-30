import { useMemo } from 'react'
import { Card } from '../components/Card'
import { StatCard } from '../components/StatCard'
import { useAppData } from '../hooks/AppDataContext'
import { formatShortDate } from '../utils/dateUtils'
import { getDashboardMetrics } from '../utils/progressUtils'

export const DashboardPage = () => {
  const { tasks, goals, categories } = useAppData()

  const metrics = useMemo(() => getDashboardMetrics(tasks), [tasks])
  const upcomingTasks = useMemo(
    () =>
      [...tasks]
        .filter((task) => !task.completed)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 4),
    [tasks],
  )

  const focusGoals = useMemo(() => goals.slice(0, 3), [goals])

  return (
    <div className="dashboard">
      <section className="dashboard__grid">
        {metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </section>
      <section className="dashboard__panels">
        <Card className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__title">Upcoming focus</p>
              <p className="panel__subtitle">Priority tasks to move forward.</p>
            </div>
            <span className="pill">{upcomingTasks.length} tasks</span>
          </div>
          <div className="panel__content">
            {upcomingTasks.length === 0 ? (
              <p className="muted">You are all caught up. Add new tasks to stay aligned.</p>
            ) : (
              upcomingTasks.map((task) => {
                const category = categories.find((item) => item.id === task.categoryId)
                return (
                  <div key={task.id} className="panel__row">
                    <div>
                      <p className="panel__row-title">{task.title}</p>
                      <p className="panel__row-subtitle">Due {formatShortDate(task.dueDate)}</p>
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
        <Card className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__title">Goal momentum</p>
              <p className="panel__subtitle">Progress snapshots across your themes.</p>
            </div>
            <span className="pill">{goals.length} goals</span>
          </div>
          <div className="panel__content">
            {focusGoals.length === 0 ? (
              <p className="muted">Define a new goal to start building momentum.</p>
            ) : (
              focusGoals.map((goal) => {
                const category = categories.find((item) => item.id === goal.categoryId)
                return (
                  <div key={goal.id} className="panel__row">
                    <div>
                      <p className="panel__row-title">{goal.title}</p>
                      <p className="panel__row-subtitle">
                        {goal.theme} · {goal.progress}% complete
                      </p>
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
      </section>
    </div>
  )
}
