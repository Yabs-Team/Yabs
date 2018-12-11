# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

title = Title.create(name: "Programming for dummies", isbn: "420-420", cost: 200)
title.title_type = "Skönlitteratur"
title.save

book = Book.create(barcode: "5000", status: "Broken")
book.title = title
book.save

loan = Loan.create(expiration_date: Date.current)
loan.lent_by = User.find_by_name('Daniel Berg')
loan.loaned_by = User.find_by_name('Alex Henryz')
loan.book = book
loan.save

Book.create(barcode: "0001", status: "OK", title: title)
Book.create(barcode: "0002", status: "OK", title: title)
