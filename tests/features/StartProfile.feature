Feature: Testing the start page to route to the profile page

    Scenario: To test redirection to profile page
        Given I am on the start page
        When I click on the "Profil" button
        Then I should redirect to "/users"
        And Not "/add"
        Then I should see "Lån"


    
