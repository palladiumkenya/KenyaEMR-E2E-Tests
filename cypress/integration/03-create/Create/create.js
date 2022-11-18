import { After, Given, Before, Then, When } from "cypress-cucumber-preprocessor/steps";

// const url = "http://197.248.44.228:8600/openmrs/login.htm;jsessionid=FF5513350BC886BF8CE8C6832D315C9C?redirect=kenyaemr%2FuserHome.page%3F"; 

let patient_uuid = null;

Before({tags: '@create'}, () => {
    cy.createPatient().then((user) => {
        patient_uuid = user.uuid;
    });
});

Given ('create patient', () => {
   
});

After({tags: '@create'}, () => {
    cy.deletePatient(patient_uuid);
});
