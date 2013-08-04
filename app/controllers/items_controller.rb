class ItemsController < ApplicationController

  before_filter :authenticate_user!

  #not be using this
  def index
    @items = Item.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @boards }
    end
  end

  #not be using this, instead use admin dashboard
  def show
    @item = Item.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @board }
    end
  end

  def edit
    @item = Item.find(params[:id])
  end

  def update

  end

  def new
    @item = Item.new

  end

  def create
    @item = Item.new(params[:board])
    @item.save
    respond_to do |format|
      format.html { redirect_to '/admin', notice: 'Board was successfully created.' }
    end
  end

  def destroy
    @item = Board.find(params[:id])
    @item.destroy

    redirect_to '/admin'
  end
end
