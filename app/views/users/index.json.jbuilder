json.array! @users do |user|
  json.user_name user.name
  json.id user.id
end
