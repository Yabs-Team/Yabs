import baseVisit from '../helper';

describe('Add book loan', () => {
    it('Adds adds a book', () => {
        baseVisit('/library');

        cy.get('[data-cy=book_barcode]').type('003456');
        cy.get('[data-cy=loanOutBook]').click();
    });
  
    // it('Book gets added to "Your loans"-data-table', () => {
    //   cy.get('[data-cy=loan_data]').contains('aBarCode');
    // });
});
  