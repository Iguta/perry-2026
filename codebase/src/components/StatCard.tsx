import type { ProgressMetric } from '../types/dashboard'
import { Card } from './Card'
import { ProgressBar } from './ProgressBar'

type StatCardProps = {
  metric: ProgressMetric
}

export const StatCard = ({ metric }: StatCardProps) => (
  <Card className="stat-card">
    <div className="stat-card__header">
      <p className="stat-card__label">{metric.label}</p>
      <p className="stat-card__value">
        {metric.value}/{metric.total}
      </p>
    </div>
    <ProgressBar percentage={metric.percentage} />
    <p className="stat-card__caption">Completed tasks</p>
  </Card>
)
