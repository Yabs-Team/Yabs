import baseVisit from '../helper';

describe('Testing for /admin/cards', () => {

  it('Goes to the webpage', () => {
    baseVisit('/admin/cards');
  });

  it('Selects a file', () => {
    cy.get('input[data-cy=file-input]').attachFile('../fixtures/testImageCard.jpg');
  });
    
  it('Checks existence of card', () => {
    cy.get('canvas').should('exist');
  });

  // This test does not work because of the lack of data in test mode
  // it('Tries to select a user for the card', () => {
  //     cy.get('[data-cy=user-selector]').click().first().click();        
  // })

  it('Tries to download card', () => {
    cy.get('[data-cy=download-btn]').click();
  });
});