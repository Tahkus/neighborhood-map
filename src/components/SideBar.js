import React, { Component } from 'react';
import '../App.css';
import ListItem from './ListItem.js'
import Filter from './Filter.js'


class SideBar extends Component {

  render() {
	return (
	  <div className="side-bar">
	    <Filter filterParks={this.props.filterParks} parks={this.props.parks}/>
	    <ol className="parks-list">
		  {this.props.parks.map(park =>
		    <ListItem key={park.id} park={park} onListClick={this.props.onListClick} />
		  )}
	    </ol>
	  </div>
	)
  }
}

export default SideBar