class GoogleApiClient

	attr_reader :auth_client, :service


	def initialize(service, scopes, service_account_key_file, sub=nil)
		@auth_client = set_up_auth_client(scopes, service_account_key_file, sub)
		@service = instantiate_service(service, @auth_client)

	end

	private

	def set_up_auth_client(scopes, service_account_key_file, sub)
		auth_client = Google::Auth::ServiceAccountCredentials.make_creds(json_key_io: StringIO.open(service_account_key_file), 
                                                                   scope: scopes)
		if sub
			auth_client.sub = sub
		end
		auth_client.fetch_access_token!
		return auth_client
	end

	def instantiate_service(service, auth_client)
		service = service.new 
		service.authorization = auth_client
		return service
	end


end


scopes =  ['https://www.googleapis.com/auth/admin.directory.group.readonly','https://www.googleapis.com/auth/admin.directory.user.readonly']
client = GoogleApiClient.new(Google::Apis::AdminDirectoryV1::DirectoryService, scopes, 
                             Rails.application.secrets.google_client_secrets, 'johanneberg.laneservice@ga.ntig.se')

#client.service.list_groups(domain: 'ga.ntig.se')

