export type NavItem = {
  id: string
  label: string
  icon: string
}

type NavigationProps = {
  items: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
}

export const Navigation = ({ items, activeId, onNavigate }: NavigationProps) => (
  <nav className="nav">
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`nav__item ${activeId === item.id ? 'nav__item--active' : ''}`}
        onClick={() => onNavigate(item.id)}
      >
        <span className="nav__icon" aria-hidden="true">
          {item.icon}
        </span>
        <span>{item.label}</span>
      </button>
    ))}
  </nav>
)
