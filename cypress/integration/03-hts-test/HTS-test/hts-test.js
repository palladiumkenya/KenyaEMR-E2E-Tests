import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const url = "https://data.kenyahmis.org:9100/openmrs/login.htm;jsessionid=FF5513350BC886BF8CE8C6832D315C9C?redirect=kenyaemr%2FuserHome.page%3F"; 

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
    cy.contains('Martha').click();
});

Then ('user Check in for visit', () => {  
    cy.contains('Check in for visit').click();

    cy.get('input[class="hasDatepicker"]')
        .invoke('attr', 'value', '30-Mar-2022')
        .should('have.attr', 'value', '30-Mar-2022')
    ;
    cy.contains('Submit').click();
  
});

Then ('user click on HTS Initial Form', () => {  
    cy.contains('HTS Initial Form').click();
});

And ('the user enters {string} details for Martha Test', (validity) => {
    const details = {
        correct: {
            htsDate: '30-Mar-2022',
            populationType: 'Key Population',
            patientDisability: 'Does client have any disability?',
            hivTestHistoryOne: 'Has the client ever been tested for HIV by a HTS provider?',
            hivTestHistoryTwo: 'Has the client done HIV self test in the last 12 months?',
            setting:'HTS Setting',
            approach: 'HTS Approach',
            consent: 'Has consent been given?',
            testedAs: 'Client tested as?',
            lotNumber: '756352',
            expiryDate: '30-Apr-2022',
            lotNumber2: '7563534',
            expiryDate2: '30-Apr-2022',
            discordant: 'Couple is discordant:',
            tbScreening: 'Tb Screening results:',
            referred: 'Referral for',
            facilityreferred: 'This health facilty',
            remarks: 'Client doing okay',
                
        },
        wrong: {
           

        }
    };
    // Check for a valid validity parameter
    if (!details.hasOwnProperty(validity)) {
        throw new Error(`Validity '${validity}' is not supported`);
    }
    const htsForm = details[validity];
    if (htsForm.htsDate != null){
        cy.get('input[id="w3"]')
        .invoke('attr', 'value', '30-03-2022')
        .should('have.attr', 'value', '30-03-2022');
    }

    if (htsForm.populationType != null){
        cy.get('input[value="164929"]').click();
        cy.get('input[value="105"]').click();
       // cy.get('input[value="162277"]').click();
    }
    if (htsForm.patientDisability != null){
        cy.get('input[id="w34_0"]').click();
        cy.get('input[value="120291"]').click();
        //cy.get('input[value="162277"]').click();
    }
    if (htsForm.hivTestHistoryOne != null){
        cy.get('input[id="w48_1"]').click();
    }
    if (htsForm.hivTestHistoryTwo != null){
        cy.get('input[id="w52_1"]').click();
    }
    if (htsForm.setting != null){
        cy.get('input[id="w60_0"]').click();
    }
    cy.get('select[name="w62"]').select('Provider Initiated Testing(PITC)');
    cy.get('select[name="w64"]').select('HP: Hospital Patient Testing');
    cy.get('select[name="w68"]').select('In Patient Department(IPD)');

    if (htsForm.consent != null){
        cy.get('input[id="w70_0"]').click();
    }
    if (htsForm.testedAs != null){
        cy.get('input[id="w72_1"]').click();
    }
    cy.get('select[name="w74"]').select('Determine');
    
    if (htsForm.lotNumber != null) {
        cy.get('input[name="w76"]').type(htsForm.lotNumber, {force: true});
    }

    if (htsForm.expiryDate != null){
        cy.get('input[id="w78-display"]')
        .invoke('attr', 'value', '30-Apr-2022')
        .should('have.attr', 'value', '30-Apr-2022');
    }
    cy.get('select[name="w80"]').select('Positive');
    cy.get('select[name="w84"]').select('First Response');

    if (htsForm.lotNumber2 != null) {
        cy.get('input[name="w86"]').type(htsForm.lotNumber2, {force: true});
    }

    if (htsForm.expiryDate2 != null){
        cy.get('input[id="w88-display"]')
        .invoke('attr', 'value', '30-Apr-2022')
        .should('have.attr', 'value', '30-Apr-2022');
    }
    cy.get('select[name="w90"]').select('Positive');
    cy.get('select[name="w94"]').select('YES');

    if (htsForm.discordant != null){
        cy.get('input[id="w96_1"]').click();
    }
    if (htsForm.tbScreening != null){
        cy.get('input[id="w98_0"]').click();
    }
    
    if (htsForm.referred != null){
    cy.get('input[id="w100_0"]').click();
    }
    cy.get('select[name="w102"]').select('This health facility');

    if (htsForm.remarks != null) {
        cy.get('textarea[name="w108"]').type(htsForm.remarks, {force: true});
    }
   
   
    // if (user.firstName != null) {
    //     cy.get('input[name="personName.givenName"]').type(user.firstName, {force: true});
    // }
    // if (user.otherNames != null) {
    //     cy.get('input[name="personName.middleName"]').type(user.otherNames, {force: true});
    // }
    // if (user.gender != null) {
    //     if (user.gender === 'Female') {
    //         cy.get('input[value="F"]').click({force: true});
    //     }
    //     else {
    //         cy.get('input[value="M"]').click({force: true});
    //     }
    // }

    // cy.get('input[id="patient-birthdate"]')
    //     .invoke('attr', 'value', user.dateOfBirth)
    //     .should('have.attr', 'value', user.dateOfBirth)
    // ;
    // cy.get('select[name="maritalStatus"]').select('Married polygamous');
    // cy.get('select[name="occupation"]').select('Employee');
    // cy.get('select[name="education"]').select('None');

    // if (user.patientPhoneNumber != null) {
    //     cy.get('input[name="telephoneContact"]').type(user.patientPhoneNumber, {force: true}); 
    // }

    // if (user.alternativePhoneNumber != null) {
    //     cy.get('input[name="alternatePhoneContact"]').type(user.alternativePhoneNumber, {force: true});
    // }

    // if (user.postalAddress != null) {
    //     cy.get('input[name="personAddress.address1"]').type(user.postalAddress, {force: true});
    // }

    // if (user.emailAddress != null) {
    //     cy.get('input[name="emailAddress"]').type(user.emailAddress, {force: true});    
    // }
    
    // cy.get('select[name="personAddress.countyDistrict"]').select('Kirinyaga');
    // cy.get('select[name="personAddress.stateProvince"]').select('Mwea');
    // cy.get('select[name="personAddress.address4"]').select('Wamumu');

    // if (user.location != null) {
    //     cy.get('input[name="personAddress.address6"]').type(user.location, {force: true});    
    // }

    // if (user.subLocation != null) {
    //     cy.get('input[name="personAddress.address5"]').type(user.subLocation, {force: true});    
    // }

    // if (user.village != null) {
    //     cy.get('input[name="personAddress.cityVillage"]').type(user.village, {force: true});    
    // }

    // if (user.landmark != null) {
    //     cy.get('input[name="personAddress.address2"]').type(user.landmark, {force: true});    
    // }

    // if (user.nearestHealthCentre != null) {
    //     cy.get('input[name="nearestHealthFacility"]').type(user.nearestHealthCentre, {force: true});    
    // }

    // if (user.nextOfKinName != null) {
    //     cy.get('input[name="nameOfNextOfKin"]').type(user.nextOfKinName, {force: true});    
    // }
    // cy.get('select[name="nextOfKinRelationship"]').select('Father');

    // if (user.nextOfKinPhoneNumber != null) {
    //     cy.get('input[name="nextOfKinContact"]').type(user.nextOfKinPhoneNumber, {force: true});    
    // }
    // if (user.nextOfKinPostalAddress != null) {
    //     cy.get('input[name="nextOfKinAddress"]').type(user.nextOfKinPostalAddress, {force: true});    
    // }
});
And ('the user clicks on the Enter Form button', () => {
    cy.get('input[class="submitButton"]').click({force: true});
    cy.wait(5000);
});
Then('the patient HTS Initial Form should be {string}', status => {

 //switch (status) {
      // case 'successful':
 });