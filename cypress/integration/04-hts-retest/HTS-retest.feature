Feature: New Patient HTS Test

@hts-retest
Scenario: User fills the HTS Retest Form
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then the user click on home button
    Then the user click on HIV Testing Services
    And user searches for the patient "MGGUTA"
    Then user click on HTS Retest Form
    And the user enters the details for Test One Mishima
    And the user clicks on the Enter Form button
    # Then the patient HTS Retest Form should be "<status>"
  