# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

title = Title.create(name: "Programming for dummies", isbn: "420-420", cost: 200, title_type: "Skönlitteratur")


book = Book.create(barcode: "5000", status: "Broken", title: title)

loan = Loan.new(expiration_date: Date.current)
loan.lent_by = User.find_by_name('Daniel Berg')
loan.loaned_by = User.find_by_name('Alex Henryz')
loan.book = book
loan.save

# title.dump_fixture(append=false)
# book.dump_fixture(append=false)
# loan.dump_fixture(append=false)
# loan.lent_by.dump_fixture(append=false)
# loan.loaned_by.dump_fixture(append=true)

Book.create(barcode: "0001", status: "OK", title: title).dump_fixture
Book.create(barcode: "0002", status: "OK", title: title).dump_fixture
