import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = "https://prod.kenyahmis.org:8400/openmrs/login.htm"; 

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

Given ('user arrives at the login page', () => {
    cy.visit(url);
})

When ('user logs using the {string} username and password to the Dashboard', (validity) => {
    const details = {
        correct: {
            username: 'admin',
            password: 'Admin123',
        },
        wrong: {
            username: 'admin',
            password: null,
        }
    };
    
    if (!details.hasOwnProperty(validity)) {
        throw new Error(`Validity '${validity}' is not supported`);
    }
    const user = details[validity];

    if (user.username != null) {
        cy.get('input[id="uname"]').type(user.username);   
    }
    if (user.password != null) {
        cy.get('input[name="pw"]').type(user.password);
    }
    cy.contains('Login').click();
})

Then('the login should be {string}', status => {
    switch (status) {
        case 'successful':
             cy.contains('Home');
            break;
        case 'unsuccessful':
            cy.contains('Invalid username/password. Please try again.');
            break;
        default:
            throw new Error(`Status '${status}' is not supported`);
    }
})
