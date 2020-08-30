/// <reference types="cypress" />

context('Listagem', () => {
    it('Listagem sem registros', () => {
        cy.server()

        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: []    // poderia criar um json vazio e usar a partir da fixture
        }).as('getNewTable');

        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length', 1);
    });

    it('Listagem com apenas um registro', () => {
        cy.server()

        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webTableGetUnico' // ou 'fixture:webTableGetUnico'    //não passar a extensão do arquivo
        })
        
        cy.visit('WebTable.html');

        // listas (neste caso a quantidade de colunas da tabela) começam do zero e não do 1
        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
        
        cy.get('@gridCellPhone').should('contain.text', '5408196723')
    });
});