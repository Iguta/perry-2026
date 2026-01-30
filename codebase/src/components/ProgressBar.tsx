type ProgressBarProps = {
  percentage: number
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => (
  <div className="progress">
    <div className="progress__track">
      <div className="progress__fill" style={{ width: `${percentage}%` }} />
    </div>
    <span className="progress__label">{percentage}%</span>
  </div>
)
