json.extract! card, :uid, :user_id, :expiration_data, :status, :created_at, :updated_at
json.url card_url(card, format: :json)
