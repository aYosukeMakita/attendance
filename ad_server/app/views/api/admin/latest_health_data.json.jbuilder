json.array! @data do |datum|
  json.userId datum['user_id']
  json.dataId datum['id']
  json.timestamp datum['timestamp']
  json.temperature datum['temperature']
  json.condition datum['condition']
  json.symptoms datum['symptoms']
  json.description datum['description']
end

