import { useMemo, useState } from 'react'
import { CategoryForm } from '../components/CategoryForm'
import { GoalCard } from '../components/GoalCard'
import { GoalForm } from '../components/GoalForm'
import { useAppData } from '../hooks/AppDataContext'
import type { Goal, GoalInput } from '../types/goal'

export const GoalsPage = () => {
  const { goals, categories, addGoal, editGoal, removeGoal, toggleGoal, addCategory } =
    useAppData()
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const activeGoals = useMemo(() => goals.filter((goal) => !goal.completed), [goals])
  const completedGoals = useMemo(() => goals.filter((goal) => goal.completed), [goals])

  const handleSubmit = (input: GoalInput) => {
    if (editingGoal) {
      editGoal(editingGoal.id, input)
      setEditingGoal(null)
      return
    }
    addGoal(input)
  }

  return (
    <div className="goals-page">
      <section className="goals-page__forms">
        <div className="section-header">
          <div>
            <h2>Goal planning</h2>
            <p className="muted">Align daily actions with long-term themes.</p>
          </div>
        </div>
        <GoalForm
          categories={categories}
          initialGoal={editingGoal ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setEditingGoal(null)}
        />
        <div className="section-divider" />
        <div>
          <h3>Custom categories</h3>
          <p className="muted">Use categories to group goals by context.</p>
          <CategoryForm onAdd={addCategory} />
        </div>
      </section>
      <section className="goals-page__list">
        <div className="list-header">
          <div>
            <h2>Active goals</h2>
            <p className="muted">{activeGoals.length} goals in progress</p>
          </div>
        </div>
        <div className="list-grid">
          {activeGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              category={categories.find((category) => category.id === goal.categoryId)}
              onEdit={setEditingGoal}
              onDelete={removeGoal}
              onToggle={toggleGoal}
            />
          ))}
        </div>
        <div className="section-divider" />
        <div className="list-header">
          <div>
            <h2>Completed goals</h2>
            <p className="muted">Celebrate your milestones.</p>
          </div>
        </div>
        <div className="list-grid">
          {completedGoals.length === 0 ? (
            <p className="muted">Complete a goal to see it here.</p>
          ) : (
            completedGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                category={categories.find((category) => category.id === goal.categoryId)}
                onEdit={setEditingGoal}
                onDelete={removeGoal}
                onToggle={toggleGoal}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
