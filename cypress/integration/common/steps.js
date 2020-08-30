Given(/^que acesso o site$/, () => {
	cy.server()

    cy.route('POST','**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable');
    cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable');
    cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');

    // baseUrl + Register.html
    cy.visit('Register.html');
});