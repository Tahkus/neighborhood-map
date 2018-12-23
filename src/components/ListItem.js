import React, { Component } from 'react';
import '../App.css';


class ListItem extends Component {

	render() {
		return (
			<li className="list-item">{this.props.park.title}</li>
		)
	}
}

export default ListItem