import type { ReactNode } from 'react'
import { Navigation, type NavItem } from './Navigation'

export type AppShellProps = {
  navItems: NavItem[]
  activeNav: string
  onNavigate: (id: string) => void
  headerContent: ReactNode
  children: ReactNode
}

export const AppShell = ({
  navItems,
  activeNav,
  onNavigate,
  headerContent,
  children,
}: AppShellProps) => (
  <div className="app-shell">
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-mark">P</div>
        <div>
          <p className="brand-title">perry-2026</p>
          <p className="brand-subtitle">Goals & tasks hub</p>
        </div>
      </div>
      <Navigation items={navItems} activeId={activeNav} onNavigate={onNavigate} />
      <div className="sidebar__footer">
        <p className="muted">Stay consistent, one day at a time.</p>
      </div>
    </aside>
    <main className="main">
      <header className="page-header">{headerContent}</header>
      <section className="page-content">{children}</section>
    </main>
  </div>
)
