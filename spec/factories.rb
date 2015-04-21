Factory.define :user do |user|
  user.name "Rok Slavec"
  user.password "password"
  user.password_confirmation "password"
end

Factory.sequence :name do |n|
  "person-#{n}"
end

Factory.define :farm do |farm|
  farm.name "Kmetija Slavec"
  farm.region "Izola"
  farm.north "45.5017657"
  farm.east "13.6671009"
  farm.description "Vinarstvo in oljkarstvo Slavec"
  farm.categories "vino, olje"
  farm.products "malvazija, olje"
  farm.association :user
end
