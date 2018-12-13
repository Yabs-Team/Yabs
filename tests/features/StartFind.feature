Feature: Testing the start page to route to the profile page

    Scenario: To test redirection to profile page
        Given I am on the start page
        When I click on the "Hitta" button
        Then I should redirect to "/find"
        And Not "/"
        Then I should see "Filter"


    
