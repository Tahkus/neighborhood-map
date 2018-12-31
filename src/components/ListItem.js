import React, { Component } from 'react';
import '../App.css';


class ListItem extends Component {

	render() {
		return (
			<li aria-label={this.props.park.title} className="list-item" onClick={() => this.props.onListClick(this.props.park)}>{this.props.park.title}</li>
		)
	}
}

export default ListItem