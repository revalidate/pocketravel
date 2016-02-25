class HomeController < ApplicationController
  def get_cities
    @cities = City.all
  end
end
