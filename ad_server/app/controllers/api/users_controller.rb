# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    before_action :authenticate_user! unless ENV['NO_AUTH'] == 'yes'
    before_action :set_user, only: %i[update histories statistics]
    before_action :update_params, only: [:update]

    def index
      @users = User.all
    end

    def update
      @user.update_with_history(update_params)
    end

    def histories
      @histories = @user.histories.order(:id).limit(100)
    end

    def statistics
      render json: { message: 'statistics not implemented yet' }
    end

    private

    def set_user
      return render json: { message: 'user_id is required' }, status: :bad_request unless params.key?(:id)

      @user = User.find_by(id: params[:id])
      return render json: { message: 'user not found' }, status: :not_found if @user.nil?

      return if ENV['NO_AUTH'] == 'yes'
      return if @user.id == current_user.id || current_user.is_admin

      render json: { message: 'unauthorized' }, status: :unauthorized
    end

    def update_params
      unless ['working', 'finished', 'break', nil].include?(params[:presence])
        render json: { message: "invalid params #{params[:presence]}" }, status: :bad_request
      end

      {
        nickname: params[:nickname],
        presence: params[:presence],
        location: params[:location],
      }.compact
    end
  end
end
