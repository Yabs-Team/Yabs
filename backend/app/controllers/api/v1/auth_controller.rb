class Api::V1::AuthController < ApplicationController
  def index
    render json: current_user
  end

  def create
    uri = URI("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{params[:id_token]}")

    Net::HTTP.start(uri.host, uri.port,
      :use_ssl => uri.scheme == 'https') do |http|
      request = Net::HTTP::Get.new uri

      response = http.request request

      api_user = JSON.parse(response.body)
      unless api_user['aud'] == "959028814295-ojio0nureo15e2l4uj2lng0goeef0k27.apps.googleusercontent.com"
        render json: {:errors => "invalid id token"}, status: :bad_request
      else
        @user = User.where(google_token: api_user['sub']).first

        unless @user.present?
          render json: {:errors => "unknown user"}, status: :unprocessable_entity
        else
          session[:current_user_id] = @user.id
          render json: @user
        end
      end
    end
  end

  def destroy
    session[:current_user_id] = nil
  end
end
