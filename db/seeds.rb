# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
topics = Board.create([{title: 'Tips of the Day'},{title: 'Q & A'},{title: 'Random Shares'}])
events = Event.create([{name: 'MacBook Air', price: 400},{name: 'MacBook Air', price: 400}])
