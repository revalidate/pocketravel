require 'json'
class PlacesController < ApplicationController

  def index
    city = City.find(params[:city_id])
    @places = Place.where(city_id: city.id)
  end

  def create
    binding.pry
    @place = current_user.places.create(place_params.merge(city_id: params[:city_id]))

    if @place
      render js: "window.location = '#{user_path(current_user)}'"
      flash[:notice] = "woohoo! you have successfully added #{@place.name} to your itinerary!"
    end
  end

  def destroy
    @place = Place.find(params[:id])
    @city_id = @place.city_id
    if current_user
      @place.destroy
      flash[:notice] = "Successfully deleted #{@place.name}"
      redirect_to user_path(current_user)
    else
      flash[:notice] = "you suck"
      redirect_to user_path(current_user)
    end
  end

  private

  #strong params
  def place_params
    params.require(:placedata).permit(:name, :address, :rating, :price_level, :open_hours, :website, :place_id)
  end

end
