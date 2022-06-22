import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import QuestionGroup from '$lib/QuestionGroup.svelte'

describe('Question Group', () => {
  it('renders accessible title', () => {
    // Arrange
    render(QuestionGroup, { props: {
      title: 'Home Address',
    }})
    
    // Act + Assert
    const group = screen.getByRole('group', { name: 'Home Address'})
    expect(group).toBeVisible()
  })
  it('is uniquely removeable with a button action', async () => {
    // Arrange
    const handleRemove1 = jest.fn()
    const handleRemove2 = jest.fn()
    const handleRemove3 = jest.fn()
    render(QuestionGroup, { props: {
      title: 'Group One',
      onRemove: handleRemove1,
    }})
    render(QuestionGroup, { props: {
      title: 'Group Two',
      onRemove: handleRemove2,
    }})
    render(QuestionGroup, { props: {
      title: 'Group Three',
      onRemove: handleRemove3,
    }})
    
    // Act + Assert
    const group1 = screen.getByRole('group', { name: 'Group One'})
    const group2 = screen.getByRole('group', { name: 'Group Two'})
    const group3 = screen.getByRole('group', { name: 'Group Three'})
    const button2 = within(group2).getByRole('button', { name: /remove/i })
    await userEvent.click(button2)
    expect(group1).toBeInTheDocument()
    // NOTE removal from DOM is application, not component, responsibility
    expect(group2).toBeInTheDocument()
    expect(group3).toBeInTheDocument()
    expect(handleRemove1).not.toHaveBeenCalled()
    expect(handleRemove2).toHaveBeenCalled()
    expect(handleRemove3).not.toHaveBeenCalled()
  })
})
