import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

const goToGoals = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /goals/i }))
}

describe('Goal management', () => {
  it('creates a new themed goal', async () => {
    const user = userEvent.setup()
    render(<App />)

    await goToGoals(user)

    await user.type(screen.getByLabelText(/goal title/i), 'Build a morning routine')
    await user.type(screen.getByLabelText(/target date/i), '2026-02-15')

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], 'Daily')
    await user.selectOptions(selects[1], 'Spiritual')
    await user.selectOptions(selects[2], 'Personal')

    await user.type(screen.getByLabelText(/notes/i), 'Meditation and gratitude journaling.')

    await user.click(screen.getByRole('button', { name: /add goal/i }))

    const goalTitle = screen.getByText('Build a morning routine')
    expect(goalTitle).toBeInTheDocument()

    const card = goalTitle.closest<HTMLElement>('.goal-card')
    if (!card) {
      throw new Error('Expected goal card not found')
    }

    expect(within(card).getByText(/spiritual/i)).toBeInTheDocument()
  })
})
