import baseVisit from '../helper';

context('Return books', () => {
  beforeEach(() => {
    baseVisit('/library');
  });

  it('get condition on books barcode', () => {
    cy.get('[data-cy=bookBarcodeReturn]').type('5004');
    cy.get('[data-cy=bookCondition]').should('have.value', 'OK');
  });
});
