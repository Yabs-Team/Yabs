import baseVisit from '../helper';

describe('This test will update a title', () => {
  it('Goes to the webbpage', () => {
    baseVisit('/admin');
  });

  it('Open up the title view', () => {
    cy.get('[data-cy=Titles]').click();
  });

  it('Creates a title and reset the fields when added', () => {
    const bookTitle = 'Some random made title from a tests or something simmilar'
    const isbn = '12344661531'
    const cost = '99999'

    cy.get('[data-cy=name]').type(bookTitle);
    cy.get('[data-cy=cost]').type(cost);
    cy.get('[data-cy=isbn]').type(isbn);
    cy.get('[data-cy=titleType]').click({force:true});
    cy.get('div').contains('Kurslitteratur').click();
    cy.get('[data-cy=subjectId]').click({force:true});
    cy.get('div').contains('Programm').click();

    cy.get('[data-cy=submit]').click({force:true});

    cy.get('[data-jest=search]').type(bookTitle);
    cy.get('[data-cy=formAction]').first().click({force:true});

    cy.get('[data-cy=name]').should('have.value', bookTitle);
    cy.get('[data-cy=isbn]').should('have.value', isbn);
    cy.get('[data-cy=cost]').should('have.value', cost);
  });
});
