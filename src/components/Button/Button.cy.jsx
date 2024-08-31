import Button from './Button'

it('renders the correct label', () => {
  cy.mount(
    <Button
      label="My great label"
      type="submit"
      action={() => {}}
    />
  )
  cy.get('[data-testid="button"]').contains('My great label')
})
