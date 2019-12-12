context('Going to the add page', () => {
    beforeEach(() => {
        cy.visit('localhost:8080/add');
    })

    it('Going to "ID kort" in dropdown', () => {
        cy.get('[id=ddown1__BV_toggle_]').click();
        cy.get('[data-cy=cardID]').click()
    })
})