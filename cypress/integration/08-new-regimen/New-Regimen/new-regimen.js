import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let today = new Date();
today.toLocaleString('en-US', {timeZone: 'EAT'});
let day = Number(String(today.getDate()).padStart(2, '0'));

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const url = "https://prod.kenyahmis.org:8400/openmrs/login.htm"; 

Given ('user arrives at the login page', () => {
    cy.visit(url);
})

When ('user logs using {string} and {string} to the Dashboard', (username, password) => {
    cy.get('input[id="uname"]').type(username);
    cy.get('input[name="pw"]').type(password);
    cy.contains('Login').click();
})

Then ('the user click on home button', () => {  
    cy.contains('Home').click();
});

Then ('the user click on Clinician', () => {  
    cy.contains('Clinician').click();
});

And ('user searches for the patient {string}', (patientClinicNumber) => {  
    cy.get('input[name="query"]').type(patientClinicNumber);
    cy.contains('Mishima').click();
});

Then ('user clicks on edit regimen button', () => {  
  cy.get('.ke-stack-item').filter(':contains("Regimen")').within(() => {
    cy.get("button[type='button']").eq(1).click();
  });
});

And ('user clicks on Start a new regimen button', () => {  
  cy.get('.ke-button').click();
});

Then ('the user enters the details in the form', () => {
  cy.get('.hasDatepicker').click({force:true})
    .get('[data-handler="selectDay"]')
    .get('.ui-state-highlight')
    .contains(String(day))
    .click({force:true})
  ;
  cy.get('select[name="regimenConceptRef"]').select('ABC/3TC/EFV');
  cy.get('select[name="regimenLine"]').select('Child First line');
});

And ('the user clicks on the Save button', () => {
  cy.get('button[type="submit"]').click();
  cy.wait(5000);
});

Then ('the {string} should be on the screen', (value) => {
  cy.contains(value);
});