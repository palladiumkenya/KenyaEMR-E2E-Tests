import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = "http://197.248.44.228:8600/openmrs/login.htm;jsessionid=FF5513350BC886BF8CE8C6832D315C9C?redirect=kenyaemr%2FuserHome.page%3F"; 

Given ('user arrives at the login page', () => {
    cy.visit(url);
})

When ('user logs using {string} and {string} to the Dashboard', (username, password) => {
    cy.get('input[id="uname"]').type(username);
    cy.get('input[name="pw"]').type(password);
    cy.contains('Login').click();
})

Then ('user should be in {string}.', (title) =>{
    cy.contains(title);
})
