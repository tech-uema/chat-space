class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where('id > ? and group_id = ?', params[:last_id], params[:group_id]).includes(:user)
  end
end