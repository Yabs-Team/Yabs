require 'byebug'

Given("I am on the start page") do
    visit("/")
end

When("I click on the {string} button") do |string|
    click_button string
end

Then("I should redirect to {string}") do |path|
    assert current_path == path
end

And("Not {string}") do |path|
    assert current_path != path
end

Then("I should see {string}") do |string|
    page.has_content? string
end
  