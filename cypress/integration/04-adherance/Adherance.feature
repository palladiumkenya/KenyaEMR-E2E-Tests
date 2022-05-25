Feature: Adherance

    Scenario: User has already logged in and Wants to navigate to Adherance couselling
        Given user arrives at the login page
        When user logs using "admin" and "Admin123" to the Dashboard
        Then user should be in "Home"
        And user clicks Adherance app
        Then user searches patient "kinuthia"
        And Checking the client
        Then user Checks if forms are '2'
