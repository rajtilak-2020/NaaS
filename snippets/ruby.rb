require 'net/http'
require 'json'
require 'uri'

uri = URI('https://no.krajtilak.in/api/no')
response = Net::HTTP.get(uri)
data = JSON.parse(response)
puts "Reason to say no: #{data['reason']}"