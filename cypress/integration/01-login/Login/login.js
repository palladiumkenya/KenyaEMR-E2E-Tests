import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = "http://prod.kenyahmis.org:8600/openmrs/kenyaemr/userHome.page"; 

Given ('user arrives at the login page', () => {
    cy.visit(url);
})

When ('user logs using {string} and {string} to the Dashboard', (username, password) => {
    cy.get('input[id="uname"]').type(username);
    cy.get('input[name="pw"]').type(password);
    cy.contains('Login').click();
})

Then ('user should be in {string}.', (title) =>{
    cy.contains().should('include', title);
})
