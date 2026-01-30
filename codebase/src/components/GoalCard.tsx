import type { Goal } from '../types/goal'
import type { Category } from '../types/category'
import { formatShortDate } from '../utils/dateUtils'
import { Card } from './Card'
import { ProgressBar } from './ProgressBar'

type GoalCardProps = {
  goal: Goal
  category?: Category
  onEdit: (goal: Goal) => void
  onDelete: (goalId: string) => void
  onToggle: (goalId: string) => void
}

export const GoalCard = ({ goal, category, onEdit, onDelete, onToggle }: GoalCardProps) => (
  <Card className={`goal-card ${goal.completed ? 'goal-card--completed' : ''}`}>
    <div className="goal-card__header">
      <div>
        <p className="goal-card__title">{goal.title}</p>
        <p className="goal-card__subtitle">
          {goal.type} · {goal.theme}
        </p>
      </div>
      <span className="goal-card__date">Target {formatShortDate(goal.targetDate)}</span>
    </div>
    <ProgressBar percentage={goal.progress} />
    <div className="goal-card__meta">
      <span className="pill" style={{ backgroundColor: category?.color ?? '#2B2F3A' }}>
        {category?.name ?? 'Uncategorized'}
      </span>
      <span className={`pill status ${goal.completed ? 'status-complete' : 'status-active'}`}>
        {goal.completed ? 'Completed' : 'In progress'}
      </span>
    </div>
    <p className="goal-card__notes">{goal.notes}</p>
    <div className="goal-card__actions">
      <button className="ghost-button" type="button" onClick={() => onToggle(goal.id)}>
        {goal.completed ? 'Reopen' : 'Complete'}
      </button>
      <button className="ghost-button" type="button" onClick={() => onEdit(goal)}>
        Edit
      </button>
      <button className="ghost-button danger" type="button" onClick={() => onDelete(goal.id)}>
        Delete
      </button>
    </div>
  </Card>
)
