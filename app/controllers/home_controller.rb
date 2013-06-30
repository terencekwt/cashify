class HomeController < ApplicationController
  def index
      if user_signed_in?
          redirect_to '/home/dashboard'
      else 
          render :layout => 'login'
      end
  end
end
