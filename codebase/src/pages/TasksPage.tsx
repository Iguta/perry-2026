import { useMemo, useState } from 'react'
import { CategoryForm } from '../components/CategoryForm'
import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'
import { useAppData } from '../hooks/AppDataContext'
import type { Priority, Task, TaskInput } from '../types/task'

const priorityFilters: Array<Priority | 'All'> = ['All', 'Low', 'Medium', 'High']

export const TasksPage = () => {
  const { tasks, categories, addTask, editTask, removeTask, toggleTask, addCategory } =
    useAppData()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
      const matchesCategory = categoryFilter === 'all' || task.categoryId === categoryFilter
      return matchesPriority && matchesCategory
    })
  }, [tasks, priorityFilter, categoryFilter])

  const handleSubmit = (input: TaskInput) => {
    if (editingTask) {
      editTask(editingTask.id, input)
      setEditingTask(null)
      return
    }
    addTask(input)
  }

  return (
    <div className="tasks-page">
      <section className="tasks-page__forms">
        <div className="section-header">
          <div>
            <h2>Task management</h2>
            <p className="muted">Capture what matters and stay focused by priority.</p>
          </div>
        </div>
        <TaskForm
          categories={categories}
          initialTask={editingTask ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setEditingTask(null)}
        />
        <div className="section-divider" />
        <div>
          <h3>Custom categories</h3>
          <p className="muted">Create a category to keep tasks and goals grouped.</p>
          <CategoryForm onAdd={addCategory} />
        </div>
      </section>
      <section className="tasks-page__list">
        <div className="list-header">
          <div>
            <h2>Tasks</h2>
            <p className="muted">{filteredTasks.length} tasks shown</p>
          </div>
          <div className="filters">
            <label>
              Priority
              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value as Priority | 'All')}
              >
                {priorityFilters.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Category
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">All</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="list-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              category={categories.find((category) => category.id === task.categoryId)}
              onToggle={toggleTask}
              onEdit={setEditingTask}
              onDelete={removeTask}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
