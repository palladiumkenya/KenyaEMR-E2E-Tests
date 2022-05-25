/// <reference types="Cypress" />
Cypress.Commands.add('login',({username, password})=>{
    cy.get('input[id="uname"]').type(username);
    cy.get('input[name="pw"]').type(password);
    cy.contains('Login').click();
})
Cypress.Commands.add("CheckInClient",(date)=>{
    cy.contains("Check in for visit").click();
    cy.get('input[class="hasDatepicker"]')
    .invoke("attr", "value", date)
    .should("have.attr", "value",date);
  cy.contains("Submit").click();
})