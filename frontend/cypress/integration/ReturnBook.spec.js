import baseVisit from '../helper';

context('Return books', () => {
    beforeEach(() => {
        baseVisit('/library');
    })

    it('get condition on books barcode', () => {
        cy.get('[data-cy=book_barcode_return]').type('5004')
        cy.get('[data-cy=book_condition]').should('have.value', 'OK')
    })
})