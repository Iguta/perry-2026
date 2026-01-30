import { useMemo, useState } from 'react'
import { AppShell } from './components/AppShell'
import { AppDataProvider } from './hooks/AppDataContext'
import { CalendarPage } from './pages/CalendarPage'
import { DashboardPage } from './pages/DashboardPage'
import { GoalsPage } from './pages/GoalsPage'
import { TasksPage } from './pages/TasksPage'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'tasks', label: 'Tasks', icon: '✅' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'calendar', label: 'Calendar', icon: '🗓️' },
]

const PAGE_CONTENT = {
  dashboard: {
    title: 'Today’s momentum',
    subtitle: 'Track progress across your daily, weekly, monthly, and yearly goals.',
    component: <DashboardPage />,
  },
  tasks: {
    title: 'Task workflow',
    subtitle: 'Capture, prioritize, and complete tasks that move you forward.',
    component: <TasksPage />,
  },
  goals: {
    title: 'Goal alignment',
    subtitle: 'Organize goals by theme and keep progress visible.',
    component: <GoalsPage />,
  },
  calendar: {
    title: 'Calendar view',
    subtitle: 'Zoom into any day to review scheduled tasks.',
    component: <CalendarPage />,
  },
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const current = PAGE_CONTENT[activePage as keyof typeof PAGE_CONTENT]
  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    [],
  )

  return (
    <AppDataProvider>
      <AppShell
        navItems={NAV_ITEMS}
        activeNav={activePage}
        onNavigate={setActivePage}
        headerContent={
          <div className="page-header__content">
            <div>
              <h1>{current.title}</h1>
              <p className="muted">{current.subtitle}</p>
            </div>
            <div className="page-header__meta">
              <span className="pill pill--outline">{todayLabel}</span>
            </div>
          </div>
        }
      >
        {current.component}
      </AppShell>
    </AppDataProvider>
  )
}
