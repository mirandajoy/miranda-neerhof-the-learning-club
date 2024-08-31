import AlertBanner from './AlertBanner'

it('mounts', () => {
  cy.mount(<AlertBanner message="My great message" />)
  cy.get('[data-testid="message"]').contains('My great message')
})
