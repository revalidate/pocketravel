#pocketravel
Pocketravel is for the explorer that likes to discover new places locally and across the globe. Often times we consult our friends for travel recommendations before trips to new places, which generally is followed by an email with some messy documents of recommendations with minimal details... if we're lucky. Pocketravel aims to solve that problem.

##User Stories & Wire Frames
I split my MVP into four sprints based off of four features: 1) <b>Search by Place</b>, 2) <b>User Log In / Sign Up</b>, 3) <b>Saved Places to Profile</b>, 4) <b>PDF City Itinerary</b>. Checkout my user stories [here](https://trello.com/b/lScr0B90/travel-on-the-go)

##Technologies Used
* **Ruby On Rails**
	* **bcrypt** for user authentication
	* **materialize-sass**
* **PostgreSQL** as our backend database
* **Google Places Javascript API** with Autocomplete, Search Box and Info Window Features for both San Francisco and Manhattan. The map displays an interactive map dependent on the bounds of each city. The places search is bias towards those bounds. When a user searches a place, they are sending one request to the API for the place and it's basic information. When the user clicks on a specific place, they are sending a second request to the API to get the place's details.
* **Javascript** * **jQuery** implemented to render the Google Places API, search results and saving places to a user's itinerary. I also used Javascript and jQuery to filter users' places in their itinerary by city.
* **HTML + CSS** for all our front-end engineering
* **Materialize** framework to implement **Parallax** onto homepage  and **Bootstrap** to design each page
* **RESTful Routes** designed CRUD routes using the REST convention relevant to user experience.
* **Git + Github** version control used at every stage of project articulating progress throughout the week
* **Visual Design** wire framing & user stories were essential to keep branding consistent.
* **Heroku**

## Installation
* **Step 1**: Fork and clone this repository

* **Step 2**: In terminal type in the following commands

```
bash
bundle install
rake db:create db:migrate db:seed
rails s
```

* **Step 3**: Go to localhost:3000 in Browser

##Link to Heroku
​
This application is deployed on heroku [here](https://pocketravel.herokuapp.com).

## Features to Implement

* **Yelp API Integration** to filter search results to top rated places
* **Google Static Maps API** to add a static map for each place a user added to their itinerary
* **PDF Feature** you can click on per itinerary so you can take all your recommendations offline
* **More Cities** the logic is available to be able to add multiple cities and each map is bound to the city's latitude and longitude - it's just a matter of adding them
