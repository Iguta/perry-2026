import type { Task } from '../types/task'
import type { Category } from '../types/category'
import { formatShortDate } from '../utils/dateUtils'
import { Card } from './Card'

type TaskCardProps = {
  task: Task
  category?: Category
  onToggle: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export const TaskCard = ({ task, category, onToggle, onEdit, onDelete }: TaskCardProps) => (
  <Card className={`task-card ${task.completed ? 'task-card--completed' : ''}`}>
    <div className="task-card__header">
      <div>
        <p className="task-card__title">{task.title}</p>
        <p className="task-card__subtitle">Due {formatShortDate(task.dueDate)}</p>
      </div>
      <span className={`task-card__priority priority-${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>
    </div>
    <p className="task-card__description">{task.description}</p>
    <div className="task-card__footer">
      <span className="pill" style={{ backgroundColor: category?.color ?? '#2B2F3A' }}>
        {category?.name ?? 'Uncategorized'}
      </span>
      <div className="task-card__actions">
        <button className="ghost-button" type="button" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark active' : 'Mark done'}
        </button>
        <button className="ghost-button" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="ghost-button danger" type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  </Card>
)
