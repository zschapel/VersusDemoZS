describe('App Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })
  it('First default question shown', () => {
    cy.get('h4').should('contain', 'PartnerName1')
    cy.get('p').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum a est ut suscipit. Phasellus quis libero neque. Aenean ut dolor odio. Fusce justo nunc, vestibulum a ultrices at, condimentum quis elit.')
    cy.get('video').should('have.attr', 'src', '/src/assets/sampleVideo.mp4')
  })
})