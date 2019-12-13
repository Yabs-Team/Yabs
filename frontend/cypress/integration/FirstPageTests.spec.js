context('Going to the first page', () => {
    beforeEach(() => {
        cy.visit('localhost:3000');
    })

    it('Click on "Admin" on first page and loan out an existing book', () => {
        cy.get('[data-cy=addPage]').click();
        cy.get('h1').contains('Dashboard');
        cy.url().should('include', '/admin');
        cy.get('[data-cy=Loans]').click()
        cy.url().should('include', '/admin/loans');
        cy.get('[id=nestedUid]').type('101834530373768097915');
        cy.get('[data-cy=book_barcode]').type('0001');
        cy.get('[data-cy=loanOutBook]').click();
        cy.pause();
    })

    it('Go to the "Hitta" page', () => {
        cy.get('button > span').contains(/[Hh]itta/).click();
        cy.url().should('include', '/find');
    })
})