/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');

// Instantiate Chance so it can be used
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        //rotas
        // POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        
        cy.server()

        cy.route('POST','**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable');
        cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable');
        cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');

        // baseUrl + Register.html
        cy.visit('Register.html');

        //type
        cy.get('input[placeholder="First Name"]').type(chance.first())
        cy.get('input[placeholder="Last Name"]').type(chance.last())
        cy.get('input[ng-model^=Email]').type(chance.email())
        cy.get('input[ng-model^=Phone]').type(chance.phone({formatted : false}))

        // check -> radio e checkbox
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        // select-> select & select2 (combos)
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Japan', {force: true});
        cy.get('select#yearbox').select('1997');
        cy.get('select[ng-model^=month]').select('May');
        cy.get('select#daybox').select('7');

        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');   

        cy.get('input#imagesrc').attachFile('Capturar.PNG')

        cy.get('button#submitbtn').click();

        cy.wait('@postNewTable').then((resNewTable) => {
            // exemplos de uso da resposta
            // console.log(resNewTable.status)
            // cy.log(resNewTable.status)

            // chai
            expect(resNewTable.status).to.eq(200)
        })

        cy.wait('@postUserTable').then((resUserTable) => {
            expect(resUserTable.status).to.eq(200)
        })

        cy.wait('@getNewTable').then((resNewTable) => {
            expect(resNewTable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable');
    }); 
});


// elementos

// input[placeholder="First Name"]

// input[placeholder="Last Name"]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills
// select#countries
// select#country
// select#yearbox
// input[ng-model^=month]
// select#daybox

// input#firstpassword
// input#secondpassword