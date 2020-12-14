FactoryBot.define do
   factory :subject do
        id { 4 }
        name { "Skönlitteratur" }
    end 
end

# subject_4:
#   id: 4
#   name: Skönlitteratur
#   created_at: !ruby/object:ActiveSupport::TimeWithZone
#     utc: &1 2020-01-09 09:59:35.472461000 Z
#     zone: &2 !ruby/object:ActiveSupport::TimeZone
#       name: Etc/UTC
#     time: *1
#   updated_at: !ruby/object:ActiveSupport::TimeWithZone
#     utc: &3 2020-01-09 09:59:35.472461000 Z
#     zone: *2
#     time: *3