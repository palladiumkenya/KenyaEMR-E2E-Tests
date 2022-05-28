Feature: Adherence counselling App/Module
    Background: Navigating user to the app
        Given user arrives at the login page
        When user logs using "admin" and "Admin123" to the Dashboard
        Then user should be in "Home"
        Given user clicks app with title "Adherence Counselling"
        Then app should contain "Adherence Counselling"
    Scenario: Filling form for all patients option
        Given user is in app homepage
        Then user searches patient "ALEX"
        Given Check-in the client
        When user Checks if forms are '2' and fills
        Then user validates
    Scenario: Filling form for only checked in patients
        Given user is in app homepage
        When clicks "Only Checked In" option
        And searches client "FREDRICK"
        When user edits forms belonging to "kinuthia"
        Then user clicks correct search result
       