import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SideBar from './components/SideBar.js'
import Header from './components/Header.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faSearch)


class App extends Component {

  state = {
    map: null,
    parks: [],
    markers: [],
    showSideBar: true,
    mapFull: false,
    query: '',
  }

// Calls the getParks function upon component mounting
  componentWillMount() {
    document.title = 'Adventure Mamas Park Guide'
  }
  // Calls the getParks function upon component mounting
  componentDidMount() {
    this.getParks()
  }

  // Calls the loadScript function and passes in the map URL & sets a value for window.initMap
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC2NB0jjCy_fTBmCzzEIYhyKizuDFtq9aw&callback=initMap")
    window.initMap = this.initMap
  }

  // Uses axios to fetch the foursquare API and then get recommended parks
  getParks = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "USTUADMKEHK5Y0XPNYZAD4GPEUDWCCDOEVF1B5024K4GAPBQ",
      client_secret: "JDQW4ZEDYHWCD4DJVAQWL05YFL4J5KUKA1SDDV5BDPM0ZEM4",
      query: "park",
      ll: "37.9454901,-122.3220567",
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

  // Update showSideBar state
  sideBarState = () => {
    this.state.showSideBar ? this.setState({showSideBar: false}) : this.setState({showSideBar: true})
  }

  // Remove markers based on query changes
  updateMarkers = (query) => {
    const activeMarkers = this.state.markers
    if (query) {
      activeMarkers.forEach((marker) => {
        marker.title.toLowerCase().includes(query.toLowerCase()) ?
          marker.setMap(this.state.map) : marker.setMap(null)
      })
    } else {
        activeMarkers.forEach((marker) => {
          marker.setMap(this.state.map)
        })
    }
  }

  // Initialize google map with location & zoom
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.9454901, lng: -122.3220567},
      zoom: 11
    });

    this.setState({ map })

    let markers = []

    // Create an info window
    const infoWindow = new window.google.maps.InfoWindow()

    // Loop through the parks and create markers for each one. Also create markers variable and 
    // use it to set a markers state
    this.state.parks.map(park => {
      const position = {
        lat: park.venue.location.lat,
        lng: park.venue.location.lng
      };

      const contentString = `${park.venue.name} <br>
      ${park.venue.location.formattedAddress[0]} <br>
      ${park.venue.location.formattedAddress[1]} <br>
      <p><em>Location provided by FourSquare.</em></p>` 


      // Create a marker
      park.marker = new window.google.maps.Marker({
        map: map,
        position,
        title: park.venue.name,
        animation: window.google.maps.Animation.DROP,
        id: park.venue.id,
        formattedAddress: park.venue.location.formattedAddress
      });

      // Event listener to open the info window 
      park.marker.addListener('click', function() {
        infoWindow.setContent(contentString)
        infoWindow.open(map, park.marker);
      });

      markers.push(park.marker)
      return park
    })
    this.setState({ markers })
  }

  // Animate marker when list item is clicked
  onListClick = (item) => {
    const markers = this.state.markers
    const filterMarker = markers.filter((marker) => marker.id === item.id)[0]
    const contentString = `${filterMarker.title} <br>
    ${filterMarker.formattedAddress[0]} <br>
    ${filterMarker.formattedAddress[1]} <br>
    <p><em>Location provided by FourSquare.</em></p>`

    const infoWindow = new window.google.maps.InfoWindow()

    filterMarker.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(() => {filterMarker.setAnimation(-1)}, 1400)
    infoWindow.setContent(contentString)
    infoWindow.open(this.state.map, filterMarker);
  }

  render() {
    const sideBar = this.state.showSideBar;

    return (
      <div className="App">
        <main>
          <Header updateSideBar={this.sideBarState} />
          {sideBar ? <section id="map" role="application" aria-label="map"></section> : <section id="map-full" role="application" aria-label="map"></section>}
          {sideBar && <SideBar onListClick={this.onListClick} showSideBar={this.showSideBar} parks={this.state.markers} showingParks={this.state.showingParks} updateMarkers={this.updateMarkers} />}
        </main>
      </div>
    );
  }
}

// Creates the script tag for map integration with React (will not work if simply put in the index.html file as React won't be able to access it)
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
