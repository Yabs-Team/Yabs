FactoryBot.define do

    # factory :subject do
    #     id { 4 }
    #     name { "Skönlitteratur" }
    # end 

    # factory :test do
    #   id { 1242345 }
    #   name { Faker::Book.title }
    # #   isbn { '0763645680' }
    #   cost { Faker::Number.number(digits: 2) }
    #   title_type { "Skönlitteratur" }
    #   subject
    # end

    factory :title do
      id { Faker::Number.number(digits: 10)}
      name { Faker::Book.title }
    #   isbn { '0763645680' }
      cost { Faker::Number.number(digits: 2) }
      title_type { "Skönlitteratur" }
      subject
    end
  end

#   title_1:
#   id: 1
#   name: Alice in Wonderland
#   isbn: '0763645680'
#   cost: 70
#   title_type: Skönlitteratur
#   created_at: !ruby/object:ActiveSupport::TimeWithZone
#     utc: &1 2020-01-08 11:26:01.573494000 Z
#     zone: &2 !ruby/object:ActiveSupport::TimeZone
#       name: Etc/UTC
#     time: *1
#   updated_at: !ruby/object:ActiveSupport::TimeWithZone
#     utc: &3 2020-01-08 11:26:01.573494000 Z
#     zone: *2
#     time: *3
#   description: A little girl falls down a rabbit hole and discovers a world of nonsensical
#     and amusing characters.
#   authors: '["Lewis Carroll"]'
#   cover: http://books.google.com/books/content?id=sw0UwPjaw80C&printsec=frontcover&img=1&zoom=3&source=gbs_api
#   page_count: !ruby/object:BigDecimal 27:0.95e2
#   published_date: '2009'
#   subject_id: 4