Feature: Login

Scenario: User login to Dashboard
    Given user arrives at the login page
    When user logs using "admin" and "Admin123" to the Dashboard
    Then user should be in "Facility Dashboard".
