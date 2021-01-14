import baseVisit from '../helper';

context('Lends a book', () => {
  beforeEach('Goes to Webpage', () => {
    baseVisit('/admin/loans');
  });

  it('Loans a book for a student on Admin Loans view', () => {
    cy.get('[data-cy=student_barcode]').type('2819');
    cy.get('[data-cy=book_barcode]').type('2819');
    cy.get('[data-cy=loanOutBook]').click();
    cy.get('[type=reset]').click();
  });
});
