const baseURL = 'localhost'
function baseVisit(url = '/') {
    if (Cypress.env('env') == 'test') { cy.visit(`${baseURL}:3000${url}`)}
    else { cy.visit(`${baseURL}:8080${url}`); } 
}

context('Going to the first page', () => {

    it('Pressing delete button with active loan, warning should pop up', () => {
        baseVisit('/admin/titles/0763645680');
        cy.wait(1000);
        cy.get('[data-cy=deleteTitle]').click({force:true});
        cy.wait(1000);
        cy.get('[data-cy=modalBody]').contains('Alex Henryz - 5000');
    });
    it('Pressing delete button without active loan, should delete title', () => {
        baseVisit('/admin/titles/9781999985462')
        cy.wait(2000);
        cy.get('[data-cy=deleteTitle]').click({force:true});
        cy.wait(2000);
        baseVisit('/admin/titles/9781999985462')
        cy.wait(1000);
        cy.get('[data-cy=name]').should('not.contain', 'Tomtens jul')
    });
});