import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Question from '$lib/Question.svelte'

describe('Text Question: Display', () => {
  it('renders label, help, and placeholder attributes', async () => {
    // Arrange
    render(Question, { props: {
      name: 'question',
      label: 'Name',
      value: 'initial value',
      help:"help text here",
      props: {
        type: "text",
        placeholder: "your name",
      }
    }})
    
    // Act + Assert
    const field = screen.getByLabelText(/Name/i)
    expect(field).toHaveValue('initial value')
    userEvent.clear(field)
    await userEvent.type(field, 'field is editable')
    expect(field).toHaveValue('field is editable')
    expect(field).toHaveAccessibleDescription("help text here")
    expect(screen.getByPlaceholderText('your name')).toBe(field)
  })
})
