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

Then ('the user click on HIV Testing Services', () => {  
    cy.contains('HIV Testing Services').click();
});

And ('user searches for the patient {string}', (patientClinicNumber) => {  
    cy.get('input[name="query"]').type(patientClinicNumber);
    cy.contains('Mishima').click();
});

Then ('user click on HTS Linkage Form', () => {  
    cy.contains('HTS Linkage Form').click();
});

And ('the user enters the details for Test One Mishima', () => {
    const details = {
        cccNumber: '1403912456',
        healthWorker: 'Mary',
        remarks: 'Client Linked',
    };
    cy.get('select[name="w1hours"]').select('09');
    cy.get('select[name="w1minutes"]').select('00');
    cy.get('select[name="w1seconds"]').select('00');
    
    cy.get('select[name="w8"]').select('This health facility');
    cy.get('input[name="w17"]').type(details.cccNumber, {force: true});
    cy.get('input[name="w19"]').type(details.healthWorker, {force: true});
    cy.get('select[name="w21"]').select('CLINICAL OFFICER/DOCTOR');
    cy.get('input[id="w25-display"]').click({force:true})
        .get('[data-handler="selectDay"]')
        .contains(String(day))
        .click({force:true})
    ;
    cy.get('input[id="w27-display"]').click({force:true})
        .get('[data-handler="selectDay"]')
        .contains(String(day))
        .click({force:true})
    ;
    cy.get('textarea[name="w29"]').type(details.remarks, {force: true});
});

And ('the user clicks on the Enter Form button', () => {
    cy.get('input[class="submitButton"]').click({force: true});
    cy.wait(5000);
});
