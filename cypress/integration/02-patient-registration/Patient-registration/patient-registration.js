import { Given, Then, When, } from "cypress-cucumber-preprocessor/steps";
 
Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
 
const url = "https://prod.kenyahmis.org:8400/openmrs/login.htm;jsessionid=FF5513350BC886BF8CE8C6832D315C9C?redirect=kenyaemr%2FuserHome.page%3F"; 
 
Given ('user arrives at the login page', () => {
    cy.visit(url);
})
 
When ('user logs using {string} and {string} to the Dashboard', (username, password) => {
    cy.get('input[id="uname"]').type(username);
    cy.get('input[name="pw"]').type(password);
    cy.contains('Login').click();
})
 
Then ('user goes Registration tab', () =>{
    cy.contains('Registration').click();
})
 
And ('user clicks on Find or create patient button', () => {
    cy.contains('Find or create patient').click();
})
 
And ('user clicks Create new patient button', () => {
    cy.contains('Create new patient').click();
})
 
Then ('user clicks on Register new Patient',() => {
    cy.contains('Register new Patient').click();
})
 
// Test 
// And ('the user enters details for Andria Faiza', () => {
//     cy.get('input[name="personName.familyName"]').type('Faiza');
//     cy.get('input[name="personName.givenName"]').type('Andria');
//     cy.get('input[value="F"]').click({force: true});
//     cy.get('input[id="patient-birthdate_date"]').click({force: true});
//     cy.get('input[id="patient-birthdate"]')
//         .invoke('attr', 'value', '2022-03-01 00:00:00.000')
//         .should('have.attr', 'value', '2022-03-01 00:00:00.000')
//     ;
//     // cy.getByLabel('Surname').type('Faiza', {force: true});
//     // cy.getByLabel('First name').type('Andria', {force: true});
// })
 
// Further Improvments
 
And ('the user enters {string} details for Cleo Otieno', (validity) => {
    const details = {
        correct: {
            patientClinicNumber: '00768',
            patientId: '26374471',
            firstName: 'Cleo',
            otherNames: 'Otieno',
            surname: 'Faiza',
            gender: 'Female',
            dateOfBirth: '2022-03-01 00:00:00.000',
            patientPhoneNumber: '0723456789',
            alternativePhoneNumber: '0756234123',
            postalAddress: '4523 Nairobi',
            emailAddress: 'test@gmail.com',
            location: 'Mwea',
            subLocation: 'Mwea Town',
            village: 'Town Centre',
            landmark: 'Mwea Town school',
            nearestHealthCentre: 'Mwea Town Hospital',
            nextOfKinName: 'Mary Wambua',
            nextOfKinPhoneNumber: '0767231456',
            nextOfKinPostalAddress: '56713 Nairobi',
 
 
 
        },
        wrong: {
            patientClinicNumber: '0078',
            patientId: '26374489',
            firstName: null,
            otherNames: 'Cleo',
            surname: 'Otieno',
            gender: 'Female',
            dateOfBirth: '2022-03-01 00:00:00.000',
            patientPhoneNumber: '0723456789',
            alternativePhoneNumber: '0756234123',
            postalAddress: '4523 Nairobi',
            emailAddress: 'test@gmail.com',
            location: 'Mwea',
            subLocation: 'Mwea Town',
            village: 'Town Centre',
            landmark: 'Mwea Town school',
            nearestHealthCentre: 'Mwea Town Hospital',
            nextOfKinName: 'Mary Wambua',
            nextOfKinPhoneNumber: '0767231456',
            nextOfKinPostalAddress: '56713 Nairobi',
 
 
        }
    };
    // Chek for a valid validity parameter
    if (!details.hasOwnProperty(validity)) {
        throw new Error(`Validity '${validity}' is not supported`);
    }
    const user = details[validity];
    if (user.patientClinicNumber != null){
        cy.get('input[name="patientClinicNumber"]').type(user.patientClinicNumber, {force: true});
    }
    if (user.patientId != null){
        cy.get('input[name="nationalIdNumber"]').type(user.patientId, {force: true});
    }
    if (user.surname != null) {
        cy.get('input[name="personName.familyName"]').type(user.surname, {force: true});
    }
    if (user.firstName != null) {
        cy.get('input[name="personName.givenName"]').type(user.firstName, {force: true});
    }
    if (user.otherNames != null) {
        cy.get('input[name="personName.middleName"]').type(user.otherNames, {force: true});
    }
    if (user.gender != null) {
        if (user.gender === 'Female') {
            cy.get('input[value="F"]').click({force: true});
        }
        else {
            cy.get('input[value="M"]').click({force: true});
        }
    }
 
    cy.get('input[id="patient-birthdate"]')
        .invoke('attr', 'value', user.dateOfBirth)
        .should('have.attr', 'value', user.dateOfBirth)
    ;
    cy.get('select[name="maritalStatus"]').select('Married polygamous');
    cy.get('select[name="occupation"]').select('Employee');
    cy.get('select[name="education"]').select('None');
 
    cy.get('input[name="select-kenya-option"]').click({force: true});
 
    if (user.patientPhoneNumber != null) {
        cy.get('input[name="telephoneContact"]').type(user.patientPhoneNumber, {force: true}); 
    }
 
    if (user.alternativePhoneNumber != null) {
        cy.get('input[name="alternatePhoneContact"]').type(user.alternativePhoneNumber, {force: true});
    }
 
    if (user.postalAddress != null) {
        cy.get('input[name="personAddress.address1"]').type(user.postalAddress, {force: true});
    }
 
    if (user.emailAddress != null) {
        cy.get('input[name="emailAddress"]').type(user.emailAddress, {force: true});    
    }
 
    cy.get('select[id="county"]').select('Kirinyaga');
    cy.get('select[id="subCounty"]').select('Mwea');
    cy.get('select[id="ward"]').select('Wamumu');
 
    if (user.location != null) {
        cy.get('input[name="personAddress.address6"]').type(user.location, {force: true});    
    }
 
    if (user.subLocation != null) {
        cy.get('input[name="personAddress.address5"]').type(user.subLocation, {force: true});    
    }
 
    if (user.village != null) {
        cy.get('input[name="personAddress.cityVillage"]').type(user.village, {force: true});    
    }
 
    if (user.landmark != null) {
        cy.get('input[name="personAddress.address2"]').type(user.landmark, {force: true});    
    }
 
    if (user.nearestHealthCentre != null) {
        cy.get('input[name="nearestHealthFacility"]').type(user.nearestHealthCentre, {force: true});    
    }
 
    if (user.nextOfKinName != null) {
        cy.get('input[name="nameOfNextOfKin"]').type(user.nextOfKinName, {force: true});    
    }
    cy.get('select[name="nextOfKinRelationship"]').select('Father');
 
    if (user.nextOfKinPhoneNumber != null) {
        cy.get('input[name="nextOfKinContact"]').type(user.nextOfKinPhoneNumber, {force: true});    
    }
    if (user.nextOfKinPostalAddress != null) {
        cy.get('input[name="nextOfKinAddress"]').type(user.nextOfKinPostalAddress, {force: true});    
    }
 
})
And ('the user clicks on the Post to Registry button', () => {
    cy.get('button').contains('Post to Registry').click({force: true});
})
 
And ('the user clicks on the Create Patient button', () => {
    cy.get('button').contains('Create Patient').click({force: true});
    cy.wait(5000);
})
 
Then('the patient registration should be {string}', status => {
    switch (status) {
        case 'successful':
            cy.contains('National ID');
            break;
        case 'unsuccessful':
            cy.contains('Please fix all errors...');
            break;
        default:
            throw new Error(`Status '${status}' is not supported`);
    }
})
