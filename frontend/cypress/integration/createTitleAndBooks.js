import baseVisit from '../helper';

describe('This test will create a title and a book', () => {
  it('Goes to the webbpage', () => {
    baseVisit('/admin');
  });

  it('Open up the title view', () => {
    cy.get('[data-cy=Titles]').click();
  });

  it('Creates a title and reset the fields when added', () => {
    const bookTitle = 'Book made from Test'
    const isbn = '420-420'
    const cost = '2912'
    cy.get('[data-cy=name]').type(bookTitle);
    cy.get('[data-cy=cost]').type(cost);
    cy.get('[data-cy=isbn]').type(isbn);
    cy.get('[data-cy=titleType]').click({force:true});
    cy.get('div').contains('Kurslitteratur').click();
    cy.get('[data-cy=submit]').click();

    cy.get('[data-jest=search]').type(bookTitle);
    cy.get('[data-cy=table]').contains(bookTitle);

    cy.get('[data-cy=reset]').click();
    cy.get('[data-cy=name]').should('have.not.value',bookTitle);
    cy.get('[data-cy=isbn]').should('have.not.value', isbn);
    cy.get('[data-cy=cost]').should('have.not.value', cost);
  });
    
  it('Open up the book view', () => {
    cy.get('[data-cy=Books]').click();
  });

  it('Creates a book', () => {
    cy.get('[data-cy=barcode]').click().type('212');
    cy.get('[data-cy=chooseTitle]').click();
    cy.get('div').contains('Alice in Wonderland').click();
    cy.get('[data-cy=condition]').type('Stolen');
    cy.get('[data-cy=addBook]').click();
  });
});
