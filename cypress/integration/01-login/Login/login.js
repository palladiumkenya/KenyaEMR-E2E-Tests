import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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
