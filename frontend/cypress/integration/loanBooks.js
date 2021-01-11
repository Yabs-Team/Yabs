import baseVisit from '../helper';

context('Going to the add page', () => {
    beforeEach('Goes to Webpage', () => {
        baseVisit('/admin')
    })

    it('Visit loans view', () => {
        cy.get('[data-cy=Loans]').click();
    })

    it('Loans a book for a student on Admin page', () => {
        cy.get('[data-cy=student_barcode]').type('2819');
        cy.get('[data-cy=book_barcode]').type('2819');
        cy.get('[data-cy=submit]').click();
        cy.get('[data-cy=reset]').click();
    })
    
})