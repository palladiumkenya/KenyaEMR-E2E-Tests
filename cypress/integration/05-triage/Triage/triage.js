import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let today = new Date();
today.toLocaleString('en-US', {timeZone: 'EAT'});
let day = Number(String(today.getDate()).padStart(2, '0'));
let patient_uuid = null;

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

Then ('the user click on HIV Testing Services', () => {  
    cy.contains('HIV Testing Services').click();
});

And ('user searches for the patient {string}', (patientClinicNumber) => {  
    cy.get('input[name="query"]').type(patientClinicNumber);
    cy.contains('Mishima').click();
});

Then ('user click on Triage Form', () => {  
    cy.contains('Triage').click();
});

And ('the user enters the details for Test One Mishima', () => {
    const details = {
        reasonOfVisit: 'New Client',
        temperature: '25',
        pulseRate: '12',
        bpOne: '165',
        bpTwo: '150',
        respiratoryRate:'14',
        oxygenSaturation: '34',
        weight: '58',
        height: '163',
    };
    cy.get('select[name="w1hours"]').select('09');
    cy.get('select[name="w1minutes"]').select('00');
    cy.get('select[name="w1seconds"]').select('00');

    cy.get('textarea[name="w8"]').type(details.reasonOfVisit, {force: true});

    cy.get('input[name="w10"]').type(details.temperature, {force: true});
    cy.get('input[name="w12"]').type(details.pulseRate, {force: true});
    cy.get('input[name="w14"]').type(details.bpOne, {force: true});
    cy.get('input[name="w16"]').type(details.bpTwo, {force: true});
    cy.get('input[name="w18"]').type(details.respiratoryRate, {force: true});
    cy.get('input[name="w28"]').type(details.oxygenSaturation, {force: true});
    cy.get('input[name="w22"]').type(details.weight, {force: true});
    cy.get('input[name="w24"]').type(details.height, {force: true});

    cy.get('input[id="w28-display"]').click({force:true})
        .get('[data-handler="selectDay"]')
        .contains(String(day-1))
        .click({force:true})
    ;
});

And ('the user clicks on the Enter Form button', () => {
    cy.get('input[class="submitButton"]').click({force: true});
    cy.wait(5000);
});