Feature: Testing General functions on the add page

    Scenario: On the add page I want to see if the ID Card page works
        Given I am on the add page
        When I click on "Ändra Typ" dropdown
        Then I select "ID Kort"
        Then I can see "Lägg till ID Kort"
        