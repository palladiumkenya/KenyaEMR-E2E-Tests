/// <reference types="Cypress" />

import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";

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
  cy.get("html").should("contain", title);
});

Given("user clicks app with title {string}", (app) => {
  cy.get(":nth-child(4) > .ke-app").contains(app).click();
});
Then("app should contain {string}", (app) => {
  cy.get(".ke-apptoolbar > :nth-child(2) > a").should("contain", app);
});
// end of background
// Test 1
Given("user is in app homepage", () => {
  cy.get("input[type=radio]").should("have.length", 2);
  cy.get("input[value=all]").check().should("have.length", 1);
});
Then("user searches patient {string}", (name) => {
  cy.queryClient(name);
});
Given("Check-in the client", () => {
  cy.CheckInClient("25-May-2022");
});
When("user Checks if forms are {string} and fills", (number) => {
  cy.get(":nth-child(7) > .ke-panel-content")
    .should("have.length", int)
    .log("We have two forms as expected!");
});
Then("user validates", () => {
  cy.log("checks");
});

// !for scenario 2

Given("user is in app homepage", () => {
  cy.get("input[type=radio]").should("have.length", 2);
});
When("clicks {string} option", (value) => {
  cy.get("input[value=checked-in]").check().should("have.length", 1);
});
And("searches client {string}", (name) => {
  cy.queryClient(name);
  cy.checkout();
  cy.close();
});
When("user edits forms belonging to {string}", (name) => {
  cy.log("consort");
});
Then("user clicks correct search result", () => {
  cy.log("finalize");
});
