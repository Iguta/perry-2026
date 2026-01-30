import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Category } from '../types/category'
import type { Task, TaskInput } from '../types/task'
import { PRIORITIES } from '../utils/constants'

const emptyTask: TaskInput = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  categoryId: '',
}

type TaskFormProps = {
  categories: Category[]
  initialTask?: Task
  onSubmit: (input: TaskInput) => void
  onCancel?: () => void
}

export const TaskForm = ({ categories, initialTask, onSubmit, onCancel }: TaskFormProps) => {
  const [form, setForm] = useState<TaskInput>(emptyTask)

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title,
        description: initialTask.description,
        dueDate: initialTask.dueDate,
        priority: initialTask.priority,
        categoryId: initialTask.categoryId,
        completed: initialTask.completed,
      })
    } else {
      setForm((prev) => ({ ...emptyTask, categoryId: prev.categoryId }))
    }
  }, [initialTask])

  const handleChange = (field: keyof TaskInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim() || !form.dueDate) {
      return
    }
    onSubmit(form)
    if (!initialTask) {
      setForm({ ...emptyTask, categoryId: form.categoryId })
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__field">
          Title
          <input
            type="text"
            value={form.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Add a task title"
            required
          />
        </label>
        <label className="form__field">
          Due date
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => handleChange('dueDate', event.target.value)}
            required
          />
        </label>
      </div>
      <label className="form__field">
        Description
        <textarea
          value={form.description}
          onChange={(event) => handleChange('description', event.target.value)}
          placeholder="Add task details"
          rows={3}
        />
      </label>
      <div className="form__row">
        <label className="form__field">
          Priority
          <select
            value={form.priority}
            onChange={(event) => handleChange('priority', event.target.value)}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
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
      </div>
      <div className="form__actions">
        {onCancel && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary-button">
          {initialTask ? 'Update task' : 'Add task'}
        </button>
      </div>
    </form>
  )
}
