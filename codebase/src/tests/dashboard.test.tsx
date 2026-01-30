import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Dashboard', () => {
  it('shows progress metrics for multiple time ranges', () => {
    render(<App />)

    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('This Week')).toBeInTheDocument()
    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('This Year')).toBeInTheDocument()
  })
})
