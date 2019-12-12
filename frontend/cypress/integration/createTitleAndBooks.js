describe('This test will create a title and a book', () => {
  it('Opens the website', () => {
    cy.visit('http://localhost:8080/add')
    cy.request('http://localhost:3000/test/mock/admin') 
  })

  // it('Login with Google'), () => {
  //   cy.get('[id=not_signed_inow8rarn26wvu]')
  // }

  it('Open up the title', () => {
    cy.get('[id=ddown1__BV_toggle_]').click()
    cy.get('[data-cy=title]').click()
  })

  it('Creates a title', () => {
    cy.get('[placeholder=Namn]').type('Programming for dummies')
    cy.get('[placeholder=Kostnad]').type('200')
    cy.get('[data-cy=selectTitle]').click({force:true})
    cy.get('div').contains('Kurslitteratur').click({force:true})
    cy.get('[placeholder=isbn]').type('420-420 {enter}')
    cy.get('[data-cy=resetbookfield]').click({force:true})
  })
    
  it('Open up the book', () => {
    cy.get('[id=ddown1__BV_toggle_]').click()
    cy.get('[data-cy=book]').click()
  })

  it('Creates a book', () => {
    cy.get('[data-cy=titlename]').type('Programming for dummies')
    cy.get('div').contains('Programming for dummies').click()
    cy.get('[data-cy=barcode]').click().type('232133131')
    cy.get('[data-cy=status]').type('ok')
    cy.get('[data-cy=addBook]').click()
    cy.get('[data-cy=resetbookfield]').click({force:true})
    cy.pause()
  })

  it('Creates a book and reset the fields', () => {
    cy.get('[data-cy=titlename]').type('Programming for dummies')
    cy.get('div').contains('Programming for dummies').click({force:true})
    cy.get('[data-cy=barcode]').click().type('232133131')
    cy.get('[data-cy=status]').type('ok')
    cy.get('[data-cy=resetbookfield]').click()
  })
  
})
