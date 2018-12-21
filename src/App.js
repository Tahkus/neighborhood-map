import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    this.loadMap()
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcgBeIy9cnFNxmWpk86oTwnJ8q1DU4K5c&callback=initMap")
    window.initMap = this.initMap
  }

  getParks = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore"
    const parameters = {
      client_id: "USTUADMKEHK5Y0XPNYZAD4GPEUDWCCDOEVF1B5024K4GAPBQ",
      client_secret: "HXEMLEWRSPOGQPPBLBW1BE0GLOOBRW1AE2RCPHTCZ42FP1GL",
      query: "parks",
      near: "Richmond, CA"
    }
    //Requests parks from the endPoint and searches with specified parameters
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("Error! " + error)
      })
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.9057947, lng: -122.2796843},
      zoom: 11
    });
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

//Creates the script tag for integration with React
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
