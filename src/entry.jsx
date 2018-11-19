import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'

import Schema from './schema.jsx';

class Entry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
	
		};
	}

	render() {
		return(
			<div className='fc_row {value ? "":"empty"}'>
				<span className='fc_label'>{this.props.slug}</span>
				<span className='fc_value'>{this.props.formData[this.props.slug]}</span>
			</div>
		);
	}
}

export default Entry;