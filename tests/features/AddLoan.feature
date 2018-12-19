Feature: Adding a loan on the YABS site

    Scenario: Trying to add a loan to the Database
        Given I am on the add page
        Then I click on the "Elevens Streckkod" form and add an ID
        Then I click on the "Bokens Streckkod" form and add an ID
        Then I click on the "Låna Ut" button
        Then I should see "TestBook" in the right field