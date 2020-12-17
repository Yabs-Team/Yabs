json.extract! card, :id, :uid, :user_uid, :expiration_data, :status, :created_at, :updated_at
json.url card_url(card, format: :json)
