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

Then ('user clicks on HIV Green Card form', () => {  
    cy.contains('HIV Green Card').click();
});

Then ('the user enters the details in the form', () => {
  cy.get('input[id="w8_0"]').click();
  cy.get('input[id="w10_0"]').click();
  cy.get('input[name="w14"]').type("37", {force: true});
  cy.get('input[name="w16"]').type("23", {force: true});
  cy.get('input[name="w18"]').type("170", {force: true});
  cy.get('input[name="w20"]').type("150", {force: true});
  cy.get('input[name="w22"]').type("12", {force: true});
  cy.get('input[name="w24"]').type("26", {force: true});
  cy.get('input[name="w26"]').type("44", {force: true});
  cy.get('input[name="w30"]').type("152", {force: true});
  cy.get('input[value="164929"]').click();
  cy.get('input[value="105"]').click();
  cy.get('select[name="w58"]').select('WHO Stage1');

And ('the user clicks on the Next button', () => {
    cy.get('buttonNext').contains('Next').click({force: true});
});
  
  cy.get('input[id="w60_1"]').click();
  cy.get('input[id="w96_1"]').click();
  cy.get('input[id="w98_1"]').click();
  cy.get('input[id="w100_1"]').click();
  cy.get('input[id="w102_1"]').click();
  cy.get('input[id="w104_1"]').click();
  cy.get('input[id="w106_1"]').click();
  cy.get('input[id="w108_1"]').click();
  cy.get('input[id="w146_1"]').click();
  cy.get('input[id="w188_1"]').click();
  cy.get('input[id="w210_1"]').click();
  cy.get('input[value="782"]').click();
  cy.get('input[id="w270_2"]').click();
  cy.get('input[class="buttonNext"]').click({force: true});
  cy.get('input[value="1107"]').click();
  cy.get('input[id="w348_0"]').click();
  cy.get('input[class="buttonNext"]').click({force: true});
  cy.get('input[id="w402_0"]').click();
  cy.get('input[id="w404_0"]').click();
  cy.get('input[id="w406_0"]').click();
  cy.get('input[id="w414_0"]').click();
  cy.get('input[id="w416_0"]').click();
  cy.get('input[id="w418_0"]').click();
  cy.get('input[id="w420_0"]').click();
  cy.get('input[id="w422_2"]').click();
  cy.get('input[id="w424_2"]').click();
  cy.get('input[id="w428_1"]').click();
//Next appointment date
  cy.get('input[id="w432-display"]').click({force:true})
        .get('a[class="ui-state-default"]')
        .contains('30')
        .click({force:true})
    ;
   cy.get('select[name="w434"]').select('Follow up');  
   cy.get('select[name="w440"]').select('Standard Care');   

})

And ('the user clicks on the Submit button', () => {
  cy.get('button[type="submit"]').click();
  cy.wait(5000);
});

