class CitiesController < ApplicationController

  # GET /cities
  def index
    @cities = City.all
  end

  # GET /cities/1
  def show
    @city = City.find_by_id(params[:id])
  end

end
