import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { toISODate } from '../utils/dateUtils'

describe('Calendar view', () => {
  it('expands a day to show scheduled tasks', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /calendar/i }))

    const today = toISODate(new Date())
    await user.click(screen.getByLabelText(`Day ${today}`))

    expect(screen.getByText(/tasks scheduled/i)).toBeInTheDocument()
    expect(screen.getByText('Morning gratitude journal')).toBeInTheDocument()
  })
})
