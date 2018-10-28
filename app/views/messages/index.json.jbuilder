json.array! @latestMessages do |message|
  json.user_name message.user.name
  json.id message.id
  json.content message.content
  json.image message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
end
