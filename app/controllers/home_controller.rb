class HomeController < ApplicationController
  #this class is for static pages that doesn't need user authentications
  def index
      if user_signed_in?
          redirect_to '/dashboard'
      else 
          render :layout => 'login'
      end
  end
end
