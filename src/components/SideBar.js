import React, { Component } from 'react';
import '../App.css';
import ListItem from './ListItem.js'
import Filter from './Filter.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SideBar extends Component {

	state = {
			query: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

  render() {
  	let showingParks
  	if (this.state.query) {
  		const match = new RegExp(escapeRegExp(this.state.query), 'i')
  		showingParks = this.props.parks.filter((item) => match.test(item.title))
  	} else {
  		showingParks = this.props.parks
  	}

  	showingParks.sort(sortBy('title'))

	return (
	  <div className="side-bar">
	    <div className="filter-bar">
				<div className="icon-wrapper">
					<FontAwesomeIcon icon="search" className="search-icon"/>
				</div>
				<div className="filter-input">
					<input type="text" value={this.state.query} placeholder="Enter search (e.g. Alvarado)" onChange={(e) => this.updateQuery(e.target.value)}/>
				</div>
			</div>
	    <ol className="parks-list">
		  {showingParks.map(park =>
		    <ListItem key={park.id} park={park} onListClick={this.props.onListClick} />
		  )}
	    </ol>
	  </div>
	)
  }
}

export default SideBar