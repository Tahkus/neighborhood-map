import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    parks: []
  }
  // Calls the getParks function upon component mounting
  componentDidMount() {
    this.getParks()
  }

  // Calls the loadScript function and passes in the map URL & sets a value for window.initMap
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcgBeIy9cnFNxmWpk86oTwnJ8q1DU4K5c&callback=initMap")
    window.initMap = this.initMap
  }

  // Uses axios to fetch the foursquare API and then get recommended parks
  getParks = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "USTUADMKEHK5Y0XPNYZAD4GPEUDWCCDOEVF1B5024K4GAPBQ",
      client_secret: "HXEMLEWRSPOGQPPBLBW1BE0GLOOBRW1AE2RCPHTCZ42FP1GL",
      query: "park",
      near: "Richmond, CA",
      v: "20181221"
    }
    // Requests parks from the endPoint and searches with specified parameters
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          parks: response.data.response.groups[0].items
        }, this.loadMap())
      })
      .catch(error => {
        console.log("Error! " + error)
      })
  }

  // Initialize google map with location & zoom
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.9057947, lng: -122.2796843},
      zoom: 11
    });

    // Loop through the parks and create markers for each
    this.state.parks.forEach(park => {
      const position = {
        lat: park.venue.location.lat,
        lng: park.venue.location.lng
      };
      park.marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: park.name,
        animation: window.google.maps.Animation.DROP,
        id: park.venue.id
      });
    })
  }

  render() {
    return (
      <main>
        <div id="map">
        </div>
      </main>
    );
  }
}

// Creates the script tag for map integration with React (will not work if simply
// put in the index.html file as React won't be able to access it)
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
