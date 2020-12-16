require 'google/apis/admin_directory_v1'
require 'googleauth'

class DataFetchJob < ApplicationJob
  queue_as :default

  def perform(*fetch)
    token = []
    scopes =  ['https://www.googleapis.com/auth/admin.directory.group.readonly','https://www.googleapis.com/auth/admin.directory.user.readonly']
    client = GoogleApiClient.new(Google::Apis::AdminDirectoryV1::DirectoryService, scopes, Rails.application.secrets.google_client_secrets, 'johanneberg.laneservice@ga.ntig.se')
    data = client.service.list_users(domain: 'ga.ntig.se', query: "orgUnitPath='/Johanneberg'", max_results: 500)
    insert_data(data.users, token)
    data = client.service.list_users(domain: 'elev.ga.ntig.se', query: "orgUnitPath='/Johanneberg'", max_results: 500)
    insert_data(data.users, token)
    while data.next_page_token != nil
      data = client.service.list_users(domain: 'elev.ga.ntig.se', page_token: data.next_page_token, query: "orgUnitPath='/Johanneberg'")
      insert_data(data.users, token)
    end
    delete_users(token)
    DataFetchJob.set(wait: 24.hours).perform_later
  end

  def insert_data(users, token)
    users.each do |person|
      year = person.creation_time.split()[3]
      token << person.id
      uid = year[year.length / 2..-1] + person.id.to_str[13..-1]

      if person.org_unit_path == "/Johanneberg/Personal"
        role = 4
        klass = "Personal"
      else 
        role = 1
        klass = person.org_unit_path[20..-1]
      end
      if @user = User.find_by(google_token: person.id)
        @user.update(name: person.name.full_name, uid: uid, klass: klass, email: person.emails[0]["address"], role: role, google_token: person.id, photo_path: person.thumbnail_photo_url)
      else 
        User.create(name: person.name.full_name, uid: uid, klass: klass, email: person.emails[0]["address"], role: role, google_token: person.id, photo_path: person.thumbnail_photo_url)
      end
    end
  end

  def delete_users(token)
    User.all.reject{|x| token.include? x.google_token}.each{|user| user.update(name: "Deleted User #{user.uid}", klass: "", email: "", role: "")}
  end

end
