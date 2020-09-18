class Admin::PagesController < ApplicationController
  before_action :sign_in_required, only: [:show]

  def show
  end

  private

  def sign_in_required
    redirect_to new_user_session_url unless user_signed_in?
  end
end
