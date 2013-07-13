class DashboardController < ApplicationController
  before_filter :authenticate_user!
  def index
  end
  def market
  end
  def admin
      #admin dashboard
      if current_user.admin?
          @items = Item.all
      else
          #redirect_to action: 'index'
          @items = Item.all
          @users = User.all
          @boards = Board.all
      end
  end
end
