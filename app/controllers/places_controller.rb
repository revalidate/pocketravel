require 'json'
class PlacesController < ApplicationController

  def index
    @places = Place.all
  end

  def create
    places = JSON.parse(params[:placedata])
    @place = Place.new(places)
    @place.users << current_user
    if @place.save!
      render js: "window.location = '#{user_path(current_user)}'"
      flash[:notice] = "woohoo! you have successfully added #{@place.name} to your itinerary!"
    end
  end

  # def destroy
  #   @place = Place.find(params[:id])
  #   if current_user == @user
  #     @place.destroy
  #     flash[:notice] = "Successfully deleted #{@place.name}"
  #   else
  #     flash[:notice] = "you suck"
  #   end
  # end

end
