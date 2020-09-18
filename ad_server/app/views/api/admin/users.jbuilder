json.array! @users do |user|
  json.userId user.id
  json.name user.username
  json.isAdmin user.is_admin
end
