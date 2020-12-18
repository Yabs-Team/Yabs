# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Import Users
require 'google_books'
ActiveSupport.on_load(:active_job) do
    ActiveJob::Base.queue_adapter = Rails.application.config.active_job.queue_adapter
end
DataFetchJob.perform_now

p_sub = Subject.create(name: "Programmering")
s_sub = Subject.create(name: "Svenska")
e_sub = Subject.create(name: "Engelska")
lib_sub = Subject.create(name: "Skönlitteratur")

p_user = User.find_by_name("Daniel Berg")
e_user = User.find_by_name("Jimmy Löfgren")
Responsibility.create(subject: p_sub, user: p_user)
Responsibility.create(subject: e_sub, user: e_user)

alice_google = GoogleBooks::API.search('isbn:0763645680').first
# Create titles of both book types
title_alice = Title.create(name: "Alice in Wonderland", isbn: "0763645680", 
    cost: 70, 
    title_type: "Skönlitteratur",
    description: alice_google.description,
    authors: alice_google.authors.to_s,
    cover: alice_google.covers[:large],
    page_count: alice_google.page_count,
    published_date: alice_google.published_date,
    subject: lib_sub
)
title_lotr = Title.create(name: "The Fellowship of the Ring", isbn: "9780547928210", cost: 100, title_type: "Skönlitteratur", subject: lib_sub)

title_cc = Title.create(name: "Clean Code", isbn: "9780132350884", cost: 300, title_type: "Kurslitteratur", subject: p_sub)
title_tomtens_jul = Title.create(name: "Tomtens jul", isbn: "9781999985462", cost: 60, title_type: "Kurslitteratur", subject: s_sub)

# Create books to be loaned
book_alice = Book.create(barcode: "5000", condition: "OK", title: title_alice)
book_cc = Book.create(barcode: "1001", condition: "OK", title: title_cc)

# Create a loans
loan_alice = Loan.new(expiration_date: Date.current)
loan_alice.lent_by = User.find_by_name("Låneservice Johanneberg")
loan_alice.loaned_by = User.find_by_name("Alex Henryz")
loan_alice.book = book_alice
loan_alice.save

loan_cc = Loan.new(expiration_date: Date.current)
loan_cc.lent_by = User.find_by_name("Låneservice Johanneberg")
loan_cc.loaned_by = User.find_by_name("Alex Henryz")
loan_cc.book = book_cc
loan_cc.returned_at = Date.current
loan_cc.save

review_alice = Review.new(score: 3, review: "I didn't particulary like this book.")
review_alice.title = title_alice
review_alice.user = loan_alice.loaned_by
review_alice.save   


# Create the rest of the books
Book.create(barcode: "5002", condition: "Broken", title: title_alice)
Book.create(barcode: "5003", condition: "OK", title: title_alice)
Book.create(barcode: "5004", condition: "OK", title: title_lotr)
Book.create(barcode: "5005", condition: "Broken", title: title_lotr)
Book.create(barcode: "5006", condition: "OK", title: title_cc)
Book.create(barcode: "5007", condition: "OK", title: title_tomtens_jul)
Book.create(barcode: "5008", condition: "OK", title: title_tomtens_jul)

# Create test Cards
Card.create(uid: 1, expiration_data: "2020-12-17 11:55:10", status: "testCard0", user: 1849468831)
Card.create(uid: 2, expiration_data: "2020-12-17 11:55:10", status: "testCard1", user: 1849468831)

# Create fixtures
def fixtures_card()
    cards = Card.all.to_a
    cards.shift.dump_fixture(append = false)
    for card in cards do
        card.dump_fixture
    end
end

def fixtures_title()
    titles = Title.all.to_a
    titles.shift.dump_fixture(append = false)
    for title in titles do
        title.dump_fixture
    end
end

def fixtures_subjects()
    subjects = Subject.all.to_a
    subjects.shift.dump_fixture(append = false)
    for subject in subjects do
        subject.dump_fixture
    end
end

def fixtures_book()
    books = Book.all.to_a
    books.shift.dump_fixture(append = false)
    for book in books do
        book.dump_fixture
    end
end

def fixtures_loan()
    loans = Loan.all.to_a
    loans.shift.dump_fixture(append = false)
    for loan in loans do
        loan.dump_fixture
    end
end

def fixtures_user()
    Loan.find(1).lent_by.dump_fixture(append=false)
    Loan.find(1).loaned_by.dump_fixture
    Loan.find(2).loaned_by.dump_fixture
end

def fixtures_review()
    reviews = Review.all.to_a
    reviews.shift.dump_fixture(append = false)
    for review in reviews do
        review.dump_fixture
    end
end

case ENV["fixture"]
when "all"
    fixtures_subjects
    fixtures_book
    fixtures_loan
    fixtures_review
    fixtures_title
    fixtures_user
    fixtures_card
when "book"
    fixtures_book
when "title"
    fixtures_title
when "loan"
    fixtures_loan
when "user"
    fixtures_user
when "review"
    fixtures_review
when "subject"
    fixtures_subjects
when "card"
    fixtures_card
when nil
    #do nothing
else
    p "Error: Unsupported fixture flag"
end

