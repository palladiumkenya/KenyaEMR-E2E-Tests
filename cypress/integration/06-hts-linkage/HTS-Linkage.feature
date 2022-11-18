Feature: HTS Linkage Test

@hts-linkage-test
Scenario: User fills the HTS Retest Form
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then the user click on home button
    Then the user click on HIV Testing Services
    And user searches for the patient "MGGUTA"
    Then user click on HTS Linkage Form
    And the user enters the details for Test One Mishima
    And the user clicks on the Enter Form button
  