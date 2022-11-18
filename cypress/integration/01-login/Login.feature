Feature: Login

Scenario Outline: User login to Dashboard
    Given user arrives at the login page
    When user logs using the "<validity>" username and password to the Dashboard
    Then the login should be "<status>"

  Examples:
      | validity   | status       |
      | correct      | successful   |
      | wrong      | unsuccessful |
