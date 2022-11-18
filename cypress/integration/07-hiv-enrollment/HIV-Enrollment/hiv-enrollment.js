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

Then ('user click on HIV enroll', () => {  
    cy.get('.ke-panel-frame').contains('HIV').parent().within(() => {
        cy.get("button[type='button']").click();
    })
});

And ('the user enters the details for Test One Mishima', () => {
    const details = {
        facility: 'Raruowa Health Centre',
        weight: '56',
        height: '156',
        guardianName: 'Joseph',
        telephoneNumber: '0734567891',
        postalAddress: '86 Nairobi',
    };
    cy.get('input[id="w10_0"').click({force:true});
    cy.get('input[id="w12_0"').click({force:true});
    cy.get('input[id="w29-display"]').click({force:true})
        .get('[data-handler="selectDay"]')
        .get('.ui-state-highlight')
        .contains(String(day))
        .click({force:true})
    ;
    cy.get('select[name="w1hours"]').select('09');
    cy.get('select[name="w1minutes"]').select('00');
    cy.get('select[name="w1seconds"]').select('00');

    cy.get('input[name="w31"]').type(details.facility, {force: true});
    cy.get('select[name="w35"]').select('WHO Stage2');
    cy.get('input[id="w37_1"').click({force:true});
    cy.get('input[id="w73_1"').click({force:true});
    cy.get('input[id="w75_1"').click({force:true});
    cy.get('input[name="w81"]').type(details.weight, {force: true});
    cy.get('input[name="w83"]').type(details.height, {force: true});
    cy.get('input[id="w87_1"').click({force:true});
    cy.get('input[id="w89_1"').click({force:true});
    cy.get('input[name="w91"]').type(details.guardianName, {force: true});
    cy.get('input[name="w93"]').type(details.telephoneNumber, {force: true});
    cy.get('input[name="w95"]').type(details.postalAddress, {force: true});
});

And ('the user clicks on the Enter Form button', () => {
    cy.get('input[class="submitButton"]').click({force: true});
    cy.wait(5000);
});
// TODO: htS date error
