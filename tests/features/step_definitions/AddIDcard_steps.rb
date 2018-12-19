require 'byebug'

Given("I am on the add page") do
    visit("/add")
end
  
When("I click on {string} dropdown") do |string|
    click_button string
end
  
Then("I select {string}") do |string|
    click_link string
end

Then("I can see {string}") do |string|
    assert page.has_content?(string) == true
end