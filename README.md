# Use Accessible Selectors

Use appropriate accessible selectors (getByRole, getByLabelText) for elements wherever possible. If you’re unable to do so, you’ve likely identified an accessibility issue. Functional test expectations depend on accessibility, with very little extra work (beyond education).

It sounds obvious, but it was a small revelation for us when we added a QA team and started expanding component tests as well as using Cypress for end-to-end. It looks like testing-library has changed their recommendation to align with the above, but oddly Cypress hasn’t yet:

https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

While I agree test IDs are less fragile than _CSS selectors_, neither represent real user interaction. I think of automated functional tests as being similar to blind user navigation, or walking someone through a web process via phone.

Here’s an example component test:

```javascript
it('honors minLength', async () => {
    // Arrange
    const { getLastSubmitValue, TestForm, submit } = useTestForm()
    // … omitting some scaffolding here …

    // Act + Assert: validation fail blocks submission

    const field = screen.getByLabelText(/label/i)
    userEvent.clear(field)
    userEvent.type(field, ‘too short')
    expect(field).toHaveAttribute('minLength', '10')
    await submit()
    const err = await screen.findByRole('alert')
    expect(err).toHaveTextContent(/10 characters or more/i)

    // Act + Assert: validation passes

    userEvent.clear(field)
    userEvent.type(field, 'long enough to pass validation')
    await submit()
    expect(getLastSubmitValue()).toStrictEqual({
      question: 'long enough to pass validation'
    })
  })
```

… and here’s a snippet taken from a Cypress test:

```javascript
cy.findByRole('region', { name: 'Spouse Income' }).within(() => {
  cy.findByLabelText('Employer').contains('Harvard University')
  cy.findByLabelText('Job Title').contains('IT Support')
  cy.findByLabelText('Annual Salary').contains('4321')
})
```

This second example also shows how Role/region is used to determine context where labels may be not be unique within a form. We only discovered the accessibility problem while writing tests; though the fields “looked fine” and presented context visually, the repeated labels lacked context. Had we used test IDs these may have erroneously passed, but instead we refactored the app to use appropriately-structured elements and attributes.

I should note that we didn’t start here, and we do have old code (both test and application) using less-ideal methods, but I’ve found this useful whenever we update a test or refactor application code, and I use it as a TDD guardrail for development. One area where we consciously take a different approach is a system of complex forms where the business owner can dynamically configure questions, so we use element ID fields (not test IDs) for selectors because the labels aren’t stable/known at test time — but these tests are paired with component tests like in the first example above, so we have confidence accessibility testing responsibility has been covered between the two.

## Resources

- Extend Cypress using [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)
