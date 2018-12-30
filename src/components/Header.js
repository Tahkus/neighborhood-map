import React, { Component } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Header extends Component {

	render() {
		return (
			<div className="header">
				<button onClick={this.props.updateSideBar} aria-label="Adventure Mamas Park Guide Menu">
					<FontAwesomeIcon
						icon="bars"
					/>			
				</button>
				<h1>Adventure Mamas Park Guide</h1>
				<p>Recommendations powered by FourSquare</p>				
			</div>
		)
	}
}

export default Header