# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :remember, :timeoutable, :trackable and :omniauthable
  devise :ldap_authenticatable, :timeoutable, :trackable

  has_many :histories

  def remember_me
    true
  end

  def update_with_history(update_params)
    old_presence = presence
    update(update_params)

    return unless update_params.key?(:presence)

    # presenceが変わらない場合(=ニックネームや勤務地の変更)は記録しない
    return if update_params[:presence] == old_presence

    histories.create(old_presence: old_presence, new_presence: presence)
  end
end
