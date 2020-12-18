import baseVisit from "../helper"

describe('Testing for /admin/cards', () => {

    it('Goes to the webpage', () => {
        baseVisit('/admin/cards');
    })

    it('Selects a file', () => {
        cy.get('input[data-cy=file-input]').attachFile('../fixtures/testImageCard.jpg');
        cy.get('[data-cy=add-file]').click();
    })
    
    it('Checks existence of card', () => {
        cy.get('canvas').should('exist');
    })

    it('Tries to select a user for the card', () => {
        cy.get('[data-cy=user-selector]').click().first().click();        
    })

    it('Tries to download card', () => {
        cy.get('[data-cy=download-btn]').click();
    })
})