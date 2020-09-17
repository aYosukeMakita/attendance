# frozen_string_literal: true

class Api::UsersController < ApplicationController
  # before_action :sign_in_required
  before_action :authenticate_user!
  before_action :admin, only: [:histories]
  before_action :set_user, only: %i[update user_histories]
  before_action :update_params, only: [:update]

  def index
    @users = User.all
  end

  def update
    render json: { message: 'OK' }
  end

  def histories
    render json: { message: 'OK' }
  end

  def user_histories
    render json: { message: 'OK' }
  end

  private

  def sign_in_required
    Rails.logger.debug('===================================')
    Rails.logger.debug(current_user)
    Rails.logger.debug(user_signed_in?)
    Rails.logger.debug('===================================')
    render body: '', status: :unauthorized unless user_signed_in?
  end

  def admin
    render body: '', status: :unauthorized unless current_user.is_admin
  end

  def set_user
    return render json: { message: 'user_id is required' }, status: :bad_request unless params.key?(:id)

    @user = User.find_by_id(params[:id])
    render json: { message: 'user not found' }, status: :not_found if @user.nil?
  end

  def update_params
    unless ['working', 'finished', 'bread', nil].include?(params[:presence])
      render json: { message: "invalid params #{params[:presence]}" }, status: :bad_request
    end

    {
      nickname: params[:nickname],
      presence: params[:presence],
      location: params[:location]
    }
  end
end