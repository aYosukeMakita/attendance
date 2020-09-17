class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :remember, :timeoutable, :trackable and :omniauthable
  devise :ldap_authenticatable, :timeoutable, :trackable
end
