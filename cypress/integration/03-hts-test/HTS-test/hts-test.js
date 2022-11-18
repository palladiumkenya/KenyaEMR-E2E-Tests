import {Before, After, And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let today = new Date();
today.toLocaleString('en-US', {timeZone: 'Africa/Nairobi'});
let day = Number(String(today.getDate()).padStart(2, '0'));
let patient_uuid = null;

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const url = "https://prod.kenyahmis.org:8400/openmrs/login.htm"; 

Before ({tags: '@hts-test'}, () => {
    cy.createPatient().then((user) => {
        patient_uuid = user.uuid;
    });
});

Given ('user arrives at the login page', () => {
    cy.visit(url);
})

// When ('user logs using {string} and {string} to the Dashboard', (username, password) => {
//     cy.get('input[id="uname"]').type(username);
//     cy.get('input[name="pw"]').type(password);
//     cy.contains('Login').click();
// })

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

Then ('user Check in for visit', () => {  
    cy.contains('Check in for visit').click();
    cy.get('[id$=_hour]').select('08');
    cy.get('[id$=_minute]').select('00');
    cy.contains('Submit').click();
});

Then ('user click on HTS Initial Form', () => {  
    cy.contains('HTS Initial Form').click();
});

And ('the user enters the details for Test One Mishima', () => {
    const details = {
            populationType: 'Key Population',
            patientDisability: 'Does client have any disability?',
            hivTestHistoryOne: 'Has the client ever been tested for HIV by a HTS provider?',
            hivTestHistoryTwo: 'Has the client done HIV self test in the last 12 months?',
            setting:'HTS Setting',
            approach: 'HTS Approach',
            consent: 'Has consent been given?',
            testedAs: 'Client tested as?',
            lotNumber: '7784',
            lotNumber2: '3456',
            discordant: 'Couple is discordant:',
            tbScreening: 'Tb Screening results:',
            referred: 'Referral for',
            facilityreferred: 'This health facilty',
            remarks: 'Client doing okay',
    };

    // HTS Date
    cy.get('input[id="w3-display"]').click({force:true})
        .get('[data-handler="selectDay"]')
        .get('.ui-state-highlight')
        .contains(String(day))
        .click({force:true})
    ;
  
    cy.get('select[name="w1hours"]').select('08');
    cy.get('select[name="w1minutes"]').select('01');
    
    cy.get('input[value="164929"]').click();
    cy.get('input[value="105"]').click();
   
    cy.get('input[id="w34_0"]').click();
    cy.get('input[value="120291"]').click();

    cy.get('input[id="w48_1"]').click();

    cy.get('input[id="w52_1"]').click();

     cy.get('input[id="w60_0"]').click();
    
    cy.get('select[name="w62"]').select('Provider Initiated Testing(PITC)');
    cy.get('select[name="w64"]').select('HP: Hospital Patient Testing');
    cy.get('select[name="w68"]').select('In Patient Department(IPD)');

     cy.get('input[id="w70_0"]').click();
    
    cy.get('input[id="w72_0"]').click();
    
    cy.get('select[name="w80"]').select('Determine');
    

    cy.get('input[name="w82"]').type(details.lotNumber, {force: true});
    
    // Expire date 1
    cy.get('input[id="w84-display"]').click({force:true})
        .get('a[class="ui-state-default"]')
        .contains('30')
        .click({force:true})
    ;
 
    cy.get('select[name="w86"]').select('Positive');
    cy.get('select[name="w90"]').select('First Response');
 
    cy.get('input[name="w92"]').type(details.lotNumber2, {force: true});
    

    // Expire date 2    
    cy.get('input[id="w94-display"]').click({force:true})
        .get('a[class="ui-state-default"]')
        .contains('30')
        .click({force:true})
    ;
  
    cy.get('select[name="w96"]').select('Positive');
    cy.get('select[name="w100"]').select('YES');

 
    cy.get('input[id="w102_0"]').click();
    
    
    cy.get('input[id="w104_0"]').click();
    

    
    cy.get('select[name="w106"]').select('This health facility');

 
    cy.get('textarea[name="w136"]').type(details.remarks, {force: true});
    
});

And ('the user clicks on the Enter Form button', () => {
    cy.get('input[class="submitButton"]').click({force: true});
    cy.wait(5000);
});

Then('the patient HTS Initial Form should be {string}', status => {

 //switch (status) {
      // case 'successful':
 });
