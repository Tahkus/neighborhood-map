import React, { Component } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Filter extends Component {

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query }, this.props.filterParks(this.state.query))
	}

	render() {
		return (
			<div className="filter-bar">
				<div className="icon-wrapper">
					<FontAwesomeIcon icon="search" className="search-icon"/>
				</div>
				<div className="filter-input">
					<input type="text" value={this.state.query} placeholder="Enter search (e.g. Alvarado)" onChange={(e) => this.updateQuery(e.target.value)}/>
				</div>
			</div>
		)
	}
}

export default Filter