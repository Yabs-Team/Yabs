context('Going to the add page', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/admin');
    })

    it('Going to "Cards" in menu', () => {
        cy.get('[data-cy=Cards]').click()
        cy.url().should('include', '/admin/cards')
    })
})