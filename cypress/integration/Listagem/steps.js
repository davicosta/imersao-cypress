/// <reference types="cypress" />


Given(/^que o site não possui registros$/, () => {
	cy.server()

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: []    // poderia criar um json vazio e usar a partir da fixture
    }).as('getNewTable');
});

When(/^acessar a listagem$/, () => {
	cy.visit('WebTable.html');
});

Then(/^devo visualizar a listagem vazia$/, () => {
	cy.get('div[role=row]').should('have.length', 1);
});


Given(/^que o site possui apenas um registro$/, () => {
	cy.server()

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webTableGetUnico' // ou 'fixture:webTableGetUnico'    //não passar a extensão do arquivo
    })
});


Then(/^devo visualizar apenas um registro$/, () => {
	// listas (neste caso a quantidade de colunas da tabela) começam do zero e não do 1
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
        
    cy.get('@gridCellPhone').should('contain.text', '5408196723')
});
