Feature: HIV Green Card Test

@green-card-test
Scenario: User fills the HIV Green Card Form
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then the user click on home button
    Then the user click on Clinician
    And user searches for the patient "MGGUTA"
    Then user clicks on HIV Green Card form
    Then the user enters the details in the form
    And the user clicks on the Submit button
    
  