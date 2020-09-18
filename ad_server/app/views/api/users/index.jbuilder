# frozen_string_literal: true

json.array! @users do |user|
  json.userId user.id
  json.username user.username
  json.nickname user.nickname
  json.isAdmin user.is_admin
  json.presence user.presence
  json.location user.location
end
