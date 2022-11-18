Feature: New Regimen Test

@new-regimen-test
Scenario: User fills the HTS Retest Form
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then the user click on home button
    Then the user click on Clinician
    And user searches for the patient "MGGUTA"
    Then user clicks on edit regimen button
    And user clicks on Start a new regimen button
    Then the user enters the details in the form
    And the user clicks on the Save button
    Then the "Stop" should be on the screen
  