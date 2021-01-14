import baseVisit from '../helper';

context('Going to the first page', () => {
    beforeEach(() => {
        baseVisit();
    });

    it('Pressing delete button with active loan, warning should pop up', () => {
        cy.visit('localhost:8080/admin/titles/0763645680');
        cy.wait(1000);
        cy.get('[data-cy=deleteTitle]').click({force:true});
        cy.wait(1000);
        cy.get('[data-cy=modalBody]').contains('Alex Henryz - 5000');
    });
    it('Pressing delete button without active loan, should delete title', () => {
        cy.visit('localhost:8080/admin/titles/9781999985462')
        cy.wait(1000);
        cy.get('[data-cy=deleteTitle]').click({force:true});
        cy.wait(1000);
        cy.visit('localhost:8080/admin/titles/9781999985462')
        cy.wait(1000);
        cy.get('[data-cy=name]').should('not.contain', 'Tomtens jul')
    });
});