/// <reference types="Cypress" />

import { Given, Then, When,And } from "cypress-cucumber-preprocessor/steps";

Given("user arrives at the login page", () => {
  cy.visit("/");
});

When(
  "user logs using {string} and {string} to the Dashboard",
  (username, password) => {
    cy.login({
      username: username,
      password: password,
    });
  }
);

Then("user should be in {string}", (title) => {
  cy.contains(title);
});

And("user clicks Adherance app",()=>{
  cy.get(':nth-child(4) > .ke-app').click();
});
Then("user searches patient {string}", (name)=>{
  cy.get(':nth-child(4) > .ng-pristine').type(name);
  cy.get('.ke-stack-item').click();
});
And("Checking the client",()=>{
  cy.CheckInClient('25-May-2022');
  cy.get(':nth-child(7) > .ke-panel-content').should('have.length',int)
    .log("We have two forms as expected!");
});
Then("user Checks if forms are {int}",(number)=>{
  
});