# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


sf = City.create(name: "San Francisco", lat:37.7833 , lng:-122.4167 , radius: 50000)
ny = City.create(name: "Manhattan", lat:40.7903 , lng:-73.9597 , radius: 50000)
