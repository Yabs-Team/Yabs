Feature: Testing the start page to route to the add page

    Scenario: To test redirection to add page
        Given I am on the start page
        When I click on the "Lägg till" button
        Then I should redirect to "/add"
        And Not "/find"
        Then I should see "Lägg till Lån"