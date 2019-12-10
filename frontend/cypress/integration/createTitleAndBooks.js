import { selector } from "postcss-selector-parser"

describe('This test will create a title and a book', () => {
  it('Opens the website', () => {
    cy.visit('http://localhost:8080/add')
  })

  // it('Login with Google'), () => {
  //   cy.get('[id=not_signed_inow8rarn26wvu]')
  // }

  it('Open up the title', () => {
    cy.get('[id=ddown1__BV_toggle_]').click()
    cy.get('[id=title]').click()
  })

  it('Creates a titel', () => {
    cy.get('[placeholder=Namn]').type('Book made from Test')
    cy.get('[placeholder=Kostnad]').type('2912')
    cy.get('select').select('Kurslitteratur')
    cy.get('[placeholder=isbn]').type('420-420 {enter}')
  })
    
    it('Open up the book', () => {
      cy.get('[id=ddown1__BV_toggle_]').click()
      cy.get('[id=book]').click()
    })

    it('Creates a book', () => {
      cy.get('[id=titlenamn]').type('Book made from Test')
      cy.get('[id=streckkod]').type('232133131')
      cy.get('[id=status]').type('ok')
      cy.get('[id=addBook]').click()
    })

})
