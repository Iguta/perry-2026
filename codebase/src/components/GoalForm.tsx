import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Category } from '../types/category'
import type { Goal, GoalInput } from '../types/goal'
import { GOAL_TYPES, THEMES } from '../utils/constants'

const emptyGoal: GoalInput = {
  title: '',
  type: 'Monthly',
  theme: 'Career',
  categoryId: '',
  targetDate: '',
  progress: 0,
  notes: '',
}

type GoalFormProps = {
  categories: Category[]
  initialGoal?: Goal
  onSubmit: (input: GoalInput) => void
  onCancel?: () => void
}

export const GoalForm = ({ categories, initialGoal, onSubmit, onCancel }: GoalFormProps) => {
  const [form, setForm] = useState<GoalInput>(emptyGoal)

  useEffect(() => {
    if (initialGoal) {
      setForm({
        title: initialGoal.title,
        type: initialGoal.type,
        theme: initialGoal.theme,
        categoryId: initialGoal.categoryId,
        targetDate: initialGoal.targetDate,
        progress: initialGoal.progress,
        notes: initialGoal.notes,
        completed: initialGoal.completed,
      })
    } else {
      setForm((prev) => ({ ...emptyGoal, categoryId: prev.categoryId }))
    }
  }, [initialGoal])

  const handleChange = (field: keyof GoalInput, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim() || !form.targetDate) {
      return
    }
    onSubmit(form)
    if (!initialGoal) {
      setForm({ ...emptyGoal, categoryId: form.categoryId })
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__field">
          Goal title
          <input
            type="text"
            value={form.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Describe the goal"
            required
          />
        </label>
        <label className="form__field">
          Target date
          <input
            type="date"
            value={form.targetDate}
            onChange={(event) => handleChange('targetDate', event.target.value)}
            required
          />
        </label>
      </div>
      <div className="form__row">
        <label className="form__field">
          Goal type
          <select value={form.type} onChange={(event) => handleChange('type', event.target.value)}>
            {GOAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="form__field">
          Theme
          <select value={form.theme} onChange={(event) => handleChange('theme', event.target.value)}>
            {THEMES.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form__row">
        <label className="form__field">
          Category
          <select
            value={form.categoryId}
            onChange={(event) => handleChange('categoryId', event.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form__field">
          Progress ({form.progress}%)
          <input
            type="range"
            min={0}
            max={100}
            value={form.progress}
            onChange={(event) => handleChange('progress', Number(event.target.value))}
          />
        </label>
      </div>
      <label className="form__field">
        Notes
        <textarea
          value={form.notes}
          onChange={(event) => handleChange('notes', event.target.value)}
          placeholder="Add supporting notes"
          rows={3}
        />
      </label>
      <div className="form__actions">
        {onCancel && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary-button">
          {initialGoal ? 'Update goal' : 'Add goal'}
        </button>
      </div>
    </form>
  )
}
