import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`card-surface ${className}`.trim()}>{children}</div>
)
