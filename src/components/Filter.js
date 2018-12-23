import React, { Component } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Filter extends Component {

	render() {
		return (
			<div class="filter-bar">
				<div className="icon-wrapper">
					<FontAwesomeIcon icon="search" className="search-icon"/>
				</div>
				<div className="filter-input">
					<input type="text" placeholder="Enter search (e.g. Alvarado)"/>
				</div>
			</div>
		)
	}
}

export default Filter