/// <reference types="Cypress" />
// login
Cypress.Commands.add("login", ({ username, password }) => {
  cy.get('input[id="uname"]').type(username);
  cy.get('input[name="pw"]').type(password);
  cy.contains("Login").click();
});
// checking in a client
Cypress.Commands.add("CheckInClient", (date) => {
  cy.contains("Check in for visit").click();
  cy.get('input[class="hasDatepicker"]')
    .invoke("attr", "value", date)
    .should("have.attr", "value", date);
  cy.contains("Submit").click();
});
Cypress.Commands.add("close", () => {
  cy.get("button").contains("Close").click();
  cy.get("button").contains("Ok").click();
});
// checkout button
Cypress.Commands.add("checkout", () => {
  cy.contains("Check out of visit").click();
  cy.contains("Submit").click();
});
// Query a client
Cypress.Commands.add("queryClient", (identifier) => {
  cy.get('input[name="query"]').type(identifier);
  cy.get(".ke-page-content").contains(identifier).click();
});
