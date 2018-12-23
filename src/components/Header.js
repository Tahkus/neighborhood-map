import React, { Component } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Header extends Component {

	render() {
		return (
			<div className="header">
				<button>
					<FontAwesomeIcon
						icon="bars"
					/>			
				</button>
				<h1>Adventure Mamas Park Guide</h1>
			</div>
		)
	}
}

export default Header