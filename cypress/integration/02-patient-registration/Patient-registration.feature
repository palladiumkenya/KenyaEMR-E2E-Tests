Feature: Patient Registration

Scenario Outline: Registing a patient.
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then user goes Registration tab
    And user clicks on Find or create patient button
    And user clicks Create new patient button
    Then user clicks on Register new Patient
    And the user enters "<validity>" details for Andria Faiza
    And the user clicks on the Create Patient button
    Then the patient registration should be "<status>"

    Examples:
      | validity   | status       |
      | correct      | successful   |
      | wrong      | unsuccessful |