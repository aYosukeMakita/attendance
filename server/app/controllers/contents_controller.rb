# frozen_string_literal: true

class ContentsController < ApplicationController
  # before_action :sign_in_required

  def show
    @user_id = current_user.id
  end

  private

  def sign_in_required
    redirect_to new_user_session_url unless user_signed_in?
  end
end
