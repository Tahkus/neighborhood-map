import React, { Component } from 'react';
import '../App.css';
import ListItem from './ListItem.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SideBar extends Component {

	state = {
			query: '',
	}

	updateSearch = (query) => {
		this.setState({ query: query.trim() }, this.props.updateMarkers(query))

	}

  	render() {
		let showing
	  	if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i')
			showing = this.props.parks.filter((item) => match.test(item.title))
		} else {
			showing = this.props.parks
		}

		showing.sort(sortBy('title'))

		return (
		    <div className="side-bar">
		    	<div className="filter-bar">
					<div className="filter-input">
						<input type="text" value={this.state.query} placeholder="Search names" className="search-icon" onChange={(e) => this.updateSearch(e.target.value)}/>
					</div>
				</div>
		    	<ol className="parks-list">
			  	{showing.map(park =>
			    	<ListItem key={park.id} park={park} onListClick={this.props.onListClick} />
			  	)}
		    	</ol>
		    </div>
		)
	}
}

export default SideBar