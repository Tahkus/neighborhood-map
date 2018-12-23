import React, { Component } from 'react';
import '../App.css';
import ListItem from './ListItem.js'


class SideBar extends Component {

	render() {
		return (
			<div className="side-bar">
				<ol className="parks-list">
					{this.props.parks.map(park =>
						<ListItem key={park.id} park={park}/>
					)}
				</ol>
			</div>
		)
	}
}

export default SideBar