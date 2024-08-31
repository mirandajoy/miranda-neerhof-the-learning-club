import AlertBanner from './AlertBanner'

it('displays the correct message', () => {
  cy.mount(<AlertBanner message="My great message" />)
  cy.get('[data-testid="message"]').contains('My great message')
})
