Feature: New Patient HTS Test

Scenario Outline: User fills the HTS Initial Form
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then the user click on home button
    Then the user click on HIV Testing Services
    And user searches for the patient "0076"
    Then user Check in for visit
    Then user click on HTS Initial Form
    And the user enters "<validity>" details for Martha Test
    And the user clicks on the Enter Form button
    Then the patient HTS Initial Form should be "<status>"
    

    Examples:
      | validity   | status       |
      | correct      | successful   |
      | wrong      | unsuccessful |