import baseVisit from '../helper';

context('Going to the first page', () => {
    beforeEach(() => {
        baseVisit();
    });

    it('Pressing delete button with active loan, warning should pop up', () => {
        baseVisit('admin/titles/0763645680');
        cy.get('[data-cy=deleteTitle]').click({force:true});
        cy.get('[data-cy=modalBody]').should('have.value', 'Alex Henryz - 5000');
    });
    it('Pressing delete button without active loan, should delete title', () => {
        baseVisit('admin/titles/9781999985462')
        cy.get('[data-cy=deleteTitle]').click({force:true});
        cy.should('have.not.value', 'Tomtens jul')
    });
});