/// <reference types="cypress" />

describe('Wizard Form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Section One Number fields appear conditionally and values clear when hidden', () => {
    // Note using a Page model for selectors would be a useful pattern
    cy.findByRole('heading', { name: /Step 1/ }).should('exist')
    cy.findByLabelText(/i want to add/i).uncheck()
    cy.findByLabelText(/number one/i).should('not.exist')
    cy.findByLabelText(/number two/i).should('not.exist')
    cy.findByLabelText(/sum field/i).should('not.exist')

    cy.findByLabelText(/i want to add/i).check()
    cy.findByLabelText(/number one/i).clear().type('93')
    cy.findByLabelText(/number two/i).clear().type('7')
    cy.findByLabelText(/sum field/i).should('have.value', '100')
    
    cy.findByLabelText(/i want to add/i).uncheck()
    cy.findByLabelText(/i want to add/i).check()
    cy.findByLabelText(/number one/i).should('have.value', '')
    cy.findByLabelText(/number two/i).should('have.value', '')
    cy.findByLabelText(/sum field/i).should('have.value', '0')
  })

  it('is submittable', () => {
    cy.log('Wizard Step One')
    cy.findByRole('heading', { name: /Step 1/}).should('exist')
    cy.findByLabelText(/name/i).clear().type('Felix')
    cy.findByLabelText(/phone/i).clear().type('617-123-4567')
    cy.findByLabelText(/when/i).type('2022-05-12')
    cy.findByLabelText(/i want to add/i).check()
    cy.findByLabelText(/number one/i).clear().type('93')
    cy.findByLabelText(/number two/i).clear().type('7')
    cy.findByLabelText(/sum field/i).should('have.value', '100')
    cy.findByRole('button', { name: /next/i }).click()

    cy.log('Wizard Step Two')
    cy.findByRole('heading', { name: /Step 2/}).should('exist')
    cy.findByLabelText(/color/i).select('green')
    cy.findByLabelText(/comment/i).clear().type('It ain\'t easy')
    cy.findByRole('button', { name: /next/i }).click()
    
    cy.log('Wizard Step Three')
    cy.findByRole('heading', { name: /Step 3/}).should('exist')
    cy.findByRole('group', { name: /thing 1/i }).within(() => {
      cy.findByLabelText(/foo/i).clear().type('foo thing one')
      cy.findByLabelText(/baz/i).clear().type('baz thing one')
      cy.findByLabelText(/color/i).select('blue')
    })
    cy.findByRole('button', { name: /add thing/i }).click()
    cy.findByRole('group', { name: /thing 2/i }).within(() => {
      cy.findByLabelText(/foo/i).clear().type('foo thing two')
      cy.findByLabelText(/baz/i).clear().type('baz thing two')
      cy.findByLabelText(/color/i).select('yellow')
    })
    cy.findByRole('button', { name: /add thing/i }).click()
    cy.findByRole('group', { name: /thing 3/i }).within(() => {
      cy.findByLabelText(/foo/i).clear().type('foo thing three')
      cy.findByLabelText(/baz/i).clear().type('baz thing three')
      cy.findByLabelText(/color/i).select('red')
    })
    cy.findByRole('button', { name: /submit/i }).click()

    cy.log('Submitting')
    cy.findByRole('heading', { name: /submitted data/i })
  })
})
