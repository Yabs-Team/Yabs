// const { expect } = require("chai")
// const { it } = require("mocha")
import baseVisit from "../helper"

// const { it } = require("mocha")

// const { default: baseVisit } = require("../helper")

describe('Testing for /admin/cards', () => {

    it('Goes to the webpage', () => {
        baseVisit('/admin/cards');
    })

    it('Selects a file', () => {
        cy.get('input[data-cy=file-input]').attachFile('../fixtures/testImageCard.jpeg');
        cy.get('[data-cy=add-file]').click();
    })
    
    it('Checks existence of card', () => {
        cy.get('canvas').should('exist');
    })

    it('Tries to select a user for the card', () => {
        cy.get('[data-cy=user-selector]').click().first().click();
        // cy.get('[data-cy=user-selector]').type('a').type('{enter}');
        
    })

    it('Tries to download card', () => {
        cy.get('[data-cy=download-btn]').click();
        //Is there a way for cypress to check if file is being downloaded?
    })
})