import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

const goToTasks = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /tasks/i }))
}

describe('Task management', () => {
  it('adds a task with priority and category', async () => {
    const user = userEvent.setup()
    render(<App />)

    await goToTasks(user)

    await user.type(screen.getByLabelText(/title/i), 'Plan review session')
    await user.type(screen.getByLabelText(/due date/i), '2026-01-30')
    await user.type(screen.getByLabelText(/description/i), 'Outline main milestones.')

    const [prioritySelect, categorySelect] = screen.getAllByRole('combobox')
    await user.selectOptions(prioritySelect, 'High')
    await user.selectOptions(categorySelect, 'Personal')

    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByText('Plan review session')).toBeInTheDocument()
  })

  it('edits an existing task', async () => {
    const user = userEvent.setup()
    render(<App />)

    await goToTasks(user)

    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    await user.click(editButtons[0])

    const titleInput = screen.getByLabelText(/title/i)
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated gratitude journal')

    await user.click(screen.getByRole('button', { name: /update task/i }))

    expect(screen.getByText('Updated gratitude journal')).toBeInTheDocument()
  })

  it('deletes a task from the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await goToTasks(user)

    const taskTitle = screen.getByText('Morning gratitude journal')
    const card = taskTitle.closest<HTMLElement>('.task-card')
    if (!card) {
      throw new Error('Expected task card not found')
    }
    await user.click(within(card).getByRole('button', { name: /delete/i }))

    expect(screen.queryByText('Morning gratitude journal')).not.toBeInTheDocument()
  })

  it('filters tasks by priority', async () => {
    const user = userEvent.setup()
    render(<App />)

    await goToTasks(user)

    const prioritySelects = screen.getAllByLabelText('Priority')
    await user.selectOptions(prioritySelects[1], 'High')

    expect(screen.getByText('Strength training session')).toBeInTheDocument()
    expect(screen.queryByText('Morning gratitude journal')).not.toBeInTheDocument()
  })
})
