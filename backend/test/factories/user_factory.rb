FactoryBot.define do
    factory :user do
      uid { 2054282603 }
      name { "Låneservice Johanneberg" }
      email { "johanneberg.laneservice@ga.ntig.se" }
      role { 1 }
    end
  end

  # user_2054282603:
  # uid: 2054282603
  # name: Låneservice Johanneberg
  # email: johanneberg.laneservice@ga.ntig.se
  # klass: ej
  # role: 1
  # google_token: '101173758873354282603'
  # photo_path: 
  # created_at: !ruby/object:ActiveSupport::TimeWithZone
  #   utc: &1 2020-01-08 11:25:47.558862000 Z
  #   zone: &2 !ruby/object:ActiveSupport::TimeZone
  #     name: Etc/UTC
  #   time: *1
  # updated_at: !ruby/object:ActiveSupport::TimeWithZone
  #   utc: &3 2020-01-08 11:25:47.558862000 Z
  #   zone: *2
  #   time: *3