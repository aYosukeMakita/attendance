# frozen_string_literal: true

json.userId @user.id
json.username @user.username
json.nickname @user.nickname
json.histories do
  json.array! @histories do |history|
    json.oldPresence history.old_presence
    json.newPresence history.new_presence
    json.time history.created_at
  end
end
